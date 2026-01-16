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


function App() {
  const router = createBrowserRouter([
    // 🔹 MAIN APP LAYOUT (Navbar + App Sidebar)
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "/my-blogs",
          element: <MyBlogs />,
        },
        {
          path: "/create-blog",
          element: <CreateBlog />,
        },
      ],
    },

    // 🔹 PROFILE LAYOUT (Navbar only)
    {
      path: "/",
      element: <ProfileLayout />,
      children: [
        {
          path: "/profile",
          element: <Profile />,
        },
        // later you can add:
        // {
        //   path: "/users/:id",
        //   element: <Profile />,
        // }
      ],
    },

    // 🔹 AUTH PAGES (no layout)
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/login",
      element: <Login />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
