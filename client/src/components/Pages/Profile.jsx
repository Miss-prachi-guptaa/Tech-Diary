import ProfileDashboard from "../profile/ProfileDashboard";
import ProfileSidebar from "../profile/ProfileSidebar";


const Profile = () => {
  return (
    <div className="flex h-full">
      {/* Profile Sidebar */}
      <aside className="w-80 border-r border-gray-800">
        <ProfileSidebar />
      </aside>

      {/* Dashboard */}
      <section className="flex-1 p-6 overflow-auto">
        <ProfileDashboard />
      </section>
    </div>
  );
};

export default Profile;
