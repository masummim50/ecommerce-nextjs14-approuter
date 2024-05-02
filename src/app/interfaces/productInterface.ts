// id          String      @id @default(uuid())
// name        String      @unique
// description String
// price       Float
// stock       Int
// images      String[]
// sales       Int         @default(0)
// storeId     String
// store       Store       @relation(fields: [storeId], references: [id])
// reviews     Review[]
// CartItem    CartItem[]
// OrderItem   OrderItem[]

import { storeType } from "./storeInterface";

export type productType = {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  discount: number;
  images: string[];
  category: string;
  sales: number;
  storeId: string;
  store: storeType;
  reviews: [];
  CartItem: [];
  OrderItem: [];
};
