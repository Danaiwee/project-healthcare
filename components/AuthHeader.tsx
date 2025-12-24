import Image from "next/image";
import Link from "next/link";

const AuthHeader = () => {
  return (
    <Link href="/" className="cursor-pointer flex items-center gap-1">
      <Image src="/logo.png" width={34} height={34} alt="Healthcare logo" />
      <h1 className="text-[30px] font-ibm-plex-serif font-bold text-black-1">
        Healthcare
      </h1>
    </Link>
  );
};

export default AuthHeader;
