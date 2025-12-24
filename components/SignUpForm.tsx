"use client";

import { useState } from "react";
import { Form } from "./ui/form";
import { useForm } from "react-hook-form";
import z from "zod";
import { SignupSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomInput from "./CustomInput";
import CustomSelect from "./CustomSelect";
import { GENDER, LANGUAGES } from "@/constants";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";
import { signUp } from "@/lib/actions/user.action";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const SignUpForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof SignupSchema>>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      firstName: "",
      middleName: "",
      lastName: "",
      dateOfBirth: "",
      gender: "",
      phone: "",
      email: "",
      address: "",
      language: "",
      nationality: "",
      emergencyContact: "",
      religion: "",
      password: "",
    },
  });

  const handleSubmitForm = async (data: z.infer<typeof SignupSchema>) => {
    setIsLoading(true);
    try {
      const { success } = await signUp(data);

      if (success) {
        toast("Success", { description: "Signed up successfully" });
        router.push("/");
      } else {
        toast("Error", { description: "Failed to sign up" });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <section className="flex flex-col gap-2">
        <h1 className="font-semibold text-3xl text-gray-900">Sign up</h1>
        <p className="text-gray-500 text-md font-semibold">
          Please enter your details
        </p>
      </section>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmitForm)}
          className="space-y-5"
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
              placeholder="Enter your middle name"
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
              placeholder="eg. 1985-01-01"
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

          <CustomInput
            control={form.control}
            name="password"
            label="Password"
            placeholder="Enter your password"
            type="password"
          />

          <div className="flex flex-col gap-4">
            <Button
              type="submit"
              disabled={isLoading}
              className="form-btn bg-blue-gradient"
            >
              {isLoading ? (
                <>
                  <Loader2 size={20} className="animate-spin" /> &nbsp;
                  Loading...
                </>
              ) : (
                "Sign up"
              )}
            </Button>
          </div>
        </form>
      </Form>

      <footer className="flex justify-center gap-1">
        <p className="text-[14px] font-normal text-gray-600">
          Already have an account?
        </p>
        <Link href={ROUTES.signIn} className="form-link text-blue-600">
          Sign in
        </Link>
      </footer>
    </>
  );
};

export default SignUpForm;
