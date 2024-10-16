import React, { useEffect } from "react";
import HomeBanner from "../../components/medicine/HomeBanner";
import Categories from "../../components/medicine/Categories";
import HeroSection from "../../components/medicine/HeroSection";
import TrandingProducts from "./shop/TrandingProducts";
import DealsSeaction from "./DealsSeaction";
// import PromoBanner from './PromoBanner'
import HomeBlog from "../../components/HomeBlog";
import Services from "../../components/Services";
import bgImage from "../../assets/background/home background.avif";

function OrderMedicine() {
    useEffect(() => {
      window.scrollTo(0, 0), (document.title = "Order Medicine");
    }, []);
  return (
    <div>
      <HomeBanner />

     
      
          <Categories />
          <HeroSection />
          <TrandingProducts />
          <DealsSeaction />
          <Services />
           <div
        className="mx-auto max-w-full px-2 sm:px-6 lg:px-8  rounded-lg -mt-4"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover", // or 'contain' if you prefer
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center", // Adjust position if needed
        }}
      > 
          <HomeBlog />
       </div>
     
    </div>
  );
}

export default OrderMedicine;
