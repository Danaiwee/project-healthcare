"use client";

import { useState } from "react";
import { Form } from "./ui/form";
import { useForm } from "react-hook-form";
import z from "zod";
import { SignInSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomInput from "./CustomInput";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";
import { signIn } from "@/lib/actions/user.action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const SignInForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof SignInSchema>>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmitForm = async (data: z.infer<typeof SignInSchema>) => {
    setIsLoading(true);
    try {
      const result = await signIn(data);

      if (!result.success) {
        throw new Error(result.error?.message || "An error occurred");
      }

      toast("Success", { description: "Logged in successfully" });
      router.push("/");

      return;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);
      toast("Error", { description: error?.message || "An error occurred" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <section className="flex flex-col gap-2">
        <h1 className="font-semibold text-3xl text-gray-900">Sign In</h1>
        <p className="text-gray-500 text-md font-semibold">
          Please enter your details
        </p>
      </section>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmitForm)}
          className="space-y-5"
        >
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
          Don&apos;t have an account?
        </p>
        <Link href={ROUTES.signUp} className="form-link text-blue-600">
          Sign up
        </Link>
      </footer>
    </>
  );
};

export default SignInForm;
