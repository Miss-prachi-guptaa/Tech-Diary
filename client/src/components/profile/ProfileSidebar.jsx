const ProfileSidebar = ({ onClose }) => {
  return (
    <div className="h-full flex flex-col items-center p-6 bg-gray-900 text-white">

      {/* Mobile close */}
      <button
        onClick={onClose}
        className="lg:hidden self-end text-sm px-3 py-1 rounded bg-gray-800 hover:bg-gray-700"
      >
        Close
      </button>

      {/* Edit */}
      <div className="w-full flex justify-end mt-2">
        <button className="text-sm px-3 py-1 rounded bg-gray-800 hover:bg-gray-700">
          Edit
        </button>
      </div>

      {/* Avatar */}
      <div className="mt-4">
        <img
          src="/default-avatar.png"
          alt="profile"
          className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover border-2 border-gray-700"
        />
      </div>

      {/* Name */}
      <div className="mt-4 text-center">
        <h2 className="text-lg sm:text-xl font-semibold">
          Prachi Gupta
        </h2>
        <p className="text-gray-400 text-sm">@prachi_dev</p>
      </div>

      {/* Bio */}
      <p className="mt-4 text-sm text-center text-gray-300 max-w-xs">
        Full-stack developer writing about Web & Backend systems.
      </p>

      {/* Socials */}
      <div className="flex gap-4 mt-6 text-sm">
        <a className="text-blue-400 hover:underline">GitHub</a>
        <a className="text-blue-400 hover:underline">LinkedIn</a>
        <a className="text-blue-400 hover:underline">Twitter</a>
      </div>

      {/* Meta */}
      <div className="mt-6 text-xs text-gray-400">
        Joined Jan 2026
      </div>
    </div>
  );
};

export default ProfileSidebar;
