"use client";
import React from "react";
import { Pagination } from "@nextui-org/react";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { TiSortAlphabetically } from "react-icons/ti";

export default function Pages({meta}:{meta:{page:number, size:number, total:number,totalPage:number}}) {
  const router = useRouter();
  const pathname = usePathname();
  const { replace } = useRouter();
  
  const searchParams = useSearchParams();

  function handleSearch(page: string) {
    const params = new URLSearchParams(searchParams);
    if (page) {
      params.set('page', page);
    } else {
      params.delete('page');
    }
    replace(`${pathname}?page=${page}`);
  }

  return (
    <Pagination
      onChange={(page: number) => handleSearch(page.toString())}
      total={meta.totalPage}
      initialPage={meta.page || 1}
    />
  );
}
