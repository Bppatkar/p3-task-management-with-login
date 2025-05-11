import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register.jsx";
import Navbar from "./components/Navbar.jsx";
import Home from "./components/Home.jsx";
import AddTask from "./components/AddTask.jsx";
import { useEffect, useState } from "react";

function App() {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const hideAuthButtons = ["/login", "/register"].includes(location.pathname);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setIsLoggedIn(true);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!loading && !isLoggedIn && !hideAuthButtons) {
      navigate("/login");
    }
  }, [loading, isLoggedIn, hideAuthButtons, navigate]);

  const handleLogin = (userData) => {
    setIsLoggedIn(true);
    setUser({
      profilePic: userData.profilePic
        ? userData.profilePic.startsWith("http")
          ? userData.profilePic
          : `${import.meta.env.VITE_BACKEND_URL}${userData.profilePic}`
        : null,
      coverImage: userData.coverImage
        ? userData.coverImage.startsWith("http")
          ? userData.coverImage
          : `${import.meta.env.VITE_BACKEND_URL}${userData.coverImage}`
        : null,
    });
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", userData.token);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser({});
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout}
        hideAuthButtons={hideAuthButtons}
        user={user}
      />
      <main className="flex-grow ">
        <Routes>
          <Route path="/" element={<Home isLoggedIn={isLoggedIn} />} />
          <Route path="/add-task" element={<AddTask />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
