import { Routes, Route, Outlet, useLocation } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register.jsx";
import Navbar from "./components/Navbar.jsx";
import Home from "./components/Home.jsx";
import AddTask from "./components/AddTask.jsx";
import { useState } from "react";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const hideAuthButtons = ["/login", "/register"].includes(location.pathname);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout}
        hideAuthButtons={hideAuthButtons}
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
