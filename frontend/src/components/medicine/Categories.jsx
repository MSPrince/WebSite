import React from "react";
import category1 from "../../assets/medicine/category-1.avif";
import category2 from "../../assets/medicine/category-2.jpg";
import category3 from "../../assets/medicine/category-3.avif";
import category4 from "../../assets/medicine/category-4.avif";
import category5 from "../../assets/medicine/category-5.avif";
import category6 from "../../assets/medicine/category-6.avif";
import category7 from "../../assets/medicine/category-7.avif";
import category8 from "../../assets/medicine/category-8.avif";
import { Link } from "react-router-dom";
import bgImage from "../../assets/background/home background.avif";

function Categories() {
  const categories = [
    { name: "Gastric & Lever", path: "Gastic-Liver", image: category1 },
    { name: "Thyoride", path: "thyoride-medicine", image: category2 },
    {
      name: "Hair Loss",
      path: "hair-loss",
      image: category3,
    },
    { name: "Immunity Booster", path: "immunity-booster", image: category4 },
    {
      name: "Men Wellness & Stamina",
      path: "men-wellness-&-stamina",
      image: category5,
    },
    { name: "Women Beauty Care", path: "wonen-wellness", image: category6 },
    { name: "Diabetics", path: "diabetics", image: category7 },
    { name: "Piles", path: "piles", image: category8 },
  ];

  return (
    <div
      className="mx-auto max-w-full px-2 sm:px-6 lg:px-8  rounded-lg"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover", // or 'contain' if you prefer
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center", // Adjust position if needed
      }}
    >
      <div className="py-12 text-center">
        <h2 className="text-xl lg:text-3xl font-bold text-primary text-center">
          Categories
        </h2>
        <p className="max-w-lg mx-auto text-md lg:text-lg mt-3 text-gray-500 text-center">
          Discover the array of our different categories which have been created
          to cater to your health and wellness needs. Ranging from basic
          medicines all the way to advanced therapies,
        </p>

        <div className="product__grid grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4  mx-auto">
          {categories.map((category) => (
            <Link
              to={`/categories/${category.path}`}
              key={category.name}
              className="block w-32 h-32 mx-auto text-center"
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-20 h-20 rounded-full object-cover mx-auto"
              />
              <p className=" text-primary text-md lg:text-lg leading-2 mt-2">
                {" "}
                {category.name}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Categories;
