import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import Billing from "./pages/Billing";
import Menu from "./pages/Menu";
import History from "./pages/History";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthListener from "./AuthListener";
import { AuthProvider } from "./services/AuthContext";

export default function App() {
  return (
    <AuthProvider>
    <BrowserRouter>
      <AuthListener />
      <Routes>
        {/* Public */}
        <Route path="/login" element={<Login />} />

        {/* Protected */}
        <Route
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<Billing />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/history" element={<History />} />
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
    </AuthProvider>
  );
}
