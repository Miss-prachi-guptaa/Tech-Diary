import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaPenFancy,
  FaUser,
  FaFolderOpen,
} from "react-icons/fa";

export const Sidebar = () => {
  const menuItems = [
    { name: "Home", icon: <FaHome />, path: "/" },
    { name: "My Blogs", icon: <FaFolderOpen />, path: "/my-blogs" },
    { name: "Create Blog", icon: <FaPenFancy />, path: "/create-blog" },
    { name: "Profile", icon: <FaUser />, path: "/profile" },
  ];

  return (
    <aside
      className="hidden sm:flex flex-col justify-between
      m-3 bg-iron_grey-200 border border-iron_grey-400 rounded-2xl
      shadow-lg shadow-iron_grey-100/20
      w-20 md:w-64 transition-all duration-300"
    >
      {/* Menu */}
      <nav className="p-3 space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `group flex items-center gap-4 px-3 py-3 rounded-xl
              transition-all text-sm font-medium
              ${isActive
                ? "bg-cherry_blossom/30 text-iron_grey-100"
                : "text-powder_petal-900 hover:bg-iron_grey-300"}`
            }
          >
            <span
              className="flex items-center justify-center
              w-10 h-10 rounded-lg text-lg
              bg-iron_grey-300 text-dust_grey-700
              group-hover:text-powder_petal-900"
            >
              {item.icon}
            </span>

            {/* Text only on md+ */}
            <span className="hidden md:block">{item.name}</span>
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="hidden md:block p-3 border-t
      border-iron_grey-400 text-xs text-dust_grey-700 text-center">
        © 2026 Blogify
      </div>
    </aside>
  );
};

