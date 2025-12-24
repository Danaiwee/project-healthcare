import HeaderContent from "@/components/HeaderContent";
import PatientCard from "@/components/PatientCard";

import { AUTHUSER, PATIENTS } from "@/constants";
import { getLoggedInUser, getPatients } from "@/lib/actions/user.action";

import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Healthcare | Admin",
  description:
    "Staff dashboard healthcare. Centralized command center for patient registration tracking and healthcare administration.",
};

const AdminPage = async () => {
  const response = await getLoggedInUser();
  const authUser = response?.success ? response.data?.user : null;
  if (!authUser) redirect("/");

  const isAdmin = authUser.role === "admin";
  if (!isAdmin) redirect("/");

  const { data } = await getPatients();
  const { patients } = data || {};

  return (
    <section className="flex">
      <div className="profile">
        <HeaderContent
          title="Welcome"
          type="greeting"
          user={authUser}
          subtext="View all patients details"
        />

        <div className="w-full flex flex-col gap-3 max-w-xl">
          {patients &&
            patients.map((patient) => (
              <PatientCard key={patient._id.toString()} patient={patient} />
            ))}
        </div>
      </div>
    </section>
  );
};

export default AdminPage;
