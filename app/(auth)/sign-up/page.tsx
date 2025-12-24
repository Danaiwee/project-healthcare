import AuthHeader from "@/components/AuthHeader";
import SignUpForm from "@/components/SignUpForm";
import { getLoggedInUser } from "@/lib/actions/user.action";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Healthcare | Sign up",
  description:
    "Join our digital community to easily manage your information and connect with healthcare providers in real-time. Your privacy is our priority..",
};

const SignUpPage = async () => {
  const response = await getLoggedInUser();
  const authUser = response?.success ? response.data?.user : null;

  if (authUser) redirect("/");
  return (
    <section className="flex items-center justify-center max-sm:px-6 size-full">
      <div className="auth-form">
        <AuthHeader />
        <SignUpForm />
      </div>
    </section>
  );
};

export default SignUpPage;
