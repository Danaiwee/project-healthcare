import AuthLink from "@/components/AuthLink";
import { getLoggedInUser } from "@/lib/actions/user.action";

import Image from "next/image";

const HomePage = async () => {
  const response = await getLoggedInUser();
  const authUser = response?.success ? response.data?.user : null;

  const message = authUser
    ? "Welcome to your secure Healthcare Portal. Your information is synced and ready for our medical staff. Use this dashboard to maintain your health profile and ensure your medical journey is seamless and efficient."
    : "Join our Healthcare community to simplify your medical journey.Use our platform to easily provide your health details, ensuring our staff receives your information instantly for faster, more personalized care";

  return (
    <section className="flex flex-col md:flex-row items-center justify-between w-full min-h-screen px-20">
      <div className="mt-10 md:mt-0 flex-1 flex flex-col gap-3 w-full">
        <div className="flex flex-col -space-y-5 md:-space-y-10">
          <h1 className="text-[60px] md:text-[80px] font-bold text-sky-600">
            HEATH
          </h1>
          <div className="flex items-center gap-4 ">
            <h1 className="text-[60px] md:text-[80px] font-bold  text-sky-600">
              CARE
            </h1>
            <Image
              src="/icons/plus.png"
              alt="Plus logo"
              width={50}
              height={50}
              className="size-10 md:size-15"
            />
          </div>
        </div>

        <p className="mt-4 text-md text-gray-900">{message}</p>

        <div className="flex items-center gap-4 mt-3">
          <AuthLink authUser={authUser} />
        </div>
      </div>

      <div className="flex-1 md:flex-2 md:flex items-center justify-center w-full">
        <Image
          src="/images/healthcare.svg"
          width={700}
          height={700}
          alt="healthcare logo"
        />
      </div>
    </section>
  );
};

export default HomePage;
