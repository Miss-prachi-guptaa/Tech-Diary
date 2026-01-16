import BlogCardProfile from "./BlogCardProfile";

const ProfileDashboard = () => {
  return (
    <div className="flex flex-col gap-6">

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard title="Total Blogs" value="12" />
        <StatCard title="Published" value="8" />
        <StatCard title="Drafts" value="4" />
      </div>

      {/* Blogs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        <div>
          <h3 className="text-lg font-semibold mb-4">
            Published Blogs
          </h3>
          <div className="space-y-4">
            <BlogCardProfile type="published" />
            <BlogCardProfile type="published" />
          </div>
        </div>

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

/* Stats */
const StatCard = ({ title, value }) => (
  <div className="bg-gray-800 rounded-xl p-4 text-center hover:bg-gray-700 transition">
    <p className="text-sm text-gray-400">{title}</p>
    <p className="text-2xl font-bold mt-1">{value}</p>
  </div>
);
