import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true // IMPORTANT (cookie ke liye)
});

/* =========================
   Attach token automatically
========================= */
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

API.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {

        const res = await API.post("/auth/refresh");

        const newAccessToken = res.data.accessToken;

        // save new access token
        localStorage.setItem("accessToken", newAccessToken);

        // attach token & retry original request
        originalRequest.headers.Authorization =
          `Bearer ${newAccessToken}`;

        return API(originalRequest);

      } catch (err) {
        // refresh token expired / invalid
        localStorage.removeItem("accessToken");
        window.location.href = "/login";
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

/* =========================
   Blog APIs
========================= */


// login
export const postLogin = (values) =>
  API.post("/auth/login", values);

//register
export const postRegister = (values) =>
  API.post("/auth/register", values);

// logout
export const postLogout = () =>
  API.post("/auth/logout");

// public – all blogs
export const getAllBlogs = () => API.get("/blogs/all");

// private – my blogs
export const getMyBlogs = () => API.get("/blogs/my");

// create blog
export const createBlog = (formData, token) => {
  return API.post("/blogs/create", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
};

// publish blog
export const publishBlog = (id) =>
  API.put(`/blogs/publish/${id}`);

// delete blog (soft delete)
export const deleteBlog = (id) =>
  API.delete(`/blogs/${id}`);

//