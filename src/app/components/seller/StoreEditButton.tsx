import EditStoreInfoModal from "@/app/(seller)/seller/store/EditStoreInfoModal";
import React from "react";

const StoreEditButton = () => {
  return (
    <div>
      <button className="absolute top-0 right-0 rounded-md px-4 py-1 bg-white/50">
        Edit
      </button>
      {/* <EditStoreInfoModal /> */}
    </div>
  );
};

export default StoreEditButton;
