import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper";

const Testimonial = () => {
  const testimonials = [
    {
      name: "Jane Doe",
      role: "Web Developer",
      feedback: "This service was amazing! Highly recommend it to everyone.",
      image: "https://via.placeholder.com/100",
    },
    {
      name: "John Smith",
      role: "Designer",
      feedback: "Great experience! The support team was very responsive.",
      image: "https://via.placeholder.com/100",
    },
    {
      name: "Alice Johnson",
      role: "Product Manager",
      feedback: "The quality exceeded my expectations. Will use it again.",
      image: "https://via.placeholder.com/100",
    },
    {
      name: "Michael Brown",
      role: "Software Engineer",
      feedback: "A seamless experience from start to finish!",
      image: "https://via.placeholder.com/100",
    },
    {
      name: "Sarah Wilson",
      role: "UI/UX Designer",
      feedback: "I was impressed with the design quality and user experience.",
      image: "https://via.placeholder.com/100",
    },
  ];

  return (
    <div className="bg-gray-100 py-10">
      <h2 className="text-3xl font-bold text-center mb-8">
        What Our Clients Say
      </h2>
      <div className="max-w-6xl mx-auto">
        <Swiper
          modules={[Pagination]}
          spaceBetween={20}
          slidesPerView={1}
          pagination={{ clickable: true }}
          breakpoints={{
            640: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          className="px-4"
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full mx-auto mb-4"
                />
                <h3 className="text-xl font-semibold text-center">
                  {testimonial.name}
                </h3>
                <p className="text-gray-500 text-center">{testimonial.role}</p>
                <p className="text-gray-700 mt-4">{testimonial.feedback}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Testimonial;
