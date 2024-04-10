// model User {
//     id             String     @id @default(uuid())
//     name           String
//     email          String     @unique
//     password       String
//     address        String     @default("")
//     role           String     @default("customer")
//     Review         Review[]
//     cart           CartItem[]
//     followedStores Store[]    @relation(name: "StoreFollowers")
//   }

import { storeType } from "./storeInterface";

export type userType = {
  id: string;
  name: string;
  email: string;
  address: string;
  role: "customer";
  reviews: [];
  cart: [];
  followedStores: storeType[];
};
