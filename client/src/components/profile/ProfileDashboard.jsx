import BlogCardProfile from "./BlogCardProfile";



const ProfileDashboard = () => {
  return (
    <div className="h-full flex flex-col gap-6">

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <StatCard title="Total Blogs" value="12" />
        <StatCard title="Published" value="8" />
        <StatCard title="Drafts" value="4" />
      </div>

      {/* Blog Sections */}
      <div className="grid grid-cols-2 gap-6 flex-1">

        {/* Published Blogs */}
        <div>
          <h3 className="text-lg font-semibold mb-4">
            Published Blogs
          </h3>
          <div className="space-y-4">
            <BlogCardProfile type="published" />
            <BlogCardProfile type="published" />
          </div>
        </div>

        {/* Draft Blogs */}
        <div>
          <h3 className="text-lg font-semibold mb-4">
            Draft Blogs
          </h3>
          <div className="space-y-4">
            <BlogCardProfile type="draft" />
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProfileDashboard;

/* ---- Helper Components ---- */

const StatCard = ({ title, value }) => {
  return (
    <div className="bg-gray-800 rounded-lg p-4 text-center">
      <p className="text-sm text-gray-400">{title}</p>
      <p className="text-2xl font-bold mt-1">{value}</p>
    </div>
  );
};
