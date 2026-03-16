import { useState } from "react";
import { updateBlog } from "../../api/blog.api.js";

const EditBlogModal = ({ blog, onClose }) => {

  const [title, setTitle] = useState(blog.title);
  const [content, setContent] = useState(blog.content);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(blog.image?.url);

  const handleImage = (e) => {
    const file = e.target.files[0];
    setImage(file);

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleUpdate = async () => {

    console.log("Update clicked");
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);

    if (image) {
      formData.append("image", image);
    }

    await updateBlog(blog._id, formData);

    onClose();
    window.location.reload();
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">

      <div className="bg-iron_grey-200 w-[700px] rounded-2xl p-6 border border-ash_grey-400">

        {/* Header */}
        <div className="flex justify-between mb-4">
          <h2 className="text-xl text-powder_petal-900 font-semibold">
            Edit Blog
          </h2>

          <button onClick={onClose}>✕</button>
        </div>

        {/* Title */}
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 mb-3 rounded bg-ash_grey-200 border border-ash_grey-400"
        />

        {/* Content */}
        <textarea
          rows={5}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-2 mb-3 rounded bg-ash_grey-200 border border-ash_grey-400"
        />

        {/* Image preview */}
        {preview && (
          <img
            src={preview}
            className="rounded-lg mb-3 max-h-60 object-cover"
          />
        )}

        <input type="file" onChange={handleImage} />

        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-5">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 rounded"
          >
            Cancel
          </button>

          <button
            onClick={handleUpdate}
            className="px-4 py-2 bg-ash_grey-300 text-white rounded"
          >
            Update Blog
          </button>
        </div>

      </div>
    </div>
  );
};

export default EditBlogModal;