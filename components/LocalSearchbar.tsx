"use client";

import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { formUrlQuery, removeKeyFromUrlQuery } from "@/lib/url";

interface LocalSearchbarProps {
  route: string;
  placeholder: string;
  otherClasses?: string;
  iconPosition?: string;
}

const LocalSearchbar = ({
  route,
  placeholder,
  otherClasses,
  iconPosition = "left",
}: LocalSearchbarProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const query = searchParams.get("query");

  const [searchQuery, setSearchQuery] = useState(query || "");

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchQuery) {
        const newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: "query",
          value: searchQuery,
        });

        router.push(newUrl, { scroll: false });
      } else {
        if (pathname === route) {
          const newUrl = removeKeyFromUrlQuery({
            params: searchParams.toString(),
            keysToRemove: ["query"],
          });
          router.push(newUrl, { scroll: false });
        }
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  return (
    <div
      className={`bg-white flex min-h-12 grow items-center gap-2 rounded-lg px-4 border  ${otherClasses}`}
    >
      {iconPosition === "left" && <Search className="size-6" />}

      <Input
        type="text"
        placeholder={placeholder}
        className="text-sm text-gray-700 border-none shadow-none outline-none focus-visible:ring-0 focus-visible:outline-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {iconPosition === "right" && <Search className="size-6" />}
    </div>
  );
};

export default LocalSearchbar;
