import { Link, useNavigate } from "react-router-dom";
import { GoSignOut } from "react-icons/go";

const Home = () => {
  const navigate = useNavigate();
  const handleSignOut = () => {
    navigate("/login");
  };

  return (
    <nav className="flex items-center justify-between bg-gradient-to-r from-blue-400 to-purple-600 p-6 shadow-xl">
      <h1 className="text-4xl font-extrabold text-white">Task Manager</h1>
      <div className="flex items-center space-x-6">
        <Link
          to="/AddTask"
          className="text-white text-xl font-semibold hover:text-indigo-200 transition duration-300"
        >
          Add Task
        </Link>
        <button
          className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
          onClick={handleSignOut}
        >
          <GoSignOut />
        </button>
      </div>
    </nav>
  );
};

export default Home;
