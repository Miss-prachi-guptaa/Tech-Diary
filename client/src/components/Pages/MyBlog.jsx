import { useEffect, useState } from "react";
import { getMyBlogs, publishBlog } from "../../api/blog.api.js";
import MyBlogCard from "../blog/myBlogCard.jsx";
import { useNavigate } from "react-router-dom";
import EditBlogModal from "./EditBlogModal.jsx";


export const MyBlogs = () => {

  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [editingBlog, setEditingBlog] = useState(null);

  useEffect(() => {
    const fetchMyBlogs = async () => {
      try {
        const res = await getMyBlogs();
        console.log(res.data.blogs)
        setBlogs(res.data.blogs);
      } catch (error) {
        console.error("Failed to fetch my blogs", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyBlogs();
  }, []);

  if (loading) {
    return <p className="text-center mt-10">Loading your blogs...</p>;
  }

  if (blogs.length === 0) {
    return (
      <div className="text-center mt-10">
        <p className="text-dust_grey-700">
          You haven’t written any blogs yet.
        </p>
      </div>
    );
  }

  const handleDelete = (id) => {
    // later we’ll add confirmation modal
    console.log("Delete blog:", id);
  };


  const handlePublish = async (id) => {
    try {
      await publishBlog(id);

      setBlogs((prev) =>
        prev.map((blog) =>
          blog._id === id
            ? { ...blog, status: "PUBLISHED" }
            : blog
        )
      );
    } catch (error) {
      console.error("Failed to publish blog");
    }
  };

  const handleEdit = (blog) => {
    setEditingBlog(blog);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      {blogs.map((blog) => (
        <MyBlogCard
          key={blog._id}
          blog={blog}
          onDelete={handleDelete}
          onPublish={handlePublish}
          onEdit={handleEdit}
        />
      ))}

      {/* Edit Blog Modal */}
      {editingBlog && (
        <EditBlogModal
          blog={editingBlog}
          onClose={() => setEditingBlog(null)}
        />
      )}
    </div>


  );
};

