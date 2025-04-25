import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import LoginSignupPage from "./pages/LoginSignupPage";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Clubs from "./pages/Clubs"; 
import ClubDetail from "./pages/ClubDetail";
import Community from "./pages/Community";
import CreateClub from "./pages/CreateClub";
import AddBook from "./pages/AddBook";
import { ClubProvider } from "./context/ClubContext";

const ProtectedRoute = ({ element, loggedInUser }) => {
  if (!loggedInUser) {
    return <Navigate to="/loginsignuppage" />;
  }
  return element;
};

const AppContent = ({ loggedInUser, handleLogin, handleLogout }) => {
  const location = useLocation();
  const hideNavbar = location.pathname === "/loginsignuppage";

  return (
    <>
      {!hideNavbar && (
        <Navbar loggedInUser={loggedInUser} onLogout={handleLogout} />
      )}
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute
              loggedInUser={loggedInUser}
              element={<Home />}
            />
          }
        />
        <Route
          path="/loginsignuppage"
          element={<LoginSignupPage onLogin={handleLogin} />}
        />
        <Route
          path="/profile/:userId"
          element={
            <ProtectedRoute
              loggedInUser={loggedInUser}
              element={<Profile />}
            />
          }
        />
        <Route path="/profile" element={<Navigate to="/profile/123" />} />
        <Route
          path="/clubs"
          element={
            <ProtectedRoute
              loggedInUser={loggedInUser}
              element={<Clubs />}
            />
          }
        />
        <Route
          path="/clubs/create"
          element={
            <ProtectedRoute
              loggedInUser={loggedInUser}
              element={<CreateClub />}
            />
          }
        />
        <Route
          path="/clubs/:clubId/add-book"
          element={
            <ProtectedRoute
              loggedInUser={loggedInUser}
              element={<AddBook />}
            />
          }
        />
        <Route
          path="/clubs/:clubId"
          element={
            <ProtectedRoute
              loggedInUser={loggedInUser}
              element={<ClubDetail />}
            />
          }
        />
        <Route
          path="/clubs/:clubSlug"
          element={
            <ProtectedRoute
              loggedInUser={loggedInUser}
              element={<ClubDetail />}
            />
          }
        />
        <Route
          path="/community"
          element={
            <ProtectedRoute
              loggedInUser={loggedInUser}
              element={<Community />}
            />
          }
        />
      </Routes>
    </>
  );
};

const App = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("username");
    const storedToken = localStorage.getItem("token");
    if (storedUser && storedToken) {
      setLoggedInUser(storedUser);
    }
  }, []);

  const handleLogin = (username) => {
    setLoggedInUser(username);
  };

  const handleLogout = () => {
    localStorage.clear();
    setLoggedInUser(null);
  };

  return (
    <ClubProvider>
      <Router>
        <AppContent
          loggedInUser={loggedInUser}
          handleLogin={handleLogin}
          handleLogout={handleLogout}
        />
      </Router>
    </ClubProvider>
  );
};

export default App;
