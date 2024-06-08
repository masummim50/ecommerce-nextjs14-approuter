"use client";
import React, { useCallback } from "react";
import styles from "./bannersection.module.css";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

import useEmblaCarousel from "embla-carousel-react";

import Image from "next/image";
const BannerSection = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div className={styles.embla} ref={emblaRef}>
      <div className={styles.embla_container}>
        <div className={styles.embla_slide}>
          <Image src={"/banner1.jpg"} alt="banner" fill />
        </div>
        <div className={styles.embla_slide}>
          <Image src={"/banner2.jpg"} alt="banner" fill />
        </div>
        <div className={styles.embla_slide}>
          <Image src={"/banner3.jpg"} alt="banner" fill />
        </div>
      </div>
      <button
        className="p-2 md:p-4 rounded-full text-lg absolute top-[50%] left-0 z-100 backdrop-blur-sm border-white border-2 text-white font-bold m-1 translate-y-[-50%]"
        onClick={scrollPrev}
      >
        <IoIosArrowBack />
      </button>
      <button
        className="p-2 md:p-4 rounded-full text-lg absolute top-[50%] right-0 z-100 backdrop-blur-sm border-white border-2 text-white font-bold m-1 translate-y-[-50%]"
        onClick={scrollNext}
      >
        <IoIosArrowForward />
      </button>
    </div>
  );
};

export default BannerSection;
