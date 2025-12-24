"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { formUrlQuery } from "@/lib/url";

interface CommonFilterProps {
  filters: { name: string; value: string }[];
}

const CommonFilter = ({ filters }: CommonFilterProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const filterParams = searchParams.get("filter");

  const handleUpdateParams = (value: string) => {
    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: "filter",
      value: value,
    });

    router.push(newUrl, { scroll: false });
  };

  return (
    <div className="relative flex justify-end">
      <Select
        onValueChange={handleUpdateParams}
        defaultValue={filterParams || filters[0].value}
      >
        <SelectTrigger className="bg-white border w-40">
          <div className="line-clamp-1 flex-1 text-left">
            <SelectValue placeholder="Select a fitler" />
          </div>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {filters.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default CommonFilter;
