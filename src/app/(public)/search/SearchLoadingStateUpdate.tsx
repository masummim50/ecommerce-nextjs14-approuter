"use client"
import { searchEnded } from '@/redux/features/searchAndPagination/searchAndPaginationSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { RootState } from '@/redux/store';
import React from 'react';

const SearchLoadingStateUpdate = ({data, date}: {data:any, date:number}) => {
    console.log("client compo date: ", date)

    const dispatch = useAppDispatch();
    dispatch(searchEnded(date));
    return (
        null
    );
};

export default SearchLoadingStateUpdate;