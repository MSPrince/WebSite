import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useFetchProductByIdQuery,
  useUpdateProductMutation,
} from "../../../../../redux/features/medicine/productsApi";
import { useSelector } from "react-redux";
import TextInput from "../addProduct/TextInput";
import SelectInput from "../addProduct/SelectInput";
import UploadImage from "../addProduct/UploadImage";
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

const UpdateProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [product, setProduct] = useState({
    name: "",
    category: "",
    color: "",
    benefits: "",
    uses: "",
    price: "",
    description: "",
    image: "",
  });

  const {
    data: productData,
    isLoading: isProductLoading,
    error: fetchError,
    refetch,
  } = useFetchProductByIdQuery(id);

  const [newImage, setNewImage] = useState(null);

  const {
    name,
    category,
    color,
    benefits,
    uses,
    description,
    image: imageURL,
    price,
  } = productData?.product || {};

  const [updateProduct, { isLoading: isUpdating, error: updateError }] =
    useUpdateProductMutation();

  useEffect(() => {
    if (productData) {
      setProduct({
        name: name || "",
        category: category || "",
        color: color || "",
        benefits: benefits.join(", ") || "", // Convert array to string for initial input
        uses: uses || "",
        price: price || "",
        description: description || "",
        image: imageURL || "",
      });
    }
  }, [productData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  const handleImageChange = (image) => {
    setNewImage(image);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convert benefits string to an array
    const benefitsArray = product.benefits
      .split(",")
      .map((benefit) => benefit.trim())
      .filter((benefit) => benefit);

    const updatedProduct = {
      ...product,
      benefits: benefitsArray, // Update benefits to be an array
      image: newImage ? newImage : product.image,
      author: user?._id,
    };

    try {
      await updateProduct({ id: id, ...updatedProduct }).unwrap();
      toast.success("Product updated successfully");
      await refetch();
      navigate("/admin/manage-products");
    } catch (error) {
      console.error("Failed to update product:", error);
    }
  };

  if (isProductLoading) return <div>Loading....</div>;
  if (fetchError) return <div>Error fetching product!...</div>;
  return (
    <div className="container mx-auto  border border-red-800 px-6 py-5">
      <h2 className="text-2xl font-bold mb-6 text-primary">Update Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <TextInput
          label="Product Name"
          name="name"
          placeholder="Ex: Diamond Earrings"
          value={product.name}
          onChange={handleChange}
        />
        <TextInput
          label="Product Benefits"
          name="benefits"
          placeholder="Ex: Enhances stamina, Boosts immunity"
          value={product.benefits}
          onChange={handleChange}
        />
        <TextInput
          label="Product Uses"
          name="uses"
          placeholder="Ex: Helps in hair loss"
          value={product.uses}
          onChange={handleChange}
        />
        <SelectInput
          label="Category"
          name="category"
          value={product.category}
          onChange={handleChange}
          options={categories}
        />
        <SelectInput
          label="Color"
          name="color"
          value={product.color}
          onChange={handleChange}
          options={colors}
        />
        <TextInput
          label="Price"
          name="price"
          type="number"
          placeholder="50"
          value={product.price}
          onChange={handleChange}
        />

        <UploadImage
          name="image"
          id="image"
          value={newImage || product.image}
          placeholder="Image"
          setImage={handleImageChange}
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
            className="add-product-InputCSS"
            value={product.description}
            placeholder="Write a product description"
            onChange={handleChange}
          ></textarea>
        </div>

        <div>
          <button type="submit" className="add-product-btn bg-primary p-2 rounded-md text-white">
            {isUpdating ? "Updating..." : "Update Product"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProduct;
