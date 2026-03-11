import AppRoutes from "./routes/AppRoutes";
import { AuthProvider } from "./context/AuthContext";
import { NotificationProvider } from "./context/NotificationContext";
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <>
          <AppRoutes />
          <Toaster position="top-right" />
        </>
      </NotificationProvider>
    </AuthProvider>
  );
}
