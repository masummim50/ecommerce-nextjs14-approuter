import { Button } from "@nextui-org/react";
import React from "react";
import CreateProductModal from "./CreateProductModal";
import Link from "next/link";
import Products from "@/app/(seller)/seller/store/Products";
import TestForm from "./TestForm";
import StoreEditButton from "./StoreEditButton";
import EditStoreInfoModal from "@/app/(seller)/seller/store/EditStoreInfoModal";
import SellerSearchBox from "./SellerSearchBox";

const StoreFound = ({ store }: { store: any }) => {
  return (
    <div>
      {/* store information here */}
      <div className="bg-indigo-500 text-white flex flex-col items-center justify-center p-3 rounded-md relative">
        <h2 className="text-lg">{store.name}</h2>
        <p>{store?.followers?.length} Followers</p>
        <p className="text-sm">{store.description}</p>
        {/* <StoreEditButton /> */}
        <div className="absolute top-0 right-0">
          <EditStoreInfoModal store={store}/>
        </div>
      </div>

      <div>
        {store?.products?.length === 0 && (
          <div>
            <p className="text-black dark:text-gray-400">No product has been added to the store</p>
            <CreateProductModal />
          </div>
        )}
      </div>
      <div>
        {store?.products?.length > 0 && (
          <div className="flex items-center justify-center">
            <CreateProductModal />
            <SellerSearchBox />
          </div>
        )}
      </div>
    </div>
  );
};

export default StoreFound;
