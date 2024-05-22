"use client";
import { addProductToCartAction } from "@/actions/userActions";
import { productType } from "@/app/interfaces/productInterface";
import { userType } from "@/app/interfaces/userInterface";
import { setProduct } from "@/redux/features/product/productSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const ProductButtons = ({ product }: { product: productType }) => {
  const dispatch = useAppDispatch();
  const userFromStore = useAppSelector((state: RootState) => state.auth.user);
  const router = useRouter();
  const handleBuyNowClick = () => {
    dispatch(setProduct([{ ...product, quantity: 1 }]));
    router.push("/user/create-order");
  };

  const handleAddToCart = async () => {
    await addProductToCartAction(product.id);
  };
  return (
    <div>
      {userFromStore.role === "seller" ? null : (
        <div className="buttons">
          <Button onClick={handleBuyNowClick}>Buy Now</Button>
          <Button onClick={handleAddToCart}>Add to Cart</Button>
        </div>
      )}
    </div>
  );
};

export default ProductButtons;
