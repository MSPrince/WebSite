import HeroSection from "../components/HeroSection.jsx";
import HomeBlog from "../components/HomeBlog.jsx";
import bgImage from "../assets/background/home background.avif";
import products from "../pages/OrderMedicine/data/products.json";
import OurServices from "../components/OurServices.jsx";
import Homecomplete from "../components/Homecomplete.jsx";
import { useEffect } from "react";
import ProductCard from "./OrderMedicine/shop/ProductCard.jsx";
import { Link } from "react-router-dom";
import DownloadApp from "../components/DownloadApp.jsx";
import ResearchSection from "../components/ResearchSection.jsx";
import WorkProcess from "../components/hhhhhhh.jsx";
import Hero from './../components/blog/Hero';
import TrandingProducts from "./OrderMedicine/shop/TrandingProducts.jsx";
// import Testimonial from './Testimonial';

function Home() {
     useEffect(() => {
       window.scrollTo(0, 0),
         (document.title = "Doctor's Diary");
     }, []);
  return (
    <>
      <HeroSection />
      <OurServices />
      <div
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover", // or 'contain' if you prefer
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center", // Adjust position if needed
        }}
        className="mx-auto max-w-full px-4 sm:px-6 lg:px-7 pb-6"
      >
        <div className="container mx-auto my-1">
          <HomeBlog />

          <div className="-mb-10  py-20 ">
            <TrandingProducts />
          </div>
        </div>
      </div>

      <DownloadApp />

      <ResearchSection />
      {/* <Testimonial/> */}
      <Homecomplete />
    </>
  );
}

export default Home;
