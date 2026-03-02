import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { ThemeProvider } from "./contexts/ThemeContext.jsx";
import "./index.css";
import App from "./App.jsx";

const storedTheme = localStorage.getItem("theme");
const shouldUseDark =
  storedTheme === "dark" ||
  (!storedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches);

if (shouldUseDark) {
  document.documentElement.classList.add("dark");
}

createRoot(document.getElementById("root")).render(
    <StrictMode>
      <BrowserRouter>
        <ThemeProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </ThemeProvider>
      </BrowserRouter>
    </StrictMode>
);
