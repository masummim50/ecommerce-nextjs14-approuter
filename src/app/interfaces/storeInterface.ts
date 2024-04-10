// model Store {
//     id          String    @id @default(uuid())
//     name        String
//     description String
//     seller      Seller    @relation(fields: [sellerId], references: [id])
//     sellerId    String    @unique
//     products    Product[]
//     followers   User[]    @relation(name: "StoreFollowers")
//     orders      Order[]
//   }

import { productType } from "./productInterface";

export type storeType = {
  id: string;
  name: string;
  description: string;
  seller: {};
  sellerId: string;
  products: productType[];
  follower: {};
  orders: {};
};
