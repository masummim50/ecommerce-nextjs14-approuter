// model CartItem {
//     id       String  @id @default(uuid())
//     product  Product @relation(fields: [productId], references: [id])
//     quantity Int

//     userId    String
//     user      User   @relation(fields: [userId], references: [id])
//     productId String
//   }
import { productType } from "./productInterface";
import { userType } from "./userInterface";

export type cartItemTypeForCartPage = {
  id: string;
  product: productType;
  quantity: number;
  userId: string;
  productId: string;
};
