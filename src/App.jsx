import { Routes, Route, BrowserRouter } from "react-router-dom";
import Layout from "./components/layout/Layout.jsx";
import BlogDetails from "./pages/BlogDetails.jsx";
import CreateBlog from "./pages/CreateBlog.jsx";
import Login from "./pages/Login.jsx";
import About from "./pages/About.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import Home from "./pages/Home.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/blog/:id" element={<BlogDetails />} />
          <Route path="/create" element={<CreateBlog />} />
          <Route path="/about" element={<About />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
