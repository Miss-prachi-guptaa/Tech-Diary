import { FaGlobeAsia, FaSearch, FaUserCircle } from "react-icons/fa";
import { HiMenu } from "react-icons/hi";
import { NavLink } from "react-router-dom";

export const Navbar = ({ onMenuClick }) => {
  return (
    <header className="h-16 w-full bg-iron_grey-300 border-b border-iron_grey-400
    flex items-center justify-between px-4 sm:px-6">

      {/* Left */}
      <div className="flex items-center gap-3">
        {/* Mobile menu */}
        <button
          className="md:hidden text-dust_grey-700"
          onClick={onMenuClick}
        >
          <HiMenu size={24} />
        </button>

        <div className="flex items-center gap-2 font-bold text-powder_petal-900">
          <FaGlobeAsia className="text-xl text-cherry_blossom" />
          <span className="hidden sm:block">Blogify</span>
        </div>
      </div>
      {/* Search */}
      <div className="flex items-center bg-iron_grey-200 border border-iron_grey-400
      rounded-lg px-3 py-2 w-36 sm:w-64 md:w-1/3">
        <FaSearch className="text-dust_grey-700 mr-2" />
        <input
          placeholder="Search blogs..."
          className="bg-transparent outline-none text-sm w-full"
        />
      </div>

      {/* Right */}
      <div className="flex items-center gap-3 sm:gap-4">
        <button className="hidden sm:block bg-cherry_blossom
  text-iron_grey-100 px-4 py-2 rounded-lg text-sm">
          Create
        </button>

        {/* Profile link */}
        <NavLink
          to="/profile"
          className="flex items-center gap-2 cursor-pointer
    text-dust_grey-700 hover:text-powder_petal-900 transition"
        >
          <FaUserCircle size={28} />
          <span className="hidden md:block text-sm">
            Prachi
          </span>
        </NavLink>
      </div>

    </header>
  );
};
