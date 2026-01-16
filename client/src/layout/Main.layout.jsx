import { Outlet } from "react-router-dom";
import { useState } from "react";
import { MobileSidebar } from "../components/blog/MobileSidebar";

import { Navbar } from "../components/Pages/Navbar";
import { Sidebar } from "../components/Pages/Sidebar";


export const Layout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="h-dvh flex flex-col bg-gray-900 text-white">
      <Navbar onMenuClick={() => setMobileOpen(true)} />

      <div className="flex flex-1 overflow-hidden">
        {/* Desktop / Tablet Sidebar */}
        <Sidebar />

        {/* Mobile Drawer */}
        <MobileSidebar
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
        />

        {/* Main */}
        <main className="flex-1 p-4 sm:p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
