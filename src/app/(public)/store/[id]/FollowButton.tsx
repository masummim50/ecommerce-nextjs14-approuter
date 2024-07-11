"use client";
import { followStoreAction, unFollowStoreAction } from "@/actions/userActions";
import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React, { startTransition, useOptimistic, useState } from "react";

const FollowButton = ({
  followers,
  storeId,
}: {
  followers: { id: string }[];
  storeId: string;
}) => {
  const [followProcessing, setFollowProcessing] = useState(false);

  // optimistic followers
  const [optimisticFollowers, optimisticFollowUpdate] = useOptimistic(
    followers,
    (state, { type, userId }) => {
      if (type === "follow") {
        return [...state, { id: userId }];
      } else {
        const newState = state.filter((s) => s.id !== userId);
        return [...newState];
      }
    }
  );

  const user = useAppSelector((state: RootState) => state.auth.user);
  const router = useRouter();
  const isFollowing = optimisticFollowers.find((f) => f.id === user.id);
  const handleFollow = async () => {
    if (!user.id) {
      router.push("/login");
    } else {
      setFollowProcessing(true);
      await followStoreAction(storeId);
      startTransition(() =>
        optimisticFollowUpdate({ type: "follow", userId: user.id })
      );
      setFollowProcessing(false);
    }
  };

  const handleUnFollow = async () => {
    setFollowProcessing(true);
    await unFollowStoreAction(storeId);
    startTransition(() =>
      optimisticFollowUpdate({ type: "unfollow", userId: user.id })
  );
  setFollowProcessing(false);
  };

  return (
    <div>
      {user.role !== "seller" ? (
        <div>
          {isFollowing ? (
            <Button
            size="sm"
            isLoading={followProcessing}
            onClick={handleUnFollow}
            className="absolute top-[50%] right-0 translate-y-[-50%] bg-orange-500 rounded-md text-white px-2 py-1 md:px-4 text-sm md:text-medium cursor-pointer hover:bg-orange-600 hover:shadow-md  mr-2 "
            >
              {followProcessing ? "Processing..." : "UnFollow"}
            </Button>
          ) : (
            <Button
            size="sm"
              isLoading={followProcessing}
              onClick={handleFollow}
              className="absolute top-[50%] right-0 translate-y-[-50%] bg-orange-500 rounded-md text-white px-2 py-1 md:px-4 text-sm md:text-medium cursor-pointer hover:bg-orange-600 hover:shadow-md  mr-2 "
            >
              {followProcessing ? "Processing..." : "Follow"}
            </Button>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default FollowButton;
