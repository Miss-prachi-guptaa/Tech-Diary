const BlogActionsMenu = ({ type }) => {
  return (
    <div className="relative">
      <button className="text-xl px-2">⋮</button>

      {/* Dropdown (make controlled later) */}
      <div className="absolute right-0 mt-2 bg-gray-900 border border-gray-700 rounded shadow-lg text-sm">
        <button className="block px-4 py-2 hover:bg-gray-800 w-full text-left">
          Edit
        </button>

        {type === "published" && (
          <>
            <button className="block px-4 py-2 hover:bg-gray-800 w-full text-left">
              Copy Link
            </button>
            <button className="block px-4 py-2 hover:bg-gray-800 w-full text-left">
              Share
            </button>
          </>
        )}

        {type === "draft" && (
          <button className="block px-4 py-2 hover:bg-gray-800 w-full text-left">
            Publish
          </button>
        )}

        <button className="block px-4 py-2 hover:bg-red-600 w-full text-left text-red-400">
          Delete
        </button>
      </div>
    </div>
  );
};

export default BlogActionsMenu;
