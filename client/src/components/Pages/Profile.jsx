import { useEffect, useState } from "react";
import { FaUserEdit, FaKey, FaSignOutAlt } from "react-icons/fa";

import { useNavigate } from "react-router-dom";
import { getMyBlogs, getProfile } from "../../api/blog.api.js";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [activeTab, setActiveTab] = useState("PUBLISHED");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("accessToken");

        if (!token) {
          navigate("/login");
          return;
        }

        const profileRes = await getProfile();

        setProfile(profileRes.data.user);

        const res = await getMyBlogs();
        console.log(res.data.blogs);
        setBlogs(res.data.blogs);
      } catch (error) {
        console.error("API ERROR:", error.response?.data || error.message);
        if (error.response?.status === 401) {
          localStorage.removeItem("accessToken");
          navigate("/login");
        }
      }
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/login");
  };

  if (!profile) return <div className="text-white p-10">Loading...</div>;

  const firstLetter = profile.name.charAt(0).toUpperCase();

  const publishedBlogs = blogs.filter((blog) => blog.status === "PUBLISHED");

  const draftBlogs = blogs.filter((blog) => blog.status === "DRAFT");

  const filteredBlogs = blogs.filter((blog) => blog.status === activeTab);

  return (
    <div className="bg-[#0f172a] min-h-screen text-white px-4 sm:px-6 md:px-10 lg:px-20 py-6 sm:py-10">
      {/* ========================= */}
      {/* TOP SECTION (Responsive)  */}
      {/* ========================= */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* LEFT SIDE */}
        <div className="bg-[#1e293b] p-6 sm:p-8 rounded-xl shadow-md">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-6">
            {/* Avatar */}
            <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-gray-600">
              {profile.profilePicture ? (
                <img
                  src={profile.profilePicture}
                  alt={profile.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-[#334155] flex items-center justify-center text-3xl font-semibold">
                  {firstLetter}
                </div>
              )}
            </div>

            <div className="text-center sm:text-left">
              <h2 className="text-xl sm:text-2xl font-semibold">
                {profile.name}
              </h2>

              <p className="text-gray-400">
                @{profile.username || `user${profile.id.slice(-4)}`}
              </p>
              {profile.bio && (
                <p className="text-sm text-gray-300 mt-2">{profile.bio}</p>
              )}

              <div className="flex gap-5 mt-3 text-sm">
                <span>
                  <strong>{profile.followersCount || 0}</strong> Followers
                </span>

                <span>
                  <strong>{profile.followingCount || 0}</strong> Following
                </span>
              </div>
              <p className="text-gray-400 text-xs sm:text-sm mt-2">
                Member Since: {new Date(profile.createdAt).toDateString()}
              </p>
            </div>
          </div>

          {/* Buttons */}
          {/* Buttons */}
          <div className="flex gap-3 mt-4">
            {/* Edit Profile */}
            <button
              onClick={() => navigate("/edit-profile")}
              className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 px-3 sm:px-4 py-2 rounded-lg text-sm"
            >
              <FaUserEdit />
              <span className="hidden sm:inline">Edit Profile</span>
            </button>

            {/* Change Password */}
            <button
              onClick={() => navigate("/change-password")}
              className="flex items-center justify-center gap-2 bg-yellow-600 hover:bg-yellow-700 px-3 sm:px-4 py-2 rounded-lg text-sm"
            >
              <FaKey />
              <span className="hidden sm:inline">Change Password</span>
            </button>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 px-3 sm:px-4 py-2 rounded-lg text-sm"
            >
              <FaSignOutAlt />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>

        {/* RIGHT SIDE - STATS */}
        <div className="bg-[#1e293b] p-6 sm:p-8 rounded-xl shadow-md">
          <h3 className="text-lg sm:text-xl font-semibold mb-6 text-center lg:text-left">
            Your Activity
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div className="bg-[#0f172a] p-5 rounded-lg text-center">
              <p className="text-gray-400 text-sm">Total Blogs</p>
              <h2 className="text-xl sm:text-2xl font-bold">
                {profile.totalBlogs}
              </h2>
            </div>

            <div className="bg-[#0f172a] p-5 rounded-lg text-center">
              <p className="text-gray-400 text-sm">Published</p>
              <h2 className="text-xl sm:text-2xl font-bold text-green-400">
                {profile.totalPublished}
              </h2>
            </div>

            <div className="bg-[#0f172a] p-5 rounded-lg text-center">
              <p className="text-gray-400 text-sm">Drafts</p>
              <h2 className="text-xl sm:text-2xl font-bold text-yellow-400">
                {profile.totalDrafts}
              </h2>
            </div>
          </div>
        </div>
      </div>

      {/* ================= POSTS SECTION ================= */}

      <div className="mt-8 sm:mt-12">
        {/* Section Title */}
        <h2 className="text-2xl font-semibold mb-6">Posts</h2>

        {/* Toggle Buttons */}
        <div className="flex gap-6 text-sm sm:text-base mb-6 border-b border-gray-700 pb-2">
          <button
            onClick={() => setActiveTab("PUBLISHED")}
            className={`pb-2 text-sm font-medium ${
              activeTab === "PUBLISHED"
                ? "border-b-2 border-gray-300 text-white"
                : "text-gray-400"
            }`}
          >
            Published
          </button>

          <button
            onClick={() => setActiveTab("DRAFT")}
            className={`pb-2 text-sm font-medium ${
              activeTab === "DRAFT"
                ? "border-b-2 border-gray-300 text-white"
                : "text-gray-400"
            }`}
          >
            Draft
          </button>
        </div>

        {/* Posts List */}
        {filteredBlogs.length === 0 ? (
          <p className="text-gray-400">
            No {activeTab.toLowerCase()} posts yet.
          </p>
        ) : (
          <div className="space-y-6">
            {filteredBlogs.map((blog) => (
              <div
                key={blog._id}
                className="bg-[#1e293b] border border-gray-700 rounded-xl p-4 sm:p-6 shadow-md hover:shadow-lg transition"
              >
                {/* USER INFO */}
                <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                  <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center font-semibold">
                    {profile.name.charAt(0)}
                  </div>

                  <div>
                    <p className="font-medium text-sm sm:text-base">
                      {profile.name}
                    </p>
                    <p className="text-xs text-gray-400">
                      {new Date(blog.createdAt).toDateString()}
                    </p>
                  </div>
                </div>

                {/* TITLE */}
                <h3 className="text-lg font-semibold mb-2">{blog.title}</h3>

                {/* CONTENT */}
                <p className="text-gray-400 text-sm line-clamp-3 mb-4">
                  {blog.content}
                </p>

                {/* IMAGE */}
                {blog.image?.url && (
                  <div className="rounded-lg overflow-hidden border border-gray-700">
                    <img
                      src={blog.image.url}
                      alt={blog.title}
                      className="w-full h-40 sm:h-52 md:h-60 object-cover transition duration-300 hover:scale-105"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
