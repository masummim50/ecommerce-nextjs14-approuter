import React from 'react';

const SalesOverview = ({data}:{data:any}) => {
    console.log(data)
    return (
        <div className="grid grid-cols-2 gap-2">
            <div className="rounded-md py-8 text-center bg-green-300 shadow-sm">
                {data.totalSales} Items sold
            </div>
            <div className="rounded-md py-8 text-center bg-green-300 shadow-sm">

                {data.salesThisWeek} Items sold This week
            </div>
            <div className="rounded-md py-8 text-center bg-green-300 shadow-sm">
                {data.averageRating} average rating

            </div>
            <div className="rounded-md py-8 text-center bg-green-300 shadow-sm">

                {data.salesChangePercentage} % more sales this week
            </div>

        </div>
    );
};

export default SalesOverview;