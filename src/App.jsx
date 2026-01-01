import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout.jsx";
import RootPage from "./components/RootPage.jsx";
import BlogDetails from "./pages/BlogDetails.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

function App() {
  return (
    <Routes>
      {/* Public Layout */}
      <Route element={<Layout />}>
        <Route path="/" element={<RootPage />} />
      </Route>

      {/* 🔐 Protected Area */}
      <Route
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route path="/blog/:id" element={<BlogDetails />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Route>

      {/* Auth Pages */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;
