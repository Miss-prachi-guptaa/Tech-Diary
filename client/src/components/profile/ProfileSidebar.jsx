const ProfileSidebar = () => {
  return (
    <div className="h-full flex flex-col items-center p-6 bg-gray-900 text-white">
      {/* Edit button */}
      <div className="w-full flex justify-end">
        <button className="text-sm px-3 py-1 rounded bg-gray-800 hover:bg-gray-700">
          Edit
        </button>
      </div>

      {/* Profile Image */}
      <div className="mt-4">
        <img
          src="/default-avatar.png"
          alt="profile"
          className="w-32 h-32 rounded-full object-cover border-2 border-gray-700"
        />
      </div>

      {/* Name & Username */}
      <div className="mt-4 text-center">
        <h2 className="text-xl font-semibold">Prachi Gupta</h2>
        <p className="text-gray-400">@prachi_dev</p>
      </div>

      {/* Bio */}
      <p className="mt-4 text-sm text-center text-gray-300">
        Full-stack developer writing about Web & Backend systems.
      </p>

      {/* Social Links */}
      <div className="flex gap-4 mt-6">
        <a href="#" className="text-sm text-blue-400 hover:underline">
          GitHub
        </a>
        <a href="#" className="text-sm text-blue-400 hover:underline">
          LinkedIn
        </a>
        <a href="#" className="text-sm text-blue-400 hover:underline">
          Twitter
        </a>
      </div>

      {/* Extra Info */}
      <div className="mt-6 text-sm text-gray-400">
        Joined Jan 2026
      </div>
    </div>
  );
};

export default ProfileSidebar;
