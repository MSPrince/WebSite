import { useAuth } from "./../store/auth";
import { Link } from "react-router-dom";
import bgImage from "../assets/background/home background.avif";
import { useEffect } from "react";

function Services() {
  const { services } = useAuth(); // Get the services data from Auth context
   useEffect(() => {
     window.scrollTo(0, 0), (document.title = "Services");
   }, []);
  return (
    <div
      className="mx-auto max-w-full px-4 sm:px-6 lg:px-8 py-8 bg-gray-50 rounded-lg shadow-lg"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover", // or 'contain' if you prefer
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center", // Adjust position if needed
      }}
    >
      <header>
        <h1 className="text-2xl font-bold mb-6 text-primary text-center">
          Our Services
        </h1>
      </header>

      <div className="  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {services.map((curElem, index) => {
          const { image, description, provider, service } = curElem;

          return (
            <Link
              to=""
              key={index}
              className="flex flex-col items-start border rounded-lg shadow-xl p-5"
            >
              <img
                src={image}
                alt={service || "Service Image"}
                className="mb-4 w-[50px] h-[50px] rounded-full"
              />
              <div className="">
                <h2 className="text-lg font-semibold mb-1 text-primary">
                  {service || "Service"}
                </h2>
                <p className="text-sm">
                  {description || "No description available."}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Services;
