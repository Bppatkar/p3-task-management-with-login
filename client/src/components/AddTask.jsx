import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddTask = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    startingDate: "",
    dueDate: "",
    description: "",
    status: "pending",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/tasks/create-task`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200 || response.status === 201) {
        navigate("/");
      }
    } catch (error) {
      let errorMessage = error?.response?.data?.message || error.message;
      if (error.response?.status === 409) {
        errorMessage = "Task already exists";
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-400 to-purple-600">
      <div className="bg-white bg-opacity-80 rounded-2xl shadow-xl p-8 max-w-md w-full backdrop-blur-lg">
        <h1 className="text-4xl font-extrabold mb-6 text-gray-900 text-center">
          Add New Task
        </h1>
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg border border-red-200">
            <p className="font-semibold">Error:</p>
            <p>{error}</p>
          </div>
        )}
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
              name="title"
              value={formData.title}
              id="title"
              onChange={handleChange}
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
                name="startingDate"
                value={formData.startingDate}
                id="startingDate"
                onChange={handleChange}
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
                name="dueDate"
                value={formData.dueDate}
                id="dueDate"
                onChange={handleChange}
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
              name="status"
              value={formData.status}
              onChange={handleChange}
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
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-800 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter task description"
              required
            />
          </div>
          <div className="flex items-center justify-end space-x-6">
            <button
              type="submit"
              disabled={loading}
              className={`bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ${
                loading ? "opacity-50" : ""
              }`}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Saving...
                </span>
              ) : (
                "Save Task"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTask;

