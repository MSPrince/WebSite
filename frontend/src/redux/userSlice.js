import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  _id: "",
  username: "",
  email: "",
  profileImage: "",
  token: "",
  onlineUser: [],
  socketConnection: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      console.log("Received payload for setUser:", action.payload);
      if (action.payload && action.payload._id) {
        state._id = action.payload._id;
        state.username = action.payload.username || "";
        state.email = action.payload.email || "";
        state.profileImage = action.payload.profileImage || "";
      } else {
        console.warn("Invalid payload for setUser:", action.payload);
        // Reset user state if the payload is invalid
        state._id = "";
        state.username = "";
        state.email = "";
        state.profileImage = "";
      }
    },
    setToken: (state, action) => {
      console.log("Setting token:", action.payload);
      state.token = action.payload || "";
    },
    logout: (state) => {
      console.log("User logged out");
      state._id = "";
      state.username = "";
      state.email = "";
      state.profileImage = "";
      state.token = "";
      state.socketConnection = null;
    },
    setOnlineUser: (state, action) => {
      console.log("Setting online users:", action.payload);
      state.onlineUser = Array.isArray(action.payload) ? action.payload : [];
    },
    setSocketConnection: (state, action) => {
      state.socketConnection = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser, setToken, logout, setOnlineUser, setSocketConnection } =
  userSlice.actions;

export default userSlice.reducer;
