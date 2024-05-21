import { baseUrl } from "@/shared/urls";
import { cookies } from "next/headers";
import LineChart from "./LineChart";
import SalesOverview from "./SalesOverview";

const SellerDashboardPage = async () => {
  // fetch the data for the dashboard
  const cookieStore = cookies();
  const token = cookieStore.get("accessToken")?.value;
  const result = await fetch(`${baseUrl}/seller/overview`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
  });
  const data = await result.json();
  console.log("seller dashboard data: ", data);
  return (
    <div className="bg-gray-100 dark:bg-gray-900">

    <div className="p-2">
      <h2>dashboard page</h2>
      <LineChart data={data.data} />
      {/* <pre>{JSON.stringify(data.data.recentOrders, null, 2)}</pre> */}
      {/* <SalesOverview data={data.data?.salesOverview}/> */}
    </div>
    </div>
  );
};

export default SellerDashboardPage;
