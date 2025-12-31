import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import RootPage from "./components/RootPage.jsx";
import BlogDetails from "./pages/BlogDetails.jsx";
import CreateBlog from "./pages/CreateBlog.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import Home from "./pages/Home.jsx";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<RootPage />} />
        <Route path="/blog/:id" element={<BlogDetails />} />
        <Route
          path="/create"
          element={
            <ProtectedRoute>
              <CreateBlog />
            </ProtectedRoute>
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Route>
      
      <Route path="/login" element={<Login />} />{" "}
      <Route path="/register" element={<Register />} />{" "}
    </Routes>
  );
}

export default App;
