import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";


export const Layout = () => {
  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      {/* Navbar at the top */}
      <Navbar />

      {/* Body: Sidebar + main content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar on the left */}
        <Sidebar />

        {/* Main content */}
        <main className="flex-1 p-6 overflow-auto bg-gray-900">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
