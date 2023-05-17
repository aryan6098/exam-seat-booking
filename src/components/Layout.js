import React, { useState } from "react";
import { FiMenu } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";
import { Button, Nav, NavItem } from "reactstrap";

// Array defining the menu items and their respective paths
const MenuName = [
  { title: "Home", pathName: "/" },
  { title: "Profile", pathName: "/user-details/id" },
  { title: "Settings", pathName: "" },
];

const Layout = (props) => {
  const location = useLocation();
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div className="flex flex-col h-screen">
      <div className="flex justify-between items-center nav w-full ">
        <Button
          className="text-white hover:text-gray-200 focus:text-gray-200 lg:hidden px-2 py-3"
          aria-label="Toggle menu"
          onClick={() => setShowSidebar(!showSidebar)}
        >
          <FiMenu />
        </Button>
      </div>

      <div className="flex flex-1">
        <div
          className={`w-64 bg-gray h-screen fixed left-0 top-115 px-3  border-1 ${
            showSidebar ? "block" : "hidden lg:block"
          }`}
        >
          {/* Sidebar menu items */}
          <Nav className="mt-4">
            <NavItem className="text-center">
              <Link to="/" className="nav-title mt-3">Exam Seat Booking</Link>
            </NavItem>
            {MenuName &&
              MenuName.map((data, index) => {
                const isActive = data.pathName === location.pathname;
                return (
                  <NavItem key={index} className="my-2  bg-white p-1 pl-3">
                    <Link
                      to={data?.pathName}
                      className={`font-medium text-sm ${`${
                        isActive ? "text-blue-500" : " "
                      }`} `}
                    >
                      {data?.title}
                    </Link>
                  </NavItem>
                );
              })}
          </Nav>
        </div>
        {/* Content Area */}
        <div
          className={`flex-1 ml-0   lg:ml-64 ${showSidebar ? "ml-64" : ""}`}
          style={{ backgroundColor: "#FFFFFF" }}
        >
          {/* Render the children components */}
          {props.children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
