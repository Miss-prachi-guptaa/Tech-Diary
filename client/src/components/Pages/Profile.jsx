import { useState } from "react";
import ProfileSidebar from "../profile/ProfileSidebar";
import ProfileDashboard from "../profile/ProfileDashboard";

const Profile = () => {
  const [showSidebar, setShowSidebar] = useState(true);

  return (
    <div className="h-full flex flex-col lg:flex-row bg-gray-900 text-white">

      {/* Sidebar */}
      <aside
        className={`
          w-full lg:w-80
          border-b lg:border-b-0 lg:border-r border-gray-800
          ${showSidebar ? "block" : "hidden"} lg:block
        `}
      >
        <ProfileSidebar onClose={() => setShowSidebar(false)} />
      </aside>

      {/* Main */}
      <section className="flex-1 p-4 sm:p-6 overflow-auto">
        {/* Mobile toggle */}
        <button
          onClick={() => setShowSidebar(!showSidebar)}
          className="lg:hidden mb-4 text-sm px-3 py-2 rounded bg-gray-800 hover:bg-gray-700"
        >
          {showSidebar ? "Hide Profile" : "Show Profile"}
        </button>

        <ProfileDashboard />
      </section>
    </div>
  );
};

export default Profile;
