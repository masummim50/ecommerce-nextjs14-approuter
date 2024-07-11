"use client";
import { addReviewAction, updateReviewAction } from "@/actions/userActions";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";

const ReviewForm = ({
  data,
  productId,
  orderId,
}: {
  data: { id: string; rating: number; content: string } | undefined;
  productId: string;
  orderId: string;
}) => {
  const router = useRouter();
  const [starIndex, setStarIndex] = useState(
    (data?.rating && data.rating - 1) || 0
  );

  const [content, setContent] = useState(data?.content ? data.content : "");

  const [postingReview, setPostingReview] = useState(false);

  const handleAddReview = async () => {
    setPostingReview(true);
    const data = { rating: starIndex + 1, content, orderId };
    
    await addReviewAction(productId, data);
    router.push(`/product/${productId}`)
    setPostingReview(false);
  };
  
  const handleUpdateReview = async () => {
    const review = { rating: starIndex + 1, content };
    
    if (data && data.id) {
      if(review.rating !== data?.rating || review.content !== data?.content){
        setPostingReview(true);
        
        await updateReviewAction(data.id, review,productId);
        setPostingReview(false);
        router.push(`/product/${productId}`)
      }else{
        setShowNothingToUpdate(true);
        setTimeout(() => {
          setShowNothingToUpdate(false);
        }, 1000);
      }
    }
  };

  const [showNothingToUpdate, setShowNothingToUpdate] = useState(false);

  return (
    <div className="max-w-[500px] mx-auto bg-white p-4 rounded shadow-md">
      <div className="star flex items-center gap-3 justify-center">
        {Array(5)
          .fill("")
          .map((a, index) => {
            return (
              <div
                onMouseEnter={() => {
                  setStarIndex(index);
                }}
                className="cursor-pointer"
                key={index}
              >
                <FaStar
                  className={`${
                    index <= starIndex ? "text-orange-400" : "text-gray-300"
                  } text-[40px]`}
                />
              </div>
            );
          })}
      </div>
      <div className="flex justify-center items-center">
        {starIndex === 0 ? (
          <p className="text-red-600 font-bold">Very poor</p>
        ) : starIndex === 1 ? (
          <p className="text-red-300 font-bold">Bad</p>
        ) : starIndex === 2 ? (
          <p className="text-orange-400 font-bold">Okay</p>
        ) : starIndex === 3 ? (
          <p className="text-sky-600 font-bold">Good</p>
        ) : starIndex === 4 ? (
          <p className="text-green-600 font-bold">Best</p>
        ) : (
          ""
        )}
      </div>
      <div className="text flex items-center justify-center">
        <textarea
        disabled={postingReview}
          className="w-full rounded-md p-4 resize-none bg-gray-300 focus:outline-none"
          rows={4}
          placeholder="write review here"
          name="content"
          value={content}
          id=""
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
      </div>
      <div className="flex justify-end">
        {data?.rating ? (
          <Button
          size="sm"
          isLoading={postingReview}
          disabled={postingReview}
            onClick={() => handleUpdateReview()}
            className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-1 rounded-md mt-2"
          >
            {postingReview ? "updating..." : 
            "Update"}
          </Button>
        ) : (
          <Button
          isLoading={postingReview}
          size="sm"
            onClick={() => handleAddReview()}
            className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-1 rounded-md mt-2"
          >
            {postingReview ? "Submitting..." : 
            "Submit"}
          </Button>
        )}
      </div>
        {
          showNothingToUpdate && "Review hasn't changed"
        }
    </div>
  );
};

export default ReviewForm;
