interface item {
  storeId: string;
  productId: string;
  productName: string;
  productPrice: number;
  productImages: string[];
  productQuantity: number;
}

export type orderType = {
  id: string;
  status: "pending" | "confirmed" | "shipped" | "delivered";
  storeId: string;
  paymentStatus: "due" | "paid";
  paymentMethod: "cash" | "bank";
  paymentAmount: number;
  userId: string;
  items: item[];
  createdAt: string;
  updatedAt: string;
};
