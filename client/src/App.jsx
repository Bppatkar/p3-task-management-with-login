import { Routes, Route, Outlet } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register.jsx";
import Navbar from "./components/Navbar.jsx";
import Home from "./components/Home.jsx";
import AddTask from "./components/AddTask.jsx";
import { useState } from "react";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <Routes>
      {/* Routes with navbar */}
      <Route
        path="/"
        element={
          <LayoutWithNavbar
            isLoggedIn={isLoggedIn}
            onLogout={handleLogout}
          />
        }
      >
        <Route index element={<Home isLoggedIn={isLoggedIn} />} />
        <Route path="/add-task" element={<AddTask />} />
      </Route>

      {/* Routes without navbar */}
      <Route path="/login" element={<Login onLogin={handleLogin} />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

function LayoutWithNavbar({ isLoggedIn, onLogout }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar isLoggedIn={isLoggedIn} onLogout={onLogout} />
      <main className="flex-grow pt-16">
        <Outlet />
      </main>
    </div>
  );
}

export default App;

