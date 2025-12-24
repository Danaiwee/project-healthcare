import CommonFilter from "@/components/CommonFilter";
import HeaderContent from "@/components/HeaderContent";
import LocalSearchbar from "@/components/LocalSearchbar";
import Pagination from "@/components/Pagination";
import PatientData from "@/components/PatientData";
import { ADMIN_FILTERS } from "@/constants";
import { ROUTES } from "@/constants/routes";

import { getLoggedInUser, getPatients } from "@/lib/actions/user.action";

import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Healthcare | Admin",
  description:
    "Staff dashboard healthcare. Centralized command center for patient registration tracking and healthcare administration.",
};

const AdminPage = async ({ searchParams }: RouteParams) => {
  const { page, pageSize, filter, query } = await searchParams;

  const response = await getLoggedInUser();
  const authUser = response?.success ? response.data?.user : null;
  if (!authUser) redirect("/");

  const isAdmin = authUser.role === "admin";
  if (!isAdmin) redirect("/");

  const { data } = await getPatients({
    page: Number(page) || 1,
    pageSize: Number(pageSize) || 5,
    query,
    filter,
  });
  const { patients, isNext } = data || {};

  return (
    <section className="flex">
      <div className="profile">
        <HeaderContent
          title="Welcome"
          type="greeting"
          user={authUser}
          subtext="View all patients details"
        />

        <div className="max-w-xl flex flex-col gap-3">
          <LocalSearchbar
            route={ROUTES.ADMIN}
            placeholder="Search patient's name or HN number"
          />

          <CommonFilter filters={ADMIN_FILTERS} />
        </div>

        <PatientData
          initialPatients={patients || []}
          query={query || ""}
          filter={filter || "newest"}
          page={page}
        />

        <div className="max-w-xl">
          <Pagination isNext={isNext || false} page={Number(page) || 1} />
        </div>
      </div>
    </section>
  );
};

export default AdminPage;
