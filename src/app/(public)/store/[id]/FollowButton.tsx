"use client";
import { followStoreAction, unFollowStoreAction } from "@/actions/userActions";
import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import React from "react";

const FollowButton = ({
  followers,
  storeId,
}: {
  followers: {id:string}[];
  storeId: string;
}) => {
    console.log(followers)
  const user = useAppSelector((state: RootState) => state.auth.user);
  const router = useRouter();
  const isFollowing = followers.find((f) => f.id === user.id);
  const handleFollow = async () => {
    if (!user.id) {
      router.push("/login");
    } else {
      await followStoreAction(storeId);
    }
  };
  const handleUnFollow = async () => {
    await unFollowStoreAction(storeId);
  };
  return (
    <div>
      {user.role !== "seller" ? (
        <div>
          {isFollowing  ? (
            <div
              onClick={handleUnFollow}
              className="absolute top-[50%] right-0 translate-y-[-50%] bg-orange-500 rounded-md text-white px-2 py-1 md:px-4 text-sm md:text-medium cursor-pointer hover:bg-orange-600 hover:shadow-md  mr-2 "
            >
              UnFollow
            </div>
          ) : (
            <div
              onClick={handleFollow}
              className="absolute top-[50%] right-0 translate-y-[-50%] bg-orange-500 rounded-md text-white px-2 py-1 md:px-4 text-sm md:text-medium cursor-pointer hover:bg-orange-600 hover:shadow-md  mr-2 "
            >
              Follow
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default FollowButton;
