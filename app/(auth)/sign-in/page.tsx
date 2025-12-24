import AuthHeader from "@/components/AuthHeader";
import SignInForm from "@/components/SignInForm";
import { getLoggedInUser } from "@/lib/actions/user.action";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Healthcare | Sign in",
  description:
    "Welcome back to community that easily manage your information and connect with healthcare providers in real-time. Your privacy is our priority",
};

const SignInPage = async () => {
  const response = await getLoggedInUser();
  const authUser = response?.success ? response.data?.user : null;

  if (authUser) redirect("/");

  return (
    <section className="flex items-center justify-center max-sm:px-6 size-full">
      <div className="auth-form">
        <AuthHeader />
        <SignInForm />
      </div>
    </section>
  );
};

export default SignInPage;
