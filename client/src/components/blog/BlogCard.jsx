import { useState } from "react";

export const BlogCard = ({ blog }) => {
  const [expanded, setExpanded] = useState(false);
  const isLong = blog.content.length > 30;

  return (
    <article
      className="
        bg-iron_grey-200
        rounded-2xl
        p-6
        border border-ash_grey-400
        shadow-md shadow-ash_grey-300/20
        relative
      "
    >
      {/* subtle green accent bar */}
      <span className="absolute top-0 left-6 right-6 h-1 rounded-full bg-ash_grey-300/60" />

      {/* Title */}
      <h2 className="mt-3 text-2xl font-semibold text-powder_petal-900 leading-snug">
        {blog.title}
      </h2>

      {/* Date */}
      <p className="mt-1 text-xs text-dust_grey-700">
        {new Date(blog.createdAt).toDateString()}
      </p>

      {/* Content */}
      <p className="mt-4 text-dust_grey-700 leading-relaxed whitespace-pre-line">
        {expanded || !isLong
          ? blog.content
          : `${blog.content.slice(0, 30)}...`}
      </p>

      {/* Read more */}
      {isLong && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="
            mt-2
            text-sm
            font-medium
            text-ash_grey-300
            hover:text-ash_grey-400
            transition
          "
        >
          {expanded ? "Show less" : "Read more"}
        </button>
      )}

      {/* IMAGE BELOW CONTENT */}
      {blog.image?.url && (
        <div
          className="
            mt-6
            rounded-xl
            overflow-hidden
            bg-ash_grey-200/40
            border border-ash_grey-400/40
          "
        >
          <img
            src={blog.image.url}
            alt={blog.title}
            className="
              w-full
              h-64
              object-cover
              hover:scale-105
              transition-transform
              duration-300
            "
          />
        </div>
      )}
    </article>
  );
};


