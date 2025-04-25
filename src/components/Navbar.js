// components/Navbar.js
import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ loggedInUser }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Hide navbar on login/signup page
  const hideNavbar = location.pathname === "/loginsignuppage";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/loginsignuppage");
    window.location.reload(); // Optional: re-render App on logout
  };

  if (hideNavbar) return null;

  return (
    <nav className="navbar-modern">
      <div className="navbar-left">
        <Link to="/" className="brand-link">
          <img src="/logo.png" alt="Logo" className="brand-logo" />
          <h2 className="brand-title">Bookish</h2>
        </Link>
      </div>

      <div className="navbar-right">
        <Link to="/">Dashboard</Link>
        <Link to="/clubs">Clubs</Link>
        <Link to="/community">Discussions</Link>
        {loggedInUser && <Link to="/profile">Profile</Link>}
        {loggedInUser ? (
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <Link to="/loginsignuppage">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
