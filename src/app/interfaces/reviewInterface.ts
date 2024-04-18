import { productType } from "./productInterface";
import { userType } from "./userInterface";

// model Review {
//     id        String  @id @default(uuid())
//     content   String
//     rating    Int
//     productId String
//     product   Product @relation(fields: [productId], references: [id])
//     userId    String
//     user      User    @relation(fields: [userId], references: [id])
//   }

export type reviewType = {
  id: string;
  content: string;
  rating: number;
  productId: string;
  product?: productType;
  userId: string;
  user?: userType;
};
