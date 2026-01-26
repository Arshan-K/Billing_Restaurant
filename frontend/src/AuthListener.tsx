// AuthListener.tsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AuthListener() {
  const navigate = useNavigate();

  useEffect(() => {
    const handler = () => {
      navigate("/login", { replace: true });
    };

    window.addEventListener("unauthorized", handler);
    return () => window.removeEventListener("unauthorized", handler);
  }, [navigate]);

  return null;
}
