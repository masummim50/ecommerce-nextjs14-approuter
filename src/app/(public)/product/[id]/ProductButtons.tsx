"use client";
import { addProductToCartAction } from "@/actions/userActions";
import useToast from "@/app/components/shared/UseToast";
import { productType } from "@/app/interfaces/productInterface";
import { userType } from "@/app/interfaces/userInterface";
import { setProduct } from "@/redux/features/product/productSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import {Button, ButtonGroup} from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const ProductButtons = ({ product }: { product: productType }) => {
  const {performToast} = useToast()
  const [addingToCart, setAddingToCart] = useState(false);
  const dispatch = useAppDispatch();
  const userFromStore = useAppSelector((state: RootState) => state.auth.user);
  const router = useRouter();
  const handleBuyNowClick = () => {
    dispatch(setProduct([{ ...product, quantity: 1 }]));
    router.push("/user/create-order");
  };

  const [showToaster, setShowToaster] = useState(false);
  const handleAddToCart = async () => {
    setAddingToCart(true);
    await addProductToCartAction(product.id);
    setAddingToCart(false);
    performToast("Added to cart successfully");
  };
  return (
    <div>
      
      {userFromStore.role === "seller" ? null : (
        <ButtonGroup className="buttons">
          <Button
            className="text-xs py-1 px-2  md:text-sm md:py-2 md:px-3 h-auto min-w-1 bg-green-500"
            onClick={handleBuyNowClick}
          >
            Buy Now
          </Button>
          <Button
          disabled={addingToCart}
            className="text-xs py-1 px-2 md:text-sm md:py-2 md:px-3 h-auto min-w-1"
            onClick={handleAddToCart}
            isLoading={addingToCart}
          >
            {addingToCart ? 'Adding...' : 
            'Add to Cart'
      }
          </Button>
        </ButtonGroup>
      )}
    </div>
  );
};

export default ProductButtons;
