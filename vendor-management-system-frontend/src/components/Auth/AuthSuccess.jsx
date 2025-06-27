import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const AuthSuccess = () => {
  const navigate = useNavigate();
  const { checkAuth } = useAuth();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    const handleAuth = async () => {
      if (token) {
        localStorage.setItem("token", token);
        await checkAuth(); // ensure user is set in context
        navigate("/vendors");
      } else {
        navigate("/login");
      }
    };

    handleAuth();
  }, [checkAuth, navigate]);

  return (
    <div className="loading-container">
      <div className="spinner"></div>
      <p>Signing you in...</p>
    </div>
  );
};

export default AuthSuccess;
