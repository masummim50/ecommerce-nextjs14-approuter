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

export type productType = {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  images: string[];
  sales: number;
  storeId: string;
  store: {};
  reviews: [];
  CartItem: [];
  OrderItem: [];
};
