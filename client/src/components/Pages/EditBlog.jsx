import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");


  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  // -------------------------------
  // Fetch existing blog data
  // -------------------------------
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(
          `/api/blog/edit-blog/${id}`,
          { withCredentials: true }
        );

        const blog = res.data.blog;

        setTitle(blog.title);
        setContent(blog.content);
        setPreview(blog.image?.url || "");

      } catch (error) {
        console.error("Fetch blog error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  // -------------------------------
  // Image change
  // -------------------------------
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  // -------------------------------
  // Update blog
  // -------------------------------
  const handleUpdate = async (e) => {
    e.preventDefault();
    setUpdating(true);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);

      if (image) {
        formData.append("image", image);
      }

      await axios.put(
        `/api/blog/update-blog/${id}`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );

      alert("Blog updated successfully 🚀");

      navigate("/my-blogs");

    } catch (error) {
      console.error("Update error:", error);
      alert("Failed to update blog");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading blog...</p>;

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-iron_grey-200 rounded-xl shadow-md">

      <h1 className="text-2xl font-semibold mb-6 text-powder_petal-900">
        Edit Blog
      </h1>

      <form onSubmit={handleUpdate} className="flex flex-col gap-4">

        {/* Title */}
        <input
          type="text"
          placeholder="Blog title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="p-3 border rounded-md"
          required
        />

        {/* Content */}
        <textarea
          placeholder="Write your content..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows="6"
          className="p-3 border rounded-md"
          required
        />

        {/* Image preview */}
        {preview && (
          <div className="mt-3">
            <p className="text-sm text-gray-600 mb-1">Current Image</p>

            <img
              src={preview}
              alt="preview"
              className="w-full h-56 object-cover rounded-lg"
            />
          </div>
        )}

        {/* Upload new image */}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="mt-2"
        />

        {/* Update button */}
        <button
          type="submit"
          disabled={updating}
          className="
            bg-ash_grey-300
            text-white
            py-2 rounded-md
            hover:bg-ash_grey-400
            transition
          "
        >
          {updating ? "Updating..." : "Update Blog"}
        </button>

      </form>
    </div>
  );
};

export default EditBlog;