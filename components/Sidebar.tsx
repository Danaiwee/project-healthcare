"use client";

import { ROUTES } from "@/constants/routes";
import { IUser } from "@/database/user.model";
import { House, User, UserCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarProps {
  authUser: IUser | null | undefined;
}

const Sidebar = ({ authUser }: SidebarProps) => {
  const pathname = usePathname();

  const isActiveHome = pathname === "/";
  const isActiveProfile = pathname.includes("/profile");
  const isActiveAdmin = pathname.includes("/admin");

  const isAdmin = authUser?.role === "admin" || false;
  const isPatient = authUser?.role === "patient" || false;

  return (
    <section className="sidebar">
      <nav className="flex flex-col gap-4">
        <Link
          href={ROUTES.HOME}
          className="flex gap-2 items-center mb-10 justify-center xl:justify-start"
        >
          <Image
            src="/logo.png"
            alt="logo"
            width={34}
            height={34}
            className="size-8.5"
          />

          <h1 className="sidebar-logo font-ibm-plex-serif">Healthcare</h1>
        </Link>

        <Link
          href={ROUTES.HOME}
          className={`sidebar-link ${isActiveHome && "bg-sky-500"}`}
        >
          <House
            className={`size-6 text-gray-500 ${isActiveHome && "text-white"}`}
          />

          <p className={`sidebar-label ${isActiveHome && "text-white!"}`}>
            Home
          </p>
        </Link>

        {authUser && isPatient && (
          <Link
            href={ROUTES.PROFILE}
            className={`sidebar-link ${isActiveProfile && "bg-sky-500"}`}
          >
            <User
              className={`size-6 text-gray-500 ${
                isActiveProfile && "text-white"
              }`}
            />
            <p className={`sidebar-label ${isActiveProfile && "text-white!"}`}>
              Profile
            </p>
          </Link>
        )}

        {isAdmin && (
          <Link
            href={ROUTES.ADMIN}
            className={`sidebar-link ${isActiveAdmin && "bg-sky-500"}`}
          >
            <UserCheck
              className={`size-6 text-gray-500 ${
                isActiveAdmin && "text-white"
              }`}
            />
            <p className={`sidebar-label ${isActiveAdmin && "text-white!"}`}>
              Admin
            </p>
          </Link>
        )}
      </nav>
    </section>
  );
};

export default Sidebar;
