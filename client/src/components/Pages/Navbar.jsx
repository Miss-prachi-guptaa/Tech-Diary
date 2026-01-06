import { FaSearch, FaUserCircle } from "react-icons/fa";

export const Navbar = () => {
  return (
    <header className="h-16 w-full bg-iron_grey-300 border-b border-iron_grey-400 flex items-center justify-between px-6">

      {/* Left: Brand */}
      <div className="text-xl font-bold text-powder_petal-900">
        Blogify
      </div>

      {/* Center: Search */}
      <div className="hidden md:flex items-center bg-iron_grey-200 border border-iron_grey-400 rounded-lg px-3 py-2 w-1/3">
        <FaSearch className="text-dust_grey-700 mr-2" />
        <input
          type="text"
          placeholder="Search blogs..."
          className="bg-transparent outline-none text-sm text-powder_petal-900 w-full placeholder:text-dust_grey-700"
        />
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-4">
        <button className="bg-cherry_blossom hover:bg-cherry_blossom-400 text-iron_grey-100 px-4 py-2 rounded-lg text-sm transition">
          Create
        </button>

        <div className="flex items-center gap-2 cursor-pointer">
          <FaUserCircle size={28} className="text-dust_grey-700" />
          <span className="hidden sm:block text-sm text-powder_petal-900">
            Prachi
          </span>
        </div>
      </div>

    </header>
  );
};
