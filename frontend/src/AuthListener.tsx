import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./services/AuthContext";

export default function AuthListener() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    const handler = () => {
      logout();                 // updates React state
      navigate("/login", { replace: true });
    };

    window.addEventListener("unauthorized", handler);
    return () => window.removeEventListener("unauthorized", handler);
  }, [logout, navigate]);

  return null;
}
