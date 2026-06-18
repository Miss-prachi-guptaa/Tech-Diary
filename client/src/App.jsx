import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";

import { Register } from "./components/Pages/Register";
import { Login } from "./components/Pages/Login";
import { HomePage } from "./components/Pages/HomePage";
import { MyBlogs } from "./components/Pages/MyBlog";
import CreateBlog from "./components/Pages/CreateBlog";
import Profile from "./components/Pages/Profile";

import { ProfileLayout } from "./layout/Profile.layout";
import { Layout } from "./layout/MainLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import EditBlog from "./components/Pages/EditBlog";
import EditProfile from "./components/profile/EditProfile";
import PublicRoute from "./components/PublicRoute";

function App() {
  const router = createBrowserRouter([
    // 🔐 PROTECTED AREA
    {
      element: <ProtectedRoute />,
      children: [
        // 🔹 MAIN APP LAYOUT
        {
          path: "/",
          element: <Layout />,
          children: [
            { index: true, element: <HomePage /> },
            { path: "my-blogs", element: <MyBlogs /> },
            { path: "edit-blog/:id", element: <EditBlog /> },
            { path: "create-blog", element: <CreateBlog /> },
          ],
        },

        // 🔹 PROFILE LAYOUT
        {
          path: "/",
          element: <ProfileLayout />,
          children: [
            { path: "profile", element: <Profile /> },
            { path: "edit-profile", element: <EditProfile /> },
          ],
        },
      ],
    },

    // 🔓 PUBLIC AUTH ROUTES
    {
      element: <PublicRoute />,
      children: [
        { path: "/login", element: <Login /> },
        { path: "/register", element: <Register /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
