import React, { useEffect, useState } from "react";
import { useAuth } from "../../../../../store/auth";
import TextInput from "./TextInput";
import SelectInput from "./SelectInput";
import UploadImage from "./UploadImage";
import { useAddProductMutation } from "../../../../../redux/features/medicine/productsApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const categories = [
  { label: "Select Category", value: "" },
  { label: "Men Wellness & Stamina", value: "men-wellness-&-stamina" },
  { label: "Piles", value: "piles" },
  { label: "Diabetics", value: "diabetics" },
  { label: "Gastric & Lever", value: "gastric-liver" },
  { label: "Immunity Booster", value: "immunity-booster" },
  { label: "Hair Loss", value: "hair-loss" },
  { label: "Thyroid", value: "thyroid-medicine" },
  { label: "Women Beauty Care", value: "women-beauty-care" },
];

const colors = [
  { label: "Select Color", value: "" },
  { label: "Black", value: "black" },
  { label: "Red", value: "red" },
  { label: "Gold", value: "gold" },
  { label: "Blue", value: "blue" },
  { label: "Silver", value: "silver" },
  { label: "Beige", value: "beige" },
  { label: "Green", value: "green" },
];

const AddProduct = () => {
  const { user } = useAuth();

  const [product, setProduct] = useState({
    name: "",
    category: "",
    color: "",
    benefits: [],
    uses: "",
    minPrice: "",
    maxPrice: "",
    description: "",
  });
  const [image, setImage] = useState("");
  const [benefit, setBenefit] = useState("");

  const [addProduct, { isLoading, error }] = useAddProductMutation();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleAddBenefit = () => {
    if (benefit.trim() !== "") {
      setProduct((prevProduct) => ({
        ...prevProduct,
        benefits: [...prevProduct.benefits, benefit],
      }));
      setBenefit(""); // Clear the input field
    }
  };

  const handleRemoveBenefit = (index) => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      benefits: prevProduct.benefits.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if all required fields are filled
    if (
      !product.name ||
      !product.category ||
      !product.uses ||
      !product.minPrice ||
      !product.maxPrice ||
      !product.description ||
      !product.color ||
      product.benefits.length === 0
    ) {
      toast.warning("Please fill all the required fields");
      return;
    }

    try {
      // Send a single price value, e.g., using the minimum price or calculating an average
      const singlePrice =
        (parseFloat(product.minPrice) + parseFloat(product.maxPrice)) / 2;

      const productData = {
        ...product,
        price: singlePrice,
        image,
        author: user?._id,
      };

      console.log("Submitting product data:", productData);

      await addProduct(productData).unwrap();
      toast.success("Product added successfully");

      // Reset state after submission
      setProduct({
        name: "",
        category: "",
        color: "",
        benefits: [],
        uses: "",
        minPrice: "",
        maxPrice: "",
        description: "",
      });
      setImage("");
      navigate("/shop");
    } catch (error) {
      console.error("Failed to submit product", error);
    }
  };

   useEffect(() => {
     window.scrollTo(0, 0);
   }, []);
  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold mb-8 text-gray-800">Add New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <TextInput
          label="Product Name"
          name="name"
          placeholder="Ex: Diamond Earrings"
          value={product.name}
          onChange={handleChange}
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <SelectInput
          label="Category"
          name="category"
          value={product.category}
          onChange={handleChange}
          options={categories}
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <SelectInput
          label="Color"
          name="color"
          value={product.color}
          onChange={handleChange}
          options={colors}
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Benefits
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={benefit}
              onChange={(e) => setBenefit(e.target.value)}
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Add a benefit"
            />
            <button
              type="button"
              onClick={handleAddBenefit}
              className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
            >
              Add
            </button>
          </div>
          <ul className="mt-2">
            {product.benefits.map((b, index) => (
              <li key={index} className="flex justify-between items-center">
                <span>{b}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveBenefit(index)}
                  className="text-red-600 hover:underline"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
        <TextInput
          label="Uses"
          name="uses"
          placeholder="Ex: Take one tablet daily"
          value={product.uses}
          onChange={handleChange}
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <TextInput
          label="Min Price"
          name="minPrice"
          type="number"
          placeholder="Ex: 10"
          value={product.minPrice}
          onChange={handleChange}
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <TextInput
          label="Max Price"
          name="maxPrice"
          type="number"
          placeholder="Ex: 100"
          value={product.maxPrice}
          onChange={handleChange}
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <UploadImage
          name="image"
          id="image"
          setImage={setImage}
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            name="description"
            id="description"
            className="border border-gray-300 rounded-md p-2 w-full h-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={product.description}
            placeholder="Write a product description"
            onChange={handleChange}
          ></textarea>
        </div>
        <div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
