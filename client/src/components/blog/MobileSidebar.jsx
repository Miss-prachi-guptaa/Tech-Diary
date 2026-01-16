import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaPenFancy,
  FaUser,
  FaFolderOpen,
  FaTimes,
} from "react-icons/fa";

export const MobileSidebar = ({ open, onClose }) => {
  if (!open) return null;

  const menuItems = [
    { name: "Home", icon: <FaHome />, path: "/" },
    { name: "My Blogs", icon: <FaFolderOpen />, path: "/my-blogs" },
    { name: "Create Blog", icon: <FaPenFancy />, path: "/create-blog" },
    { name: "Profile", icon: <FaUser />, path: "/profile" },
  ];

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      {/* Drawer */}
      <aside className="absolute left-0 top-0 h-full w-64
      bg-iron_grey-200 border-r border-iron_grey-400
      shadow-xl p-4 flex flex-col">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <span className="text-lg font-bold text-powder_petal-900">
            Blogify
          </span>
          <button onClick={onClose}>
            <FaTimes size={20} />
          </button>
        </div>

        {/* Menu */}
        <nav className="space-y-2 flex-1">
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-4 px-4 py-3 rounded-xl
                text-sm font-medium transition
                ${isActive
                  ? "bg-cherry_blossom/30 text-iron_grey-100"
                  : "text-powder_petal-900 hover:bg-iron_grey-300"}`
              }
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>

        <div className="text-xs text-center text-dust_grey-700">
          © 2026 Blogify
        </div>
      </aside>
    </div>
  );
};
