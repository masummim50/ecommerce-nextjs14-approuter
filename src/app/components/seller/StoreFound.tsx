import { Button } from "@nextui-org/react";
import React from "react";
import CreateProductModal from "./CreateProductModal";
import { productType } from "@/app/interfaces/productInterface";
import SellerProductCard from "./SellerProductCard";

const StoreFound = ({ store }: { store: any }) => {
  return (
    <div>
      {/* store information here */}
      <div className="bg-sky-600 text-white flex flex-col items-center justify-center p-3 rounded-md">
        <h2 className="text-lg">{store.name}</h2>
        <p>{store?.followers?.length} Followers</p>
        <p className="text-sm">{store.description}</p>
      </div>
      <div>
        {store?.products?.length === 0 && (
          <div>
            <p>No product has been added to the store</p>
            <CreateProductModal/>
          </div>
        )}
      </div>
      <div>
        {store?.products?.length > 0 && (
            <CreateProductModal/>
        )}
      </div>
      <div>
        {
          store?.products?.map((product:productType)=> (
            <SellerProductCard key={product.id} product={product}/>
          ))
        }
      </div>
    </div>
  );
};

export default StoreFound;
