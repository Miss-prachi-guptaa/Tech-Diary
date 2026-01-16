import { useState } from "react";

const BlogActionsMenu = ({ type }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="text-lg px-2 hover:text-gray-300"
      >
        ⋮
      </button>

      {open && (
        <div className="absolute right-0 mt-2 bg-gray-900 border border-gray-700
        rounded-lg shadow-lg text-sm z-20">

          <Action> Edit </Action>

          {type === "published" && (
            <>
              <Action> Copy Link </Action>
              <Action> Share </Action>
            </>
          )}

          {type === "draft" && <Action> Publish </Action>}

          <Action danger> Delete </Action>
        </div>
      )}
    </div>
  );
};

export default BlogActionsMenu;

const Action = ({ children, danger }) => (
  <button
    className={`block px-4 py-2 w-full text-left
    ${danger
        ? "text-red-400 hover:bg-red-600"
        : "hover:bg-gray-800"}`}
  >
    {children}
  </button>
);
