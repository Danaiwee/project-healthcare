"use client";

import { ProfilSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { Form } from "./ui/form";
import CustomInput from "./CustomInput";
import CustomSelect from "./CustomSelect";
import { GENDER, LANGUAGES } from "@/constants";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { updateUserProfile } from "@/lib/actions/user.action";
import { IUserDoc } from "@/database/user.model";
import { toast } from "sonner";

interface ProfileFormProps {
  user: IUserDoc;
}

const ProfileForm = ({ user }: ProfileFormProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const userId = user?._id.toString() as string;

  const form = useForm<z.infer<typeof ProfilSchema>>({
    resolver: zodResolver(ProfilSchema),
    defaultValues: {
      firstName: user?.firstName || "",
      middleName: user?.middleName || "",
      lastName: user?.lastName || "",
      dateOfBirth: user?.dateOfBirth || "",
      gender: user?.gender || "",
      phone: user?.phone || "",
      email: user?.email || "",
      address: user?.address || "",
      language: user?.language || "",
      nationality: user?.nationality || "",
      emergencyContact: user?.emergencyContact || "",
      religion: user?.religion || "",
    },
  });

  const handleUpdate = async (data: z.infer<typeof ProfilSchema>) => {
    setIsLoading(true);
    try {
      const { success } = await updateUserProfile({ ...data, userId });

      if (success) {
        toast("Success", { description: "Updated profile successfully" });
      } else {
        toast("Error", { description: "An error occurred, please try again" });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="flex flex-col gap-2 max-w-xl">
      <h1 className="font-semibold text-xl text-gray-900">Profile Details</h1>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleUpdate)}
          className="space-y-5 mt-1"
        >
          <div className="flex gap-4">
            <CustomInput
              control={form.control}
              name="firstName"
              label="First Name"
              placeholder="Enter your first name"
            />
            <CustomInput
              control={form.control}
              name="middleName"
              label="Middle Name"
              placeholder="Enter your last name"
            />
          </div>

          <CustomInput
            control={form.control}
            name="lastName"
            label="Last Name"
            placeholder="Enter your last name"
          />

          <div className="flex gap-4">
            <CustomInput
              control={form.control}
              name="dateOfBirth"
              label="Date Of Birth"
              placeholder="eg. 17-04-1995"
            />
            <CustomSelect
              control={form.control}
              name="gender"
              label="Gender"
              placeholder="Select your gender"
              options={GENDER}
            />
          </div>

          <div className="flex gap-4">
            <CustomInput
              control={form.control}
              name="phone"
              label="Phone Number"
              placeholder="Enter your phone number"
            />
            <CustomSelect
              control={form.control}
              name="language"
              label="Preferred Language"
              placeholder="Select your language"
              options={LANGUAGES}
            />
          </div>

          <div className="flex gap-4">
            <CustomInput
              control={form.control}
              name="nationality"
              label="Nationality"
              placeholder="Enter your nationality"
            />
            <CustomInput
              control={form.control}
              name="religion"
              label="Religion"
              placeholder="Enter your religion"
            />
          </div>

          <CustomInput
            control={form.control}
            name="address"
            label="Address"
            placeholder="Enter your address"
          />

          <CustomInput
            control={form.control}
            name="emergencyContact"
            label="Emergency Contact (Name)"
            placeholder="Enter your emergency contact"
          />

          <CustomInput
            control={form.control}
            name="email"
            label="Email Address"
            placeholder="Enter your email address"
          />

          <div className="flex justify-end gap-4">
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-blue-gradient cursor-pointer"
            >
              {isLoading ? (
                <>
                  <Loader2 size={20} className="animate-spin" /> &nbsp;
                  Loading...
                </>
              ) : (
                "Update"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </section>
  );
};

export default ProfileForm;
