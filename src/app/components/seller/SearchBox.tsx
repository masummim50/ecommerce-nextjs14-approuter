"use client";
import { Input } from "@nextui-org/react";

import React from "react";
import { CiSearch } from "react-icons/ci";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

const SearchBox = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace, push } = useRouter();

  const handleSearch = useDebouncedCallback((term) => {
    console.log(`Searching... ${term}`);

    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    if (pathname === "/" || pathname === "/search") {
      console.log("params: ", params);
      // replace(`/${pathname}/search?${params.toString()}`);
      if (term !== "") {
        push(`/search?${params.toString()}`);
      }
    } else {
      replace(`${pathname}?${params.toString()}`);
    }
  }, 500);

  return (
    <div className="w-full  rounded-md flex justify-center items-center  text-white shadow-sm bg-gray-300 dark:bg-gray-700 mt-2">
      <Input
        defaultValue={searchParams.get("query")?.toString()}
        onChange={(e) => handleSearch(e.target.value)}
        isClearable
        onClear={() => handleSearch("")}
        size="sm"
        classNames={{
          label: "text-black/50 dark:text-white/90",
          input: [
            "bg-transparent",
            "text-black/90 dark:text-white/90",
            "placeholder:text-default-700/50 dark:placeholder:text-white/60",
          ],
          //   innerWrapper: "bg-transparent",
          inputWrapper: [
            // "shadow-xl",
            "bg-default-200/50",
            "dark:bg-default/60",
            "backdrop-blur-xl",
            "backdrop-saturate-200",
            "hover:bg-default-200/70",
            "dark:hover:bg-default/70",
            "group-data-[focus=true]:bg-default-200/50",
            "dark:group-data-[focus=true]:bg-default/60",
            "!cursor-text",
          ],
        }}
        placeholder="Type to search..."
        startContent={
          <CiSearch className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
        }
      />
    </div>
  );
};

export default SearchBox;
