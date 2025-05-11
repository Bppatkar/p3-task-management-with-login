import { Link, useNavigate } from "react-router-dom";
import { GoSignOut } from "react-icons/go";

const Navbar = ({ isLoggedIn, onLogout, user = {}, hideAuthButtons }) => {
  // console.log(user.profilePic);
  const navigate = useNavigate();

  const handleSignOut = () => {
    onLogout();
    navigate("/");
  };

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

            {/* Profile Image with fallback */}
            <div className="flex items-center">
              {user.profilePic ? (
                <img
                  src={user.profilePic}
                  alt="Profile"
                  className="w-10 h-10 rounded-full object-cover border-2 border-white"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                  <span className="text-blue-600 font-bold">
                    {user?.name?.charAt(0).toUpperCase() || "U"}
                  </span>
                </div>
              )}

              <button
                className="ml-4 bg-white hover:bg-gray-100 text-indigo-600 font-bold py-2 px-4 rounded-lg transition duration-300 flex items-center"
                onClick={handleSignOut}
              >
                <GoSignOut className="mr-2" />
                Sign Out
              </button>
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
