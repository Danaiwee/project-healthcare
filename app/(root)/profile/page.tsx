import HeaderContent from "@/components/HeaderContent";
import ProfileForm from "@/components/ProfileForm";
import { getLoggedInUser } from "@/lib/actions/user.action";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Healthcare | Profile",
  description:
    "Access your secure healthcare profile. View and manage your personal details, update your contact information, and ensure your healthcare records are always up to date.",
};

const ProfilePage = async () => {
  const response = await getLoggedInUser();
  const authUser = response?.success ? response.data?.user : null;
  if (!authUser) redirect("/");

  const isAdmin = authUser?.role === "admin" || false;
  if (isAdmin) redirect("/");

  return (
    <section className="flex">
      <div className="profile">
        <HeaderContent
          title="Welcome"
          type="greeting"
          user={authUser}
          subtext="View and update your personal details"
        />

        <ProfileForm user={authUser} />
      </div>
    </section>
  );
};

export default ProfilePage;
