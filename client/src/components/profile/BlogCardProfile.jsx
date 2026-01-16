import BlogActionsMenu from "./BlogActionMenu";

const BlogCardProfile = ({ type }) => {
  return (
    <div className="bg-gray-800 p-4 rounded-xl hover:bg-gray-750 transition relative">
      <div className="flex justify-between items-start gap-3">
        <h4 className="font-semibold text-sm sm:text-base">
          {type === "draft" && "[Draft] "}Blog Title
        </h4>
        <BlogActionsMenu type={type} />
      </div>

      <p className="text-sm text-gray-400 mt-2 line-clamp-2">
        Short description of the blog goes here...
      </p>

      <p className="text-xs text-gray-500 mt-3">
        {type === "published"
          ? "Published on Jan 12, 2026"
          : "Last edited Jan 10, 2026"}
      </p>
    </div>
  );
};

export default BlogCardProfile;
