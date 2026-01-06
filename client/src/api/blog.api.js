import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

/* =========================
   Attach token automatically
========================= */
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/* =========================
   Blog APIs
========================= */

// public – all blogs
export const getAllBlogs = () => API.get("/blogs/all");

// private – my blogs
export const getMyBlogs = () => API.get("/blogs/my");

// publish blog
export const publishBlog = (id) =>
  API.put(`/blogs/publish/${id}`);

// delete blog (soft delete)
export const deleteBlog = (id) =>
  API.delete(`/blogs/${id}`);
