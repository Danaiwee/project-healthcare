import Link from "next/link";
import { Button } from "./ui/button";
import { ROUTES } from "@/constants/routes";
import { IUser } from "@/database/user.model";
import Logout from "./Logout";

interface AuthLinkProps {
  authUser: IUser | null | undefined;
}

const AuthLink = ({ authUser }: AuthLinkProps) => {
  return (
    <>
      {!authUser ? (
        <>
          <Button asChild className="text-md sm:text-lg p-6" variant="secondary">
            <Link href={ROUTES.signIn}>Sign in</Link>
          </Button>
          <Button asChild className="text-md sm:text-lg p-6" variant="outline">
            <Link href={ROUTES.signUp}>Sign up</Link>
          </Button>
        </>
      ) : (
        <Logout />
      )}
    </>
  );
};

export default AuthLink;
