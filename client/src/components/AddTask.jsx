import React from "react";

const AddTask = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    // You would typically save the task to state or send to an API
    // Then redirect to home page or show success message
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-400 to-purple-600">
      <div className="bg-white bg-opacity-80 rounded-2xl shadow-xl p-8 max-w-md w-full backdrop-blur-lg">
        <h1 className="text-4xl font-extrabold mb-6 text-gray-900 text-center">Add New Task</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label
              htmlFor="title"
              className="block text-gray-800 text-sm font-semibold mb-2"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-800 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter task title"
              required
            />
          </div>
          <div className="mb-5 grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="startingDate"
                className="block text-gray-800 text-sm font-semibold mb-2"
              >
                Starting Date
              </label>
              <input
                type="date"
                id="startingDate"
                className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-800 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="dueDate"
                className="block text-gray-800 text-sm font-semibold mb-2"
              >
                Due Date
              </label>
              <input
                type="date"
                id="dueDate"
                className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-800 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>
          <div className="mb-5">
            <label
              htmlFor="status"
              className="block text-gray-800 text-sm font-semibold mb-2"
            >
              Status
            </label>
            <select
              id="status"
              className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-800 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="pending">Pending</option>
              <option value="inProgress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <div className="mb-5">
            <label
              htmlFor="description"
              className="block text-gray-800 text-sm font-semibold mb-2"
            >
              Description
            </label>
            <textarea
              id="description"
              rows="4"
              className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-800 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter task description"
              required
            />
          </div>
          <div className="flex items-center justify-end space-x-6">
            <button
              type="button"
              className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
              onClick={() => window.history.back()}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
            >
              Save Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTask;

