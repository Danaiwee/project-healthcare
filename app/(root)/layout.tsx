import MobileNavbar from "@/components/MobileNavbar";
import Sidebar from "@/components/Sidebar";
import { getLoggedInUser } from "@/lib/actions/user.action";
import Image from "next/image";
import React from "react";

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const response = await getLoggedInUser();
  const authUser = response?.success ? response.data?.user : null;

  return (
    <main className="flex min-h-screen h-full w-full font-inter">
      <Sidebar authUser={authUser} />

      <div className="flex size-full flex-col">
        <div className="root-layout">
          <Image src="/logo.png" alt="Logo" width={30} height={30} />

          <div>
            <MobileNavbar authUser={authUser} />
          </div>
        </div>

        {children}
      </div>
    </main>
  );
};

export default RootLayout;
