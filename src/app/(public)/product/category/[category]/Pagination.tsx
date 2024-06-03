"use client";
import React, { useEffect, useState } from "react";
import { Pagination, Progress } from "@nextui-org/react";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { TiSortAlphabetically } from "react-icons/ti";

export default function Pages({
  meta,
}: {
  meta: { page: number; size: number; total: number; totalPage: number };
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { replace } = useRouter();

  console.log("pathname: ", pathname);

  const searchParams = useSearchParams();
  const [initialPage, setInitialPage] = useState(
    Number(searchParams.get("page")) || 1
  );

  useEffect(() => {
    setInitialPage(Number(searchParams.get("page")) || 1);
  }, [searchParams]);

  const params = new URLSearchParams(searchParams);
  function handleSearch(page: string) {
    const params = new URLSearchParams(searchParams);
    if (page) {
      params.set("page", page);
    } else {
      params.delete("page");
    }
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="w-full flex items-center flex-col">
      <Pagination
        onChange={(page: number) => handleSearch(page.toString())}
        total={meta.totalPage}
        initialPage={initialPage}
      />
      <Progress
        size="sm"
        className="w-full max-w-[200px] my-2"
        isIndeterminate
      />
    </div>
  );
}
