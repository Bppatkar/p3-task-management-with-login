import { Link, useNavigate } from "react-router-dom";
import { GoSignOut, GoSignIn } from "react-icons/go";

const Navbar = ({ isLoggedIn, onLogout, hideAuthButtons }) => {
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
      {/* <Link to={"/add-task"}>add task</Link> */}
      <div className="flex items-center space-x-6">
        {!hideAuthButtons && isLoggedIn && (
          <>
            <Link
              to="/add-task"
              className="text-gray-800 text-xl font-semibold hover:text-indigo-600 transition duration-300"
            >
              Add Task
            </Link>
            <button
              className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
              onClick={handleSignOut}
            >
              <GoSignOut className="mr-2" />
              Sign Out
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
