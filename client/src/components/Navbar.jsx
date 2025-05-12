import { Link, useNavigate } from "react-router-dom";
import { GoSignOut } from "react-icons/go";
import { useState } from "react";

const Navbar = ({ isLoggedIn, onLogout, user = {}, hideAuthButtons }) => {
  // console.log(user.profilePic);
  const navigate = useNavigate();
  const [showDropDown, setshowDropDown] = useState(false);

  const handleSignOut = () => {
    onLogout();
    navigate("/");
  };

  const toggleDropdown = () => setshowDropDown(!showDropDown);

  return (
    <nav className="fixed top-0 left-0 right-0 flex items-center justify-between bg-gradient-to-r from-blue-400 to-purple-600 p-6 shadow-xl z-50">
      <h1 className="text-4xl font-extrabold text-white">
        <Link to={"/"}>Task Manager</Link>
      </h1>

      <div className="flex items-center space-x-6">
        {!hideAuthButtons && isLoggedIn && (
          <>
            <Link
              to="/add-task"
              className="text-white text-xl font-semibold hover:text-indigo-200 transition duration-300"
            >
              Add Task
            </Link>

            {/* Profile Image with Dropdown */}
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="flex items-center focus:outline-none"
              >
                {user.profilePic ? (
                  <img
                    src={user.profilePic}
                    alt="Profile"
                    className="w-10 h-10 rounded-full object-cover border-2 border-white cursor-pointer"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center cursor-pointer">
                    <span className="text-blue-600 font-bold">
                      {user?.name?.charAt(0).toUpperCase() || "U"}
                    </span>
                  </div>
                )}
              </button>

              {/* Dropdown Menu */}
              {showDropDown && (
                <div className="absolute right-0 mt-2 w-48 bg-gradient-to-r from-blue-400 to-purple-600  font-bold rounded-md shadow-lg py-1 z-50">
                  <Link
                    to="/change-pass"
                    className="block px-4 py-2 text-sm text-white hover:bg-blue-400"
                    onClick={() => setshowDropDown(false)}
                  >
                    Change Password
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="w-full text-left px-4 py-2 text-sm text-white hover:bg-blue-400 flex items-center"
                  >
                    <GoSignOut className="mr-2" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
