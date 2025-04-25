import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./LoginSignupPage.css";

const LoginSignupPage = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState(""); // for signup only
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleAuth = async (e) => {
    e.preventDefault();

    try {
      const endpoint = isLogin ? "login" : "signup";
      const payload = isLogin
        ? { username, password }
        : { username, email, password };

      const res = await axios.post(`http://localhost:5000/api/${endpoint}`, payload);

      if (res.status === 200) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("username", res.data.username);
        onLogin(res.data.username);
        alert("Login successful!");
        navigate("/");
      } else {
        alert(res.data.message || "Signup successful! Please login.");
        setIsLogin(true);
      }
    } catch (err) {
      alert("Login failed: " + (err.response?.data?.message || err.message));
      console.error("Login error:", err.response?.data || err);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        {/* Bookish Branding */}
        <div className="branding">
          <img src="/logo.png" alt="Book Club Logo" className="branding-logo" />
          <div className="branding-text">
            <h1>BOOKISH</h1>
          </div>
        </div>

        <h2>{isLogin ? "Login" : "Sign Up"}</h2>

        <form onSubmit={handleAuth}>
          <div className="auth-title">
            {isLogin ? "Login to your account" : "Create your account"}
          </div>

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          {!isLogin && (
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          )}

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">{isLogin ? "Login" : "Sign Up"}</button>
        </form>

        <p>
          {isLogin ? "New here?" : "Already have an account?"}{" "}
          <button className="toggle-btn" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Sign up" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginSignupPage;
