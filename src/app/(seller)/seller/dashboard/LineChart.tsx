"use client";
import React, { useEffect, useState } from "react";
import { Bar, Line } from "react-chartjs-2";

import "./linechart.css";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { dateOnly } from "@/helpers/formatDate";
import { callback } from "chart.js/helpers";
import LastThreeOrders from "./LastThreeOrders";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement
);

export const options = {
  responsive: true,
  scales: {
    x: {
      display: false,
    },
    y: { display: false },
  },
  plugins: {
    legend: {
      position: "top" as const,
      // display:false,
      labels: {
        color: "rgb(107 114 128)",
      },
    },
    tooltip: {
      intersect: false,
      callbacks: {
        title: (s) => {
          return s[0].label;
        },
      },
    },
  },
  maintainAspectRatio: false,
};

const LineChart = ({ data }: { data: any }) => {
  const [chartData, setChartData] = useState(data.chartOverviewArray);
  const overview = data.overview[0];
  useEffect(()=> {
    changeData()
  },[])
  const changeData = () => {
    const copy = [...data.chartOverviewArray];
    const fake = copy.map((d) => {
      return {
        ...d,
        orderCount: Math.floor(Math.random() * 10),
        items: Math.floor(Math.random() * 10),
        cash: Math.floor(Math.random() * 1000),
      };
    });
    setChartData(fake);
  };

  const returnToOrginalData = () => {
    setChartData([...data.chartOverviewArray]);
  };

  const labels = chartData?.map((d) => dateOnly(d.date));

  const orderData = {
    labels,
    datasets: [
      {
        label: "order",
        data: chartData?.map((d) => d.orderCount),
        // borderColor: "rgb(255, 99, 132)",
    borderColor: 'rgb(132 204 22)',
        backgroundColor: "rgb(132 204 22)",
        tension: 0.3,
        borderWidth: 1,
        pointRadius: 0,
      },
      {
        label: "items sold",
        data: chartData?.map((d) => d.items),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132)",
        tension: 0.3,
        borderWidth: 1,
        pointRadius: 0,
      },
    ],
  };
  const cashData = {
    labels,
    datasets: [
      {
        label: "incoming cash",
        data: chartData?.map((d) => d.cash),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132)",
      },
    ],
  };

  return (
    <>
      <div>
        <button
          className="bg-green-500 text-white px-3 py-1 mr-2 rounded-lg"
          onClick={() => changeData()}
        >
          fake data
        </button>
        <button
          className="bg-green-500 text-white px-3 py-1 mr-2 rounded-lg"
          onClick={() => returnToOrginalData()}
        >
          use real data
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <div className="bg-gradient-to-t to-transparent dark:to-gray-900 from-teal-600 rounded-md dark:bg-green-600/20 dark:text-white">
          <Line
            style={{ height: "200px" }}
            width={"100%"}
            options={options}
            data={orderData}
          />
        </div>
        <div className=" flex flex-col justify-between h-full">
          <div className="grid grid-cols-2 gap-2">
            <div className="rounded-md flex items-center flex-col justify-center bg-teal-600 text-white">
              <p>{overview.totalOrders}</p>
              <p>total orders</p>
            </div>
            <div className="rounded-md flex items-center flex-col justify-center bg-teal-600 text-white">
              <p>{overview.totalSales}</p>
              <p>items sold</p>
            </div>
            <div className="rounded-md flex items-center flex-col justify-center bg-teal-600 text-white">
              <p>{overview.pendingAmount}</p>
              <p>pending cash</p>
            </div>
            <div className="rounded-md flex items-center flex-col justify-center bg-teal-600 text-white">
              <p>{overview.clearedAmount}</p>
              <p>cleared cash</p>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center bg-red-200 py-2 rounded-md mt-2 ">
            <p>Cancellation rate</p>
            <p className="text-red-900 font-bold">
              {((overview.cancelRate * 100) / overview.totalOrders).toFixed(2)}%
            </p>
            <p>
              {overview.cancelRate} of {overview.totalOrders} orders has been
              canceled
            </p>
          </div>
        </div>
      </div>
      <p className="dark:text-gray-500 text-gray-800 mt-2">Last 30 days cash overview:</p>
      <div style={{ height: "150px" }} className="bg-gray-200 rounded-md dark:bg-gray-800 mt-1">
        <Bar width={"100%"} options={options} data={cashData} />
      </div>
<LastThreeOrders orders={data.recentOrders} />

    </>
  );
};

export default LineChart;
