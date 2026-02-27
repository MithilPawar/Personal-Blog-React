import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import AdminRoute from "./components/Admin/routes/AdminRoute.jsx";
import Loader from "./components/Loader.jsx";

const Layout = lazy(() => import("./components/layout/Layout.jsx"));
const RootPage = lazy(() => import("./components/RootPage.jsx"));
const BlogDetails = lazy(() => import("./pages/BlogDetails.jsx"));
const Login = lazy(() => import("./pages/Login.jsx"));
const Register = lazy(() => import("./pages/Register.jsx"));
const About = lazy(() => import("./pages/About.jsx"));
const Contact = lazy(() => import("./pages/Contact.jsx"));
const AdminLayout = lazy(() => import("./components/Admin/layout/AdminLayout.jsx"));
const AdminDashboard = lazy(() => import("./components/Admin/pages/AdminDashboard.jsx"));
const AdminBlogs = lazy(() => import("./components/Admin/pages/AdminBlogs.jsx"));
const CreateBlog = lazy(() => import("./components/Admin/pages/CreateBlog.jsx"));
const EditBlog = lazy(() => import("./components/Admin/pages/EditBlog.jsx"));
const AdminBlogPreview = lazy(() => import("./components/Admin/pages/AdminBlogPreview.jsx"));
const AdminBlogComments = lazy(() => import("./components/Admin/pages/AdminBlogComments.jsx"));

function App() {
  return (
    <Suspense fallback={<Loader />}>
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
          <Route path="/dashboard" element={<RootPage />} />
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
          <Route path="blogs/preview/:id" element={<AdminBlogPreview />} />
          <Route path="blogs/:id/comments" element={<AdminBlogComments />} />
        </Route>

        {/* Auth Pages */}
      </Routes>
    </Suspense>
  );
}

export default App;
