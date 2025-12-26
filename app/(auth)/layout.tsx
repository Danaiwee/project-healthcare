import Image from "next/image";
import { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="auth-layout">
      {children}

      <div className="auth-asset">
        <div className="relative w-full max-w-3xl h-90 mx-4 2xl:mx-0">
          <Image
            src="/images/auth.png"
            fill
            className="object-center xl:object-cover"
            alt="Auth image"
            priority
            sizes="center"
          />
        </div>
      </div>
    </main>
  );
};

export default AuthLayout;
