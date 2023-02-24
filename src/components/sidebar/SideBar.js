import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import {
  MdOutlineInventory,
  MdOutlineTableChart,
  MdDashboardCustomize,
} from "react-icons/md";
import { FiSettings } from "react-icons/fi";
import { BiLogOut } from "react-icons/bi";
import { FaTimes } from "react-icons/fa";
import "./Sidebar.css";
import "../modal/Modal.css";
import AuthContext from "../../context/AuthContext";
import AdminModal from "../modal/AdminModal";
import { useState } from "react";

const SideBar = () => {
  const { user, showSideBar, toggleSideBar, toggleCartMenu, logoutUser } =
    useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);

  const activeStyle = {
    borderBottom: "2px solid var(--yellow)",
    color: "var(--yellow)",
    fontWeight: "bold",
  };

  const closeModal = (e) => {
    if (e.target.id === "bg") {
      setShowModal(false);
    }
  };
  const settingsAction = () => {
    toggleCartMenu(false);
    setShowModal(true);
    setActiveTab("settings");
  };

  const menuAction = () => {
    toggleSideBar(false);
    toggleCartMenu(false);
  };

  const [activeTab, setActiveTab] = useState("orders");
  return (
    <>
      {showModal && (
        <div
          className={showModal ? "backdrop__container" : "close"}
          id="bg"
          onClick={closeModal}
        >
          <AdminModal setShowModal={setShowModal} />
        </div>
      )}
      <div className="nav__container desktop">
        <div className="nav__logo">
          <img src="/logo.png" alt="" width={"100%"} />
        </div>
        <div className="nav__wrapper">
          <NavLink
            to={"/orders"}
            style={activeTab === "orders" ? activeStyle : undefined}
            onClick={() => {
              setActiveTab("orders");
            }}
            className="sidebar-link"
          >
            <MdOutlineInventory size={20} />
            {user.role === "Super Admin" || user.role === "Administrator"
              ? "Menu Manager"
              : "New Orders"}
          </NavLink>

          <NavLink
            to={"/dashboard"}
            style={activeTab === "dashboard" ? activeStyle : undefined}
            onClick={() => {
              setActiveTab("dashboard");
            }}
            className={
              user.role === "Store Manager"
                ? "sidebar-link null"
                : "sidebar-link"
            }
          >
            <MdOutlineTableChart size={20} />
            Table Manager
          </NavLink>

          {(user.role === "Super Admin" || user.role === "Administrator") && (
            <div
              style={activeTab === "settings" ? activeStyle : undefined}
              onClick={settingsAction}
              className="sidebar-link"
            >
              <FiSettings size={20} />
              Settings
            </div>
          )}

          {user.role === "Super Admin" ||
          user.role === "Store Manager" ||
          user.role === "Administrator" ? (
            <NavLink
              to={"/inventory"}
              style={activeTab === "inventory" ? activeStyle : undefined}
              onClick={() => {
                setActiveTab("inventory");
              }}
              className="sidebar-link"
            >
              <MdDashboardCustomize size={20} />
              Inventory Management
            </NavLink>
          ) : undefined}

          {user.role === "Super Admin" ||
          user.role === "Store Manager" ||
          user.role === "Administrator" ? (
            <NavLink
              to={"/supplier"}
              style={activeTab === "supplier" ? activeStyle : undefined}
              onClick={() => {
                setActiveTab("supplier");
              }}
              className="sidebar-link null"
            >
              <MdDashboardCustomize size={20} />
              Supplier Management
            </NavLink>
          ) : undefined}

          <NavLink
            to={"/"}
            style={activeTab === "logout" ? activeStyle : undefined}
            onClick={() => {
              logoutUser();
            }}
            className="sidebar-link"
          >
            <BiLogOut size={20} />
            Logout
          </NavLink>
        </div>
        <div className="nav__logo uppist">
          <small
            style={{
              textTransform: "uppercase",
              fontWeight: "600",
              color: "var(--white)",
            }}
          >
            powered by
          </small>
          <br />
          <img src="/12.png" alt="" />
        </div>
      </div>

      <div className="nav__container mobile">
        <div className={showSideBar ? "position" : "no-display"}>
          <FaTimes size={20} onClick={menuAction} />
        </div>
        <div className="nav__logo">
          <img src="/logo.png" alt="" width={"100%"} />
        </div>
        <div className="nav__wrapper">
          <NavLink
            to={"/orders"}
            style={activeTab === "orders" ? activeStyle : undefined}
            onClick={() => {
              toggleSideBar(!showSideBar);
              setActiveTab("orders");
            }}
            className="sidebar-link"
          >
            <MdOutlineInventory size={20} />

            {user.role === "Super Admin" ||
            user.role === "Supervisor" ||
            user.role === "Administrator"
              ? "Menu Manager"
              : "New Orders"}
          </NavLink>

          <NavLink
            to={"/dashboard"}
            style={activeTab === "dashboard" ? activeStyle : undefined}
            onClick={() => {
              toggleSideBar(!showSideBar);
              setActiveTab("dashboard");
            }}
            className={
              user.role === "Store Manager"
                ? "sidebar-link null"
                : "sidebar-link"
            }
          >
            <MdOutlineTableChart size={20} />
            Table Manager
          </NavLink>

          {(user.role === "Super Admin" || user.role === "Administrator") && (
            <div
              style={activeTab === "settings" ? activeStyle : undefined}
              onClick={settingsAction}
              className="sidebar-link"
            >
              <FiSettings size={20} />
              Settings
            </div>
          )}

          {user.role === "Super Admin" ||
          user.role === "Store Manager" ||
          user.role === "Administrator" ? (
            <NavLink
              to={"/inventory"}
              style={activeTab === "inventory" ? activeStyle : undefined}
              onClick={() => {
                toggleSideBar(!showSideBar);
                setActiveTab("inventory");
              }}
              className="sidebar-link"
            >
              <MdDashboardCustomize size={20} />
              Inventory Management
            </NavLink>
          ) : undefined}

          {user.role === "Super Admin" ||
          user.role === "Store Manager" ||
          user.role === "Administrator" ? (
            <NavLink
              to={"/supplier"}
              style={activeTab === "supplier" ? activeStyle : undefined}
              onClick={() => {
                setActiveTab("supplier");
              }}
              className="sidebar-link null"
            >
              <MdDashboardCustomize size={20} />
              Supplier Management
            </NavLink>
          ) : undefined}

          <NavLink
            to={"/"}
            style={activeTab === "logout" ? activeStyle : undefined}
            onClick={() => {
              logoutUser();
            }}
            className="sidebar-link"
          >
            <BiLogOut size={20} />
            Logout
          </NavLink>
        </div>
        <div className="nav__logo uppist">
          <small
            style={{
              textTransform: "uppercase",
              fontWeight: "600",
              color: "var(--white)",
            }}
          >
            powered by
          </small>
          <br />
          <img src="/12.png" alt="" />
        </div>
      </div>
    </>
  );
};

export default SideBar;
