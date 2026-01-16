import { useState } from "react";
import axios from "axios";
import { createBlog } from "../../api/blog.api";

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if (image) formData.append("image", image);

    try {
      setLoading(true);

      const token = localStorage.getItem("accessToken");

      await createBlog(formData, token);

      alert("Blog created successfully");
      setTitle("");
      setContent("");
      setImage(null);
    } catch (error) {
      console.error(error);
      alert("Failed to create blog");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <form
        onSubmit={handleSubmit}
        className="
          bg-iron_grey-200
          rounded-2xl
          p-6
          border border-ash_grey-400
          shadow-md shadow-ash_grey-300/20
          flex flex-col gap-5
        "
      >
        <h2 className="text-2xl font-semibold text-powder_petal-900">
          Create Blog
        </h2>

        {/* Title */}
        <input
          type="text"
          placeholder="Blog title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="
            w-full
            px-4 py-2
            rounded-lg
            bg-iron_grey-100
            border border-ash_grey-400
            focus:outline-none
            focus:ring-1 focus:ring-ash_grey-400
          "
        />

        {/* Content */}
        <textarea
          placeholder="Write your blog content..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={6}
          required
          className="
            w-full
            px-4 py-2
            rounded-lg
            bg-iron_grey-100
            border border-ash_grey-400
            focus:outline-none
            focus:ring-1 focus:ring-ash_grey-400
            resize-none
          "
        />

        {/* Image */}
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          className="text-sm text-dust_grey-700"
        />

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="
            self-start
            px-6 py-2
            rounded-full
            bg-ash_grey-300
            text-white
            hover:bg-ash_grey-400
            transition
            disabled:opacity-60
          "
        >
          {loading ? "Creating..." : "Create Blog"}
        </button>
      </form>
    </div>
  );
};

export default CreateBlog;
