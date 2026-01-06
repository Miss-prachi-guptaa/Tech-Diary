
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import { Register } from './components/Pages/Register'
import { Login } from './components/Pages/Login'
import { HomePage } from './components/Pages/HomePage'
import { Layout } from './components/Pages/Layout'
import { MyBlogs } from './components/Pages/MyBlog'
import CreateBlog from './components/Pages/CreateBlog'

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <HomePage />
        },
        {
          path: "/my-blogs",
          element: <MyBlogs />
        },
        {
          path: "/create-blog",
          element: <CreateBlog />
        }
      ]
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/login",
      element: <Login />,
    },

  ])
  return <RouterProvider router={router} />
}

export default App
