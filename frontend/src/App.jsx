import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import DashboardLayout from "./pages/DashboardLayout";
import Dashboard from "./components/Dashboard";
import Scan from "./components/Scan";
import Profile from "./components/Profile";
import Reward from "./components/Reward";
import Redeem from "./components/Redeem";
import Rank from "./components/Rank";
import UserDetails from "./pages/UserDetails";

const PrivateRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("token");
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/user" element={<UserDetails />} />
      {/* <Route path="/dashboard" element={<PrivateRoute><DashboardLayout /></PrivateRoute>}> */}
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="scan" element={<Scan />} />
        <Route path="profile" element={<Profile />} />
        <Route path="reward" element={<Reward />} />
        <Route path="redeem" element={<Redeem />} />
        <Route path="rank" element={<Rank />} />
      </Route>
    </Routes>
  );
};

export default App;
