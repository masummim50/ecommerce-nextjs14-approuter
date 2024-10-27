"use client";
import { useCallback } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import bannerone from '../../../public/banner1.jpg';
import styles from "./bannersection.module.css";

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
          <Image src={bannerone} alt="banner" placeholder="blur" fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
        </div>
        <div className={styles.embla_slide}>
          <Image src={"/banner2.jpg"} placeholder="blur" blurDataURL="/banner2.jpg" alt="banner" fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
        </div>
        <div className={styles.embla_slide}>
          <Image src={"/banner3.jpg"}  alt="banner" fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
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
