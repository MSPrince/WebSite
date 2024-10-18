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
import { SocketContextProvider } from "./components/chatting/context/SocketContext.jsx";
import { AuthContextProvider } from './components/chatting/context/AuthContext';


createRoot(document.getElementById("root")).render(
  <AppContextProvider>
    <AdminContextProvider>
      <DoctorContextProvider>
        <AuthContextProvider>
          <SocketContextProvider>
            <Provider store={store}>
              <AuthProvider>
                <StrictMode>
                  <App />

                  <ToastContainer
                    position="bottom-right"
                    autoClose={2000}
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
          </SocketContextProvider>
        </AuthContextProvider>
      </DoctorContextProvider>
    </AdminContextProvider>
  </AppContextProvider>
);
