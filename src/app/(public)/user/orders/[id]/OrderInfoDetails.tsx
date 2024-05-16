import { formatDate } from "@/helpers/formatDate";
import Link from "next/link";
import OrderTimeline from "./OrderTimeline";
import MarkAsReceivedButton from "./MarkAsReceivedButton";



function estimateDelivery(dateString:string):string {
    // Parse the input string to a Date object
    const date = new Date(dateString);
    
    // Increase the date by 7 days
    date.setDate(date.getDate() + 7);
    
    // Convert the date back to ISO 8601 format
    const newDateString = date.toISOString();
    
    // Return the new date string
    return newDateString;
}

type itemType = {
  storeId: string;
  productId: string;
  productName: string;
  productPrice: number;
  productImages: string[];
  productQuantity: number;
};
type storeType = {
    id:string;
    name:string;
    description:string;
    sellerId:string;
    createdAt:string;
    updatedAt:string;
}
type orderDetailsType = {
  id: string;
  status: "pending" | "confirmed" | "shipped" | "delivered";
  storeId: string;
  paymentStatus: "due";
  paymentMethod: "cash";
  paymentAmount: number;
  userId: string;
  items: itemType[];
  createdAt: string;
  updatedAt: string;
  Store:storeType;
};

const OrderInfoDetails = ({ details }: { details: orderDetailsType }) => {

  return <div>
    <h2>Order details:</h2>
    <div className="p-2 shadow-md flex justify-between items-center mb-2 bg-white">
        <div>
            <p>Order #{details.id}</p>
            <p>Order Placed on: {formatDate(details.createdAt)}</p>
        </div>
        <div>
            <p>Total: ${details.paymentAmount}</p>
        </div>
    </div>
    <div className="p-2 border-b-[1px] border-gray-300 bg-white">
        <h2>Package 1</h2>
        <p>Sold by <Link href={`/store/${details.storeId}`}>{details.Store.name}</Link></p>
    </div>
    <div className="p-2 mb-2 bg-white flex justify-between">
        <h2>{details.status === 'delivered' ? `Delivered On ${formatDate(details.updatedAt)}` : `Estimated Delivery date: ${formatDate(estimateDelivery(details.updatedAt))}`}</h2>
        {
          details.status === 'shipped' && <MarkAsReceivedButton id={details.id}/>
        }
    </div>
    <OrderTimeline status={details.status} date={details.updatedAt}/>
  </div>;
};

export default OrderInfoDetails;
