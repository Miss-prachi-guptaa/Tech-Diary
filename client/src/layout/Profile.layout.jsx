import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Pages/Navbar";


export const ProfileLayout = () => {
  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      {/* Navbar at the top */}
      <Navbar />

      {/* Body: Profile page controls its own layout */}
      <div className="flex flex-1 overflow-hidden">
        <main className="flex-1 overflow-auto bg-gray-900">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
