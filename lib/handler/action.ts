"use server";

import z, { ZodError, ZodSchema } from "zod";
import { ValidationError } from "../http-errors";
import dbConnect from "../mongoose";
import { IUserDoc } from "@/database/user.model";
import { getLoggedInUser } from "../actions/user.action";

interface ActionOptions<T> {
  params: T;
  schema: ZodSchema<T>;
  authorize?: boolean;
}

async function action<T>({
  params,
  schema,
  authorize = false,
}: ActionOptions<T>) {
  if (params && schema) {
    try {
      schema.parse(params);
    } catch (error) {
      if (error instanceof ZodError) {
        return new ValidationError(z.flattenError(error).fieldErrors);
      } else {
        return new Error("Schema validation failed");
      }
    }
  }

  await dbConnect();

  let user: IUserDoc | null | undefined;
  if (authorize) {
    const response = await getLoggedInUser();
    const loggedInUser = response?.data?.user;

    user = loggedInUser;
  }

  return { params, user };
}

export default action;
