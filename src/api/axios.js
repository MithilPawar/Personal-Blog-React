import axios from "axios";

const ensureApiBasePath = (rawUrl) => {
  if (!rawUrl) {
    return rawUrl;
  }

  const trimmedUrl = rawUrl.trim().replace(/\/$/, "");
  return /\/api$/i.test(trimmedUrl) ? trimmedUrl : `${trimmedUrl}/api`;
};

const configuredBaseUrl = import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_URL;
const isLocalhost =
  typeof window !== "undefined" && ["localhost", "127.0.0.1"].includes(window.location.hostname);
const fallbackBaseUrl = isLocalhost
  ? "http://localhost:8080/api"
  : "https://personal-blog-springboot.onrender.com/api";

const API = axios.create({
  baseURL: ensureApiBasePath(configuredBaseUrl) || fallbackBaseUrl,
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;