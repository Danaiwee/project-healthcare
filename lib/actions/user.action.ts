"use server";

import User, { IUser, IUserDoc } from "@/database/user.model";
import action from "../handler/action";
import {
  PaginatedSearchParamsSchema,
  SignInSchema,
  SignupSchema,
  UpdateProfileSchema,
} from "../validation";
import handleError from "../handler/error";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import mongoose, { QueryFilter } from "mongoose";
import dbConnect from "../mongoose";
import { revalidatePath } from "next/cache";
import { NotFoundError } from "../http-errors";
import { pusherServer } from "../pusher";

export async function signUp(
  params: SignUpParams
): Promise<ActionResponse<{ user: IUser }>> {
  const validationResult = await action({
    params,
    schema: SignupSchema,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const { password, email } = validationResult.params;
  const role = "patient";

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const isExistingUser = await User.findOne({ email });
    if (isExistingUser) {
      throw new Error("Email is already exists");
    }

    const lastHnUser = await User.findOne({}, { hn: 1 })
      .sort({ hn: -1 })
      .session(session);

    const newHnNumber = lastHnUser ? (lastHnUser.hn || 0) + 1 : 1;

    const hashedPassword = await bcrypt.hash(password, 10);

    const [newUser] = await User.create(
      [
        {
          ...params,
          password: hashedPassword,
          hn: role === "patient" ? newHnNumber : 0,
        },
      ],
      { session }
    );

    if (!newUser) {
      throw new Error("Failed to create new user");
    }

    await generateTokenAndSetCookie(newUser._id);

    await session.commitTransaction();

    await pusherServer.trigger("admin-dashboard", "new-patient", newUser);

    revalidatePath("/admin");

    return {
      success: true,
      data: {
        user: JSON.parse(JSON.stringify(newUser)),
      },
    };
  } catch (error) {
    await session.abortTransaction();
    const errorResponse = handleError(error, "server");
    return JSON.parse(JSON.stringify(errorResponse));
  } finally {
    await session.endSession();
  }
}

export async function signIn(
  params: SignInParams
): Promise<ActionResponse<{ user: IUser }>> {
  const validationResult = await action({
    params,
    schema: SignInSchema,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const { email, password } = validationResult.params!;

  try {
    const user = await User.findOne({ email });
    if (!user) throw new Error("Invalid credentails");

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) throw new Error("Invalid credentials");

    await generateTokenAndSetCookie(user._id);

    return {
      success: true,
      data: {
        user: JSON.parse(JSON.stringify(user)),
      },
    };
  } catch (error) {
    const errorResponse = handleError(error, "server");
    return JSON.parse(JSON.stringify(errorResponse));
  }
}

export async function getLoggedInUser(): Promise<
  | ActionResponse<{
      user: IUserDoc;
    }>
  | null
  | undefined
> {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  if (!token) return null;

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as MyTokenPayload;
    if (!decoded) throw new Error("Unauthorized token");

    await dbConnect();

    const user = await User.findById(decoded.userId as string)
      .select("-password")
      .lean();

    return {
      success: true,
      data: {
        user: JSON.parse(JSON.stringify(user)),
      },
    };
  } catch (error) {
    const errorResponse = handleError(error, "server");
    return JSON.parse(JSON.stringify(errorResponse));
  }
}

export async function logout(): Promise<ActionResponse> {
  const cookieStore = await cookies();

  cookieStore.set("auth_token", "", {
    httpOnly: true,
    expires: new Date(0),
    path: "/",
  });

  revalidatePath("/");

  return { success: true };
}

export async function updateUserProfile(
  params: UpdateUserParams
): Promise<ActionResponse<{ user: IUserDoc }>> {
  const validationResult = await action({
    params,
    schema: UpdateProfileSchema,
    authorize: true,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const { userId, email, ...updateData } = validationResult.params!;
  const authUserId = validationResult?.user?._id;

  try {
    if (userId !== authUserId?.toString())
      throw new Error("You cannot edit profile");

    const currentUser = await User.findById(userId);
    if (!currentUser) throw new NotFoundError("User");

    if (email && email !== currentUser.email) {
      const isExistingEmail = await User.findOne({ email });
      if (isExistingEmail) {
        throw new Error("Email is already exists");
      }

      (updateData as Partial<IUser>).email = email;
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updateData },
      { new: true }
    );

    await pusherServer.trigger(
      "admin-dashboard",
      "update-patient",
      updatedUser
    );

    revalidatePath("/admin");

    return {
      success: true,
      data: {
        user: JSON.parse(JSON.stringify(updatedUser)),
      },
    };
  } catch (error) {
    const errorResponse = handleError(error, "server");
    return JSON.parse(JSON.stringify(errorResponse));
  }
}

export async function generateTokenAndSetCookie(userId: string) {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET!, {
    expiresIn: "1d",
  });
  const cookieStore = await cookies();

  cookieStore.set("auth_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 24 * 60 * 60 * 1000,
    path: "/",
  });
}

export async function getPatients(
  params: PaginatedSearchParams
): Promise<ActionResponse<{ patients: IUserDoc[]; isNext: boolean }>> {
  const validationResult = await action({
    params,
    schema: PaginatedSearchParamsSchema,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const { page = 1, pageSize = 5, query, filter } = validationResult.params!;

  const skip = (Number(page) - 1) * pageSize;
  const limit = Number(pageSize);

  const filterQuery: QueryFilter<IUser> = { role: "patient" };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let sortCriteria: any = { hn: -1 };

  try {
    if (query) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const queryConditions: any[] = [
        { firstName: { $regex: query, $options: "i" } },
        { middleName: { $regex: query, $options: "i" } },
        { lastName: { $regex: query, $options: "i" } },
      ];

      const numericQuery = parseInt(query, 10);
      if (!isNaN(numericQuery)) {
        queryConditions.push({ hn: numericQuery });
      }

      filterQuery.$or = queryConditions;
    }

    if (filter === "newest") sortCriteria = { hn: -1 };
    if (filter === "oldest") sortCriteria = { hn: 1 };

    const totalPatients = await User.countDocuments(filterQuery);

    const patients = await User.find(filterQuery)
      .sort(sortCriteria)
      .skip(skip)
      .limit(limit)
      .lean();

    const isNext = totalPatients > skip + patients.length;

    return {
      success: true,
      data: {
        patients: JSON.parse(JSON.stringify(patients)),
        isNext,
      },
    };
  } catch (error) {
    const errorResponse = handleError(error, "server");
    return JSON.parse(JSON.stringify(errorResponse));
  }
}
