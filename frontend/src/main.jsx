import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthProvider } from "./store/auth.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import { store } from './redux/store';
// import "./medicine.css";
import AppContextProvider from "./context/AppContext.jsx";
import DoctorContextProvider from "./context/DoctorContext.jsx";
import AdminContextProvider from "./context/AdminContext.jsx";
import { Toaster } from "react-hot-toast";


createRoot(document.getElementById("root")).render(
  <AppContextProvider>
    <AdminContextProvider>
      <DoctorContextProvider>
       
            <Provider store={store}>
              <AuthProvider>
                <StrictMode>
                  <App />

                  <ToastContainer
                    position="bottom-right"
                    autoClose={1000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="dark"
                  />
                  <Toaster />
                </StrictMode>
              </AuthProvider>
            </Provider>
        
      </DoctorContextProvider>
    </AdminContextProvider>
  </AppContextProvider>
);
