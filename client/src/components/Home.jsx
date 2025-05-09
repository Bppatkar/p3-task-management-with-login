import { Link } from "react-router-dom";

const Home = ({ isLoggedIn }) => {
  // Sample tasks data - in a real app, this would come from an API
  const tasks = isLoggedIn
    ? [
        {
          id: 1,
          title: "Complete project",
          description: "Finish the React task manager app",
          status: "In Progress",
        },
        {
          id: 2,
          title: "Buy groceries",
          description: "Milk, eggs, bread, and fruits",
          status: "Pending",
        },
        {
          id: 3,
          title: "Call mom",
          description: "Discuss weekend plans",
          status: "Completed",
        },
      ]
    : [];

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-400 to-purple-600">
      <div className="bg-white bg-opacity-80 rounded-2xl shadow-xl p-8 max-w-7xl w-full backdrop-blur-lg">
        <h1 className="text-4xl font-extrabold mb-8 text-gray-900 text-center">
          {isLoggedIn ? "My Tasks" : "Welcome to Task Manager"}
        </h1>

        {isLoggedIn ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    {task.title}
                  </h2>
                  <p className="text-gray-600 mb-4">{task.description}</p>
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                      task.status === "Completed"
                        ? "bg-green-100 text-green-800"
                        : task.status === "In Progress"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {task.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white bg-opacity-80 rounded-2xl shadow-xl p-8 text-center">
            <p className="text-xl text-gray-700 mb-6">
              Please login to view and manage your tasks
            </p>
            <Link
              to="/login"
              className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3 px-6 rounded-lg inline-block transition duration-300"
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
