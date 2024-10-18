import { configureStore } from "@reduxjs/toolkit";
import { blogApi } from "./features/blog/blogsApi";
import commentApi from "./features/comments/commentApi";
import authReducer from "./features/auth/authSlice";
import cartReducer from "./Medicine/Features/cartSlice";
import { productsApi } from "./features/medicine/productsApi";
import { reviewsApi } from "./features/medicine/reviewsApi";
import { labTestApi } from "./features/labtest/labTestApi";
import orderApi from "./features/orders/orderApi";
import statsApi from "./features/stats/statsApi";
import userReducer from "./userSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    [labTestApi.reducerPath]: labTestApi.reducer,
    [blogApi.reducerPath]: blogApi.reducer,
    [commentApi.reducerPath]: commentApi.reducer,
    auth: authReducer,
    cart: cartReducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [reviewsApi.reducerPath]: reviewsApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [statsApi.reducerPath]: statsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      blogApi.middleware,
      labTestApi.middleware,
      commentApi.middleware,
      productsApi.middleware,
      statsApi.middleware,
      reviewsApi.middleware,
      orderApi.middleware // Final middleware, no trailing comma needed
    ),
});

// Note: If you want to enable Redux DevTools, ensure you're in development mode
