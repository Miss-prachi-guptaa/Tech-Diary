import { useState } from "react";

export const BlogCard = ({ blog }) => {
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
      "
    >
      {/* Accent bar */}
      <span
        className="
          absolute top-0 left-4 right-4
          sm:left-6 sm:right-6
          h-1 rounded-full
          bg-ash_grey-300/60
        "
      />

      {/* Title */}
      <h2
        className="
          mt-3
          text-lg sm:text-2xl
          font-semibold
          text-powder_petal-900
          leading-snug
          line-clamp-2
        "
      >
        {blog.title}
      </h2>

      {/* Date */}
      <p className="mt-1 text-xs text-dust_grey-700">
        {new Date(blog.createdAt).toDateString()}
      </p>

      {/* Content */}
      <p
        className={`
          mt-4
          text-dust_grey-700
          leading-relaxed
          whitespace-pre-line
          ${expanded ? "" : "line-clamp-3 sm:line-clamp-3"}
        `}
      >
        {blog.content}
      </p>

      {/* READ MORE – ONLY ON SMALL SCREENS */}
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

      {/* IMAGE */}
      {
        blog.image?.url && (
          <div
            className="
            mt-5 sm:mt-6
            rounded-xl
            overflow-hidden
            bg-ash_grey-200/40
            border border-ash_grey-400/40
          "
          >
            <img
              src={blog.image.url}
              alt={blog.title}
              crossOrigin="anonymous"
              className="
              w-full
              h-40 sm:h-56 md:h-64
              object-cover
              transition-transform
              duration-300
              hover:scale-105
            "
            />
          </div>
        )
      }
    </article >
  );
};
