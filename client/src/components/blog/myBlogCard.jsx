import { FaEdit, FaTrash } from "react-icons/fa";
import { useState } from "react";

const MyBlogCard = ({ blog, onDelete, onPublish, onEdit }) => {
  const isPublished = blog.status === "PUBLISHED";
  const [expanded, setExpanded] = useState(false);

  return (
    <article
      className="
        bg-iron_grey-200
        rounded-2xl
        p-4 sm:p-6
        border border-ash_grey-400
        shadow-md shadow-ash_grey-300/20
        relative
        flex flex-col
      "
    >
      {/* Accent bar */}
      <span className="absolute top-0 left-4 right-4 sm:left-6 sm:right-6
        h-1 rounded-full bg-ash_grey-300/60" />

      {/* TOP ROW */}
      <div className="mt-3 flex flex-col sm:flex-row
        sm:items-center sm:justify-between gap-3">

        {/* Title */}
        <h2 className="
          text-lg sm:text-2xl
          font-semibold text-powder_petal-900
          leading-snug
          line-clamp-2 sm:line-clamp-1
        ">
          {blog.title}
        </h2>

        {/* Actions */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          {isPublished ? (
            <span className="
              px-3 py-1 text-xs rounded-full
              bg-ash_grey-300/30 text-ash_grey-400
            ">
              Published
            </span>
          ) : (
            <button
              onClick={() => onPublish(blog._id)}
              className="
                px-3 py-1 text-xs rounded-full
                bg-ash_grey-300 text-white
                hover:bg-ash_grey-400 transition
              "
            >
              Publish
            </button>
          )}
          <button
            onClick={() => onEdit(blog)}
            className="text-ash_grey-300 hover:text-ash_grey-400 transition"
            title="Edit"
          >
            <FaEdit />
          </button>

          <button
            onClick={() => onDelete(blog._id)}
            className="text-red-400 hover:text-red-500 transition"
            title="Delete"
          >
            <FaTrash />
          </button>
        </div>
      </div>

      {/* Date */}
      <p className="mt-1 text-xs text-dust_grey-700">
        Updated {new Date(blog.updatedAt).toDateString()}
      </p>

      {/* Content */}
      <p
        className={`
          mt-4 text-dust_grey-700 leading-relaxed
          ${expanded ? "" : "line-clamp-3 sm:line-clamp-3"}
        `}
      >
        {blog.content}
      </p>

      {/* READ MORE – ONLY ON SMALL SCREENS */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="
          sm:hidden mt-2 text-sm
          text-blue-500 hover:underline
          self-start
        "
      >
        {expanded ? "Show less" : "Read more"}
      </button>

      {/* IMAGE */}
      {blog.image?.url && (
        <div
          className="
            mt-5 sm:mt-6
            rounded-xl overflow-hidden
            bg-ash_grey-200/40
            border border-ash_grey-400/40
          "
        >
          <img
            src={blog.image.url}
            alt={blog.title}
            className="
              w-full
              h-40 sm:h-56 md:h-64
              object-cover
              transition-transform duration-300
              hover:scale-105
            "
          />
        </div>
      )}
    </article>
  );
};

export default MyBlogCard;
