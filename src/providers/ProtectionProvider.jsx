import { useEffect } from "react";
import { useNavigate } from "react-router";
import useAuth from "../hooks/auth/useAuth";

function ProtectionProvider({ children }) {
  const navigate = useNavigate();
  const { isAuthed } = useAuth();

  useEffect(() => {
    if (!isAuthed) {
      navigate("/login", { replace: true });
    }
  }, [isAuthed, navigate]);

  if (!isAuthed) {
    return null;
  }

  return <>{children}</>;
}

export default ProtectionProvider;
