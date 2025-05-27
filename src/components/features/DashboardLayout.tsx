import React from "react";
import { Outlet, Link } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";

export default function DashboardLayout() {
  // const { logout } = useAuth();
  return (
    <div>
      {/* <button onClick={logout}>Log Out</button> */}
      {/* <h1>Dashboard</h1>
      
      <nav>
        <Link to="home">Dashboard</Link> |<Link to="profile">Profile</Link> |{" "}
        <Link to="settings">Settings</Link>
      </nav> */}
      <Outlet /> {/* Renders nested route element */}
    </div>
  );
}
