import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    profilePic: null,
    coverImage: null,
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files && files.length > 0) {
      setFormData((prev) => ({
        ...prev,
        [name]: files[0],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      // Create FormData for file upload
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("password", formData.password);
      if (formData.profilePic) {
        formDataToSend.append("profilePic", formData.profilePic);
      }
      if (formData.coverImage) {
        formDataToSend.append("coverImage", formData.coverImage);
      }

      axios
        .post(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/register`,
          formDataToSend,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((res) => {
          if (res.status === 200 || res.status === 201) {
            navigate("/login");
            // console.log(formData);
          } else {
            setError("Something went wrong");
          }
        })
        .catch((error) => {
          setError(error?.response?.data?.message || error.message);
        })
        .finally(() => setLoading(false));
    } catch (error) {
      setError(error?.response?.data?.message || error.message);
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-400 to-purple-600">
      <div className="bg-white bg-opacity-80 rounded-2xl shadow-xl p-8 max-w-md w-full backdrop-blur-lg">
        <h1 className="text-4xl font-extrabold mb-6 text-gray-900 text-center">
          Register
        </h1>
        <form
          onSubmit={handleSubmit}
          method="POST"
          encType="multipart/form-data"
        >
          <div className="mb-5">
            <label
              htmlFor="name"
              className="block text-gray-800 text-sm font-semibold mb-2"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-800 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Name"
              required
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="email"
              className="block text-gray-800 text-sm font-semibold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-800 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Email address"
              required
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="password"
              className="block text-gray-800 text-sm font-semibold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-800 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Password"
              required
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="profilePic"
              className="block text-gray-800 text-sm font-semibold mb-2"
            >
              Profile Picture URL (Optional)
            </label>
            <input
              type="file"
              id="profilePic"
              name="profilePic"
              onChange={handleChange}
              className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-800 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-8">
            <label
              htmlFor="coverImage"
              className="block text-gray-800 text-sm font-semibold mb-2"
            >
              Cover Image URL (Optional)
            </label>
            <input
              type="file"
              id="coverImage"
              name="coverImage"
              onChange={handleChange}
              className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-800 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
            >
              Register
            </button>
            <p className="text-md text-gray-600 ml-1">
              Already have an account?
              <Link
                to={"/login"}
                className="text-sm text-indigo-600 hover:text-indigo-800 transition duration-300 ml-2"
              >
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
