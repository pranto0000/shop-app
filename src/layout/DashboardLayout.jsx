import React from "react";
import { Link, Outlet } from "react-router-dom";
import { MdDashboard, MdDashboardCustomize } from "react-icons/md";
import { FaEdit, FaHome, FaLocationArrow, FaQuestionCircle, FaRegUser, FaUserCircle } from "react-icons/fa";
import { FaShoppingBag } from "react-icons/fa";
import { FaCartShopping, FaCirclePlus } from "react-icons/fa6";

import logo from "/Untitled-5.png";
import Login from "../components/Login.jsx";
import useAdmin from "../hooks/useAdmin.jsx";
import useAuth from "../hooks/useAuth.jsx";

const sharedLinks = (
  <>
    <li className="mt-3">
      <Link to="/">
      <FaHome />
        Home
      </Link>
    </li>

    <li>
      <Link to="/menu">
        <FaCartShopping />
        Menu
      </Link>
    </li>

    <li>
      <Link to="/menu">
        <FaLocationArrow />
        Orders Tracking
      </Link>
    </li>

    <li>
      <Link to="/menu">
        <FaQuestionCircle />
        Customer Support
      </Link>
    </li>

  </>
);
const DashboardLayout = () => {
  // const isAdmin = false;
  const {loading} = useAuth()
  const [isAdmin, isAdminLoading] = useAdmin()
  return (
    <div className="bg-white">
      {
        isAdmin ? <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col sm:items-start sm:justify-start my-2">
          {/* Page content here */}
          <div className="flex items-center justify-between mx-4">
            <label
              htmlFor="my-drawer-2"
              className="btn btn-primary drawer-button lg:hidden"
            >
              <MdDashboardCustomize />
            </label>
            <div className="btn rounded-full px-6 bg-green text-white flex items-center gap-2 sm:hidden border-none">
              <FaRegUser /> Logout
            </div>
          </div>
          <div className="mt-5 md:mt-2 mx-4">
            <Outlet />
          </div>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-4 w-80 min-h-full  bg-gray-500 text-white ">
            {/* Sidebar content here */}
            <li>
              <Link to="/dashboard" className="">
                <img src={logo} alt="" />
                <span className="badge badge-primary mb-3">admin</span>
              </Link>
            </li>
            <hr />
            <li className="mt-3">
              <Link to="/dashboard">
                <MdDashboard />
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/dashboard/manage-bookings">
                <FaShoppingBag />
                Manage Booking
              </Link>
            </li>
            <li>
              <Link to="/dashboard/add-menu">
                <FaCirclePlus />
                Add Menu
              </Link>
            </li>
            <li>
              <Link to="/dashboard/manage-items">
                <FaEdit />
                Manage Items
              </Link>
            </li>
            <li className="mb-3">
              <Link to="/dashboard/users">
                <FaUserCircle />
                All Users
              </Link>
            </li>

            <hr />

            {/* shared nav link  */}
            {
              sharedLinks
            }
          </ul>
        </div>
      </div> : <Login/>
      }
    </div>
  );
};

export default DashboardLayout;
