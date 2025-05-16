import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Home = ({ isLoggedIn }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      if (isLoggedIn) {
        try {
          setLoading(true);
          setError(null);
          const response = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}/api/v1/tasks/get-all-tasks`,
            {
              credentials: "include",
            }
          );
          
          if (!response.ok) {
            throw new Error("Failed to fetch tasks");
          }

          const data = await response.json();
          setTasks(data.tasks || []);
        } catch (err) {
          setError(err.message);
          console.error("Fetch tasks error:", err);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchTasks();
  }, [isLoggedIn]);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getStatusStyle = (status) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "inprogress":
        return "bg-blue-100 text-blue-800";
      default: // pending
        return "bg-yellow-100 text-yellow-800";
    }
  };

  const formatStatus = (status) => {
    switch (status.toLowerCase()) {
      case "inprogress":
        return "In Progress";
      default:
        return status.charAt(0).toUpperCase() + status.slice(1);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-400 to-purple-600 p-4">
      <div className="bg-white bg-opacity-80 rounded-2xl shadow-xl p-8 max-w-7xl w-full backdrop-blur-lg">
        <h1 className="text-4xl font-extrabold mb-8 text-gray-900 text-center">
          {isLoggedIn ? "My Tasks" : "Welcome to Task Manager"}
        </h1>

        {isLoggedIn ? (
          <>
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
              </div>
            ) : error ? (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                {error}
              </div>
            ) : tasks.length > 0 ? (
              <div className="grid grid-cols-3 gap-6">
                {["Completed", "In Progress", "Pending"].map((status) => (
                  <div
                    key={status}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow border border-gray-200"
                  >
                    <h2 className="p-4 text-xl font-semibold text-gray-800">
                      {status}
                    </h2>
                    <ul className="divide-y divide-gray-200">
                      {tasks
                        .filter((task) => {
                          if (status === "In Progress") {
                            return task.status === "inProgress";
                          }
                          return task.status.toLowerCase() === status.toLowerCase();
                        })
                        .map((task) => (
                          <li
                            key={task._id}
                            className="px-4 py-3 flex justify-between items-center hover:bg-gray-50"
                          >
                            <Link 
                              to={`/task/${task._id}`} 
                              className="w-full flex justify-between items-center"
                            >
                              <div className="flex items-center">
                                <span
                                  className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusStyle(
                                    task.status
                                  )}`}
                                >
                                  {formatStatus(task.status)}
                                </span>
                                <span className="text-gray-600 ml-2">
                                  {task.title}
                                </span>
                              </div>
                              <span className="text-gray-600">
                                {formatDate(task.dueDate)}
                              </span>
                            </Link>
                          </li>
                        ))}
                    </ul>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
                <h3 className="mt-2 text-lg font-medium text-gray-900">
                  No tasks
                </h3>
                <p className="mt-1 text-gray-500">
                  Get started by creating a new task.
                </p>
                <div className="mt-6">
                  <Link
                    to="/add-task"
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Add Task
                  </Link>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="bg-white bg-opacity-80 rounded-2xl shadow-xl p-8 text-center max-w-md mx-auto">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">
              Sign in to continue
            </h3>
            <p className="mt-1 text-gray-500 mb-6">
              Please login to view and manage your tasks
            </p>
            <Link
              to="/login"
              className="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;