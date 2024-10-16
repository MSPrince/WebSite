import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  selectedItems: 0,
  totalPrice: 0,
  tax: 0,
  taxRate: 0.05,
  grandTotal: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;

      // Find if the product already exists in the cart
      const existingProduct = state.products.find(
        (item) => item._id === product._id
      );

      if (existingProduct) {
        // If the product exists, increase its quantity immutably
        state.products = state.products.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // If it's a new product, add it to the cart with quantity 1
        state.products = [...state.products, { ...product, quantity: 1 }];
      }

      // Recalculate totals
      state.selectedItems = setSelectedItems(state);
      state.totalPrice = setTotalPrice(state);
      state.tax = setTax(state);
      state.grandTotal = setGrandTotal(state);
    },

    updateQuantity: (state, action) => {
      // Update the product quantity
      const updatedProducts = state.products.map((product) => {
        if (product._id === action.payload._id) {
          // Adjust the quantity based on the action type
          return {
            ...product,
            quantity:
              action.payload.type === "increment"
                ? product.quantity + 1
                : product.quantity > 1
                ? product.quantity - 1
                : product.quantity,
          };
        }
        return product;
      });

      // Update the state with the new products list
      state.products = updatedProducts;

      // Recalculate totals
      state.selectedItems = setSelectedItems(state);
      state.totalPrice = setTotalPrice(state);
      state.tax = setTax(state);
      state.grandTotal = setGrandTotal(state);
    },

    removeFromCart: (state, action) => {
      const { _id } = action.payload;
      state.products = state.products.filter((product) => product._id !== _id);

      // Recalculate totals
      state.selectedItems = setSelectedItems(state);
      state.totalPrice = setTotalPrice(state);
      state.tax = setTax(state);
      state.grandTotal = setGrandTotal(state);
    },

    clearCart: (state) => {
      // Clear the cart and reset state
      state.products = [];
      state.selectedItems = 0;
      state.totalPrice = 0;
      state.tax = 0;
      state.grandTotal = 0;
    },
  },
});

// Calculate the total number of selected items
export const setSelectedItems = (state) => {
  return state.products.reduce((total, product) => total + product.quantity, 0);
};

// Calculate the total price based on quantity and price
export const setTotalPrice = (state) => {
  return state.products.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );
};

// Calculate tax based on total price
export const setTax = (state) => state.totalPrice * state.taxRate;

// Calculate grand total (total price + tax)
export const setGrandTotal = (state) => state.totalPrice + state.tax;

export const { addToCart, updateQuantity, removeFromCart, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
