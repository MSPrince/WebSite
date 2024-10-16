import React, { useEffect, useState } from "react";
import img1 from "../../assets/labtest/New folder/DoctorsDiary (3).jpg";
import img2 from "../../assets/labtest/New folder/DoctorsDiary (45).jpg";
import img3 from "../../assets/labtest/New folder/DoctorsDiary (46).jpg";
import img4 from "../../assets/labtest/New folder/DoctorsDiary (54).jpg";
import img5 from "../../assets/labtest/New folder/DoctorsDiary (56).jpg";
import img6 from "../../assets/labtest/New folder/DoctorsDiary (57).jpg";
import bgImage from "../../assets/background/home background.avif";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Autoplay, Pagination } from "swiper/modules";

const Hero = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div
      className="rounded-3xl"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover", // or 'contain' if you prefer
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center", // Adjust position if needed
      }}
    >
      <div className="flex flex-col md:flex-row justify-between items-center md:gap-10 gap-6 md:px-4 py-4 ">
        {/* Left Section (Text) */}
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h1 className="text-3xl font-extrabold lg:text-4xl Textgradient mb-4">
            Welcome to Our Blogs
          </h1>
          <p className="sm:text-xl/relaxed  text-gray-500 text-justify leading-relaxed text-justifycon">
            Discover our medical blog for professional insights that include
            health tips, wellness guidance, and the newest developments in
            medicine. We offer lifestyle suggestions, advanced treatments, and
            articles focused on disease prevention, groundbreaking discoveries,
            and healthcare trends, establishing ourselves as your reliable
            source for trustworthy medical information.
          </p>
        </div>

        {/* Right Section (Swiper) */}
        <div className="w-full md:w-1/2 rounded-lg">
          <Swiper
            slidesPerView={1}
            spaceBetween={10}
            pagination={{
              clickable: true,
            }}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              640: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 1,
                spaceBetween: 30,
              },
              1024: {
                slidesPerView: 1,
                spaceBetween: 40,
              },
            }}
            modules={[Pagination, Autoplay]}
            className="mySwiper rounded-3xl"
          >
            <SwiperSlide>
              <img
                className="w-full lg:h-[320px] sm:h-80 h-72"
                src={img3}
                alt="Doctors Diary Image 1"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                className="w-full lg:h-[320px] sm:h-96 h-80"
                src={img2}
                alt="Doctors Diary Image 2"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                className="w-full lg:h-[320px] sm:h-96 h-80"
                src={img1}
                alt="Doctors Diary Image 3"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                className="w-full lg:h-[320px] sm:h-96 h-80"
                src={img4}
                alt="Doctors Diary Image 4"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                className="w-full lg:h-[320px] sm:h-96 h-80"
                src={img5}
                alt="Doctors Diary Image 5"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                className="w-full lg:h-[320px] sm:h-96 h-80"
                src={img6}
                alt="Doctors Diary Image 6"
              />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default Hero;
