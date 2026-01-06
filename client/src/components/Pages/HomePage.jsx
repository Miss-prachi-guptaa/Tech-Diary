import { useEffect, useState } from "react";

import { getAllBlogs } from "../../api/blog.api.js";
import { BlogCard } from "../blog/BlogCard.jsx";

export const HomePage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await getAllBlogs();
        console.log(res);
        setBlogs(res.data.blogs);
        console.log(res.data.blogs)
      } catch (err) {
        setError("Failed to load blogs");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return <p className="text-center mt-10">Loading blogs...</p>;
  }

  if (error) {
    return <p className="text-center mt-10 text-red-500">{error}</p>;
  }

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-2xl space-y-6">
        {blogs.map(blog => (
          <BlogCard key={blog._id} blog={blog} />
        ))}
      </div>
    </div>

  );
};

