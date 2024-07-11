import Image from "next/image";
import React from "react";

// "Best Buy: Your Ultimate Marketplace for Every Need!"

// "Discover Deals, Diverse Vendors, and Endless Choices at Best Buy!"

const Footer = () => {
  return (
    <div className="min-h-[300px] bg-gray-100 dark:bg-gray-800 text-black dark:text-gray-300 pb-8 mt-5">
      <div className="max-w-[1100px] m-auto">
        {/* newsletter */}
        <div className="newsletter flex justify-between pt-5 flex-col md:flex-row p-2">
          <div className="info">
            <h2 className="text-2xl text-indigo-400">Join Our NewsLetter</h2>
            <p className="mt-3">
              We will Send you a nice letter once per week. No scam
            </p>
          </div>
          <div className="">
            <input
              className="border-white p-2 outline-none rounded-md "
              placeholder="Enter  your Email"
            />
            <button className="hover:bg-indigo-600 p-2 bg-indigo-500 text-white rounded-md ">
              Subscribe
            </button>
          </div>
        </div>
        <div className="w-full h-[1px] bg-gray-400"></div>
        <div className="flex flex-col md:flex-row pt-5 justify-center">
          <div className="slogan">
            <div className="icon flex justify-center flex-col items-center">
              <Image src={"/logo.png"} alt="logo" width={50} height={50} />
              <p className="text-indigo-400">Best Buy</p>
            </div>
            <div className="i pt-5 text-center">
              <p>Your Ultimate Marketplace for Every Need!</p>
              <p>
                Discover Deals, Diverse Vendors, and Endless Choices at Best
                Buy!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
