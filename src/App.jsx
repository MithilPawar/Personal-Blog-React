import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout.jsx";
import RootPage from "./components/RootPage.jsx";
import BlogDetails from "./pages/BlogDetails.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

import AdminLayout from "./components/Admin/layout/AdminLayout.jsx";
import AdminDashboard from "./components/Admin/pages/AdminDashboard.jsx";
import AdminBlogs from "./components/Admin/pages/AdminBlogs.jsx";
import CreateBlog from "./components/Admin/pages/CreateBlog.jsx";
import AdminRoute from "./components/Admin/routes/AdminRoute.jsx";
import EditBlog from "./components/Admin/pages/EditBlog.jsx";
import AdminBlogPreview from "./components/Admin/pages/AdminBlogPreview.jsx";
import AdminBlogComments from "./components/Admin/pages/AdminBlogComments.jsx";

function App() {
  return (
    <Routes>
      {/* Public Layout */}
      <Route element={<Layout />}>
        <Route path="/" element={<RootPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
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
        <Route path="/dashnoard" element={<RootPage />} />
      </Route>

      {/* 🔐 ADMIN AREA */}
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminLayout />
          </AdminRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="blogs" element={<AdminBlogs />} />
        <Route path="blogs/create" element={<CreateBlog />} />
        <Route path="blogs/edit/:id" element={<EditBlog />} />
        <Route path="/admin/blogs/preview/:id" element={<AdminBlogPreview />} />
        <Route path="/admin/blogs/:id/comments" element={<AdminBlogComments />} />
      </Route>

      {/* Auth Pages */}
    </Routes>
  );
}

export default App;
