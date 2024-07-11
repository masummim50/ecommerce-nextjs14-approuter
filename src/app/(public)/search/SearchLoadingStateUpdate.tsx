"use client";
import {
  pageClickEnded,
  searchEnded,
  sellerSearchEnded,
} from "@/redux/features/searchAndPagination/searchAndPaginationSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import React from "react";

const SearchLoadingStateUpdate = ({
  data,
  date,
  type = "public",
}: {
  data: any;
  date: number;
  type?: "seller" | "public";
}) => {

  const dispatch = useAppDispatch();
  if (type == "seller") {
    dispatch(sellerSearchEnded(date));
  } else {
    dispatch(searchEnded(date));
    dispatch(pageClickEnded(date));
  }
  return null;
};

export default SearchLoadingStateUpdate;
