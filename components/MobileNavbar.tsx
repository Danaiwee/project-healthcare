"use client";

import { usePathname } from "next/navigation";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import Image from "next/image";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";
import { House, User, UserCheck } from "lucide-react";
import { IUser } from "@/database/user.model";

interface MobileNavbarProps {
  authUser: IUser | null | undefined;
}

const MobileNavbar = ({ authUser }: MobileNavbarProps) => {
  const pathname = usePathname();

  const isActiveHome = pathname === "/";
  const isActiveProfile = pathname.includes("/profile");
  const isActiveAdmin = pathname.includes("/admin");

  const isAdmin = authUser?.role === "admin" || false;
  const isPatient = authUser?.role === "patient" || false;

  return (
    <section className="w-full flex justify-end">
      <Sheet>
        <SheetTrigger className="flex justify-end">
          <Image
            src="/icons/hamburger.svg"
            width={30}
            height={30}
            alt="menu"
            className="cursor-pointer"
          />
        </SheetTrigger>
        <SheetContent side="left" className="border-none bg-white w-75">
          <SheetTitle asChild>
            <Link
              href={ROUTES.HOME}
              className="cursor-pointer flex items-center gap-2 px-4 mt-3 mx-2"
            >
              <Image src="/logo.png" width={34} height={34} alt="logo" />
              <h1 className="text-2xl font-ibm-plex-serif font-bold text-black-1">
                Healthcare
              </h1>
            </Link>
          </SheetTitle>
          <div className="moblienav-sheet">
            <SheetDescription asChild>
              <nav className="flex h-full flex-col gap-2 pt-16 text-white mx-5">
                <SheetClose asChild>
                  <Link
                    href={ROUTES.HOME}
                    className={`mobilenav-sheet_close w-full ${
                      isActiveHome && "bg-sky-500"
                    }`}
                  >
                    <House
                      className={`size-6 text-gray-500 ${
                        isActiveHome && "text-white"
                      }`}
                    />
                    <p
                      className={`text-[16px] font-semibold text-gray-900 ${
                        isActiveHome && "text-white!"
                      }`}
                    >
                      Home
                    </p>
                  </Link>
                </SheetClose>

                {authUser && isPatient && (
                  <SheetClose asChild>
                    <Link
                      href={ROUTES.PROFILE}
                      className={`mobilenav-sheet_close w-full ${
                        isActiveProfile && "bg-sky-500"
                      }`}
                    >
                      <User
                        className={`size-6 text-gray-500 ${
                          isActiveProfile && "text-white"
                        }`}
                      />
                      <p
                        className={`text-[16px] font-semibold text-gray-900 ${
                          isActiveProfile && "text-white!"
                        }`}
                      >
                        Profile
                      </p>
                    </Link>
                  </SheetClose>
                )}

                {isAdmin && (
                  <SheetClose asChild>
                    <Link
                      href={ROUTES.HOME}
                      className={`mobilenav-sheet_close w-full ${
                        isActiveAdmin && "bg-sky-500"
                      }`}
                    >
                      <UserCheck
                        className={`size-6 text-gray-500 ${
                          isActiveAdmin && "text-white"
                        }`}
                      />
                      <p
                        className={`text-[16px] font-semibold text-gray-900 ${
                          isActiveAdmin && "text-white!"
                        }`}
                      >
                        Admin
                      </p>
                    </Link>
                  </SheetClose>
                )}
              </nav>
            </SheetDescription>
          </div>
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default MobileNavbar;
