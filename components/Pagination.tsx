"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { formUrlQuery } from "@/lib/url";
import { Button } from "./ui/button";

interface PaginationProps {
  page: number;
  isNext: boolean;
}

const Pagination = ({ page = 1, isNext }: PaginationProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleNavigation = (type: "prev" | "next") => {
    const nextPageNumber =
      type === "prev" ? Number(page) - 1 : Number(page) + 1;

    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: "page",
      value: nextPageNumber.toString(),
    });

    router.push(newUrl, { scroll: false });
  };

  return (
    <div className="flex w-full items-center justify-center gap-3 mt-5">
      <Button
        className="bg-blue-gradient flex min-h-9 items-center justify-center gap-2 border border-gray-200"
        onClick={() => handleNavigation("prev")}
        disabled={Number(page) <= 1}
      >
        <p className="body-medium text-dark200_light800">Prev</p>
      </Button>

      <div className="flex items-center justify-center rounded-md bg-primary-500 px-3.5 py-2">
        <p className="body-semibold text-gray-900">{page}</p>
      </div>

      <Button
        className="bg-blue-gradient flex min-h-9 items-center justify-center gap-2 border border-gray-200"
        onClick={() => handleNavigation("next")}
        disabled={!isNext}
      >
        <p className="body-medium text-dark200_light800">Next</p>
      </Button>
    </div>
  );
};

export default Pagination;
