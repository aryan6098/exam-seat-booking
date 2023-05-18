import React from "react";
import { Route, Routes } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./pages/Dashboard";
import UserDetails from "./pages/UserDetails";
import SeatScreen from "./pages/SeatScreen";
import Layout from "./components/Layout";

// Define the routes and their corresponding components

const routes = [
  { path: "/", component: <Dashboard />},
  { path: "/user-details/", component: <UserDetails /> },
  { path: "/seat-screen", component: <SeatScreen />},

];

function App() {
  return (
    <React.Fragment>
       {/* Container for displaying toast notifications */}
      <ToastContainer />
      {/* Define the routes */}
      <Routes>
        {routes.map((route, idx) => (
          <Route
            key={idx}
            path={route.path}
            element={<Layout>{route.component}</Layout>}
          />
        ))}
      </Routes>
    </React.Fragment>
  );
}

export default App; 
