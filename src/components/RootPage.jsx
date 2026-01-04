import { useAuth } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import Home from "../pages/Home";

const RootPage = () => {
  const { user, loading } = useAuth();

  if (loading) return null;

  if (!user) {
    return <LandingPage />;
  }

  // 🔥 THIS IS THE FIX
  if (user.role === "ADMIN") {
    return <Navigate to="/admin" replace />;
  }

  return <Home />;
};

export default RootPage;
