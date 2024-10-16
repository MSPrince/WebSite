// index.jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import DoctorContextProvider from "./context/DoctorContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <DoctorContextProvider>
      <App />
    </DoctorContextProvider>
  </StrictMode>
);
