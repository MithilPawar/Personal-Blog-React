import { useAuth } from "../contexts/AuthContext";
import LandingPage from "../pages/LandingPage";
import Home from "../pages/Home";

const RootPage = () => {
  const { user } = useAuth();

  return user ? <Home /> : <LandingPage />;
};

export default RootPage;