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
    <aside className="m-4 w-64 min-h-[calc(100vh-4rem-2rem)]
      bg-iron_grey-200 rounded-2xl border border-iron_grey-400
      shadow-lg shadow-iron_grey-100/20 flex flex-col justify-between">

      <nav className="p-4 space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `group flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-medium transition-all
              ${isActive
                ? "bg-cherry_blossom/30 text-iron_grey-100 shadow-md shadow-cherry_blossom/20"
                : "text-powder_petal-900 hover:bg-iron_grey-300"
              }`
            }
          >
            {({ isActive }) => (
              <>
                {/* Icon */}
                <span
                  className={`flex items-center justify-center w-9 h-9 rounded-lg text-lg transition
                  ${isActive
                      ? "bg-cherry_blossom text-iron_grey-100"
                      : "bg-iron_grey-300 text-dust_grey-700 group-hover:text-powder_petal-900"
                    }`}
                >
                  {item.icon}
                </span>

                {/* Label */}
                <span>{item.name}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-iron_grey-400 text-xs text-dust_grey-700 text-center">
        © 2026 Blogify
      </div>
    </aside>
  );
};

