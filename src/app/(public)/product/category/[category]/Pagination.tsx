"use client";
import React, { useEffect, useState } from "react";
import { Pagination, Progress } from "@nextui-org/react";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { TiSortAlphabetically } from "react-icons/ti";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { pageClickStarted } from "@/redux/features/searchAndPagination/searchAndPaginationSlice";
import { RootState } from "@/redux/store";

export default function Pages({
  meta,
}: {
  meta: { page: number; size: number; total: number; totalPage: number };
}) {
  const pageTime = useAppSelector(
    (state: RootState) => state.prevSearchAndPagination.pageTime
  );
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const { replace } = useRouter();


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
    
    dispatch(pageClickStarted(undefined));
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
        isIndeterminate
        className={`w-full max-w-[200px] my-2 transition-all ${
          pageTime.curr == pageTime.prev ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}
