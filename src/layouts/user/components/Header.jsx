import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "./Header.module.css";
import { FaUserCircle } from "react-icons/fa";
import { BiSolidUserPin } from "react-icons/bi";

import { IoPeopleSharp } from "react-icons/io5";
import { FaHome } from "react-icons/fa";

import { MdBookmarks } from "react-icons/md";

const Header = ({ toggleVisibility }) => {
  return (
    <nav className="navbar w-75 mx-auto">
      <div className="w-100 d-flex justify-content-between justify-content-md-center ">
        <div className="d-flex gap-3 gap-md-5">
          <Link
            className={`d-flex flex-column gap-0 gy-0 align-items-center justify-content-center ${
              styles.navLink
            } ${
              location.pathname === "/user-dashboard" ? styles.activeLink : ""
            }`}
            to={{
              pathname: "/user-dashboard",
              // state: userRecord,
            }}
          >
            <FaHome />
            <small style={{ fontSize: "10px" }}>Home</small>
          </Link>

          <Link
            className={`d-flex flex-column gap-0 gy-0 align-items-center justify-content-center ${
              styles.navLink
            } ${
              location.pathname === "/user-dashboard/members"
                ? styles.activeLink
                : ""
            }`}
            to="members"
          >
            <IoPeopleSharp className="" />
            <small style={{ fontSize: "10px" }}>Network</small>
          </Link>

          <Link
            className={`d-flex flex-column gap-0 gy-0 align-items-center justify-content-center ${
              styles.navLink
            } ${
              location.pathname === "/user-dashboard/my-posts"
                ? styles.activeLink
                : ""
            }`}
            to="my-posts"
          >
            <BiSolidUserPin />
            <small style={{ fontSize: "10px" }}>Personal</small>
          </Link>

          <Link
            className={`d-flex flex-column gap-0 gy-0 align-items-center justify-content-center ${
              styles.navLink
            } ${
              location.pathname === "/user-dashboard/bookmark-posts"
                ? styles.activeLink
                : ""
            }`}
            to="bookmark-posts"
          >
            <MdBookmarks />
            <small style={{ fontSize: "10px" }}>saved</small>
          </Link>
        </div>

        <FaUserCircle
          className={` ${styles.profileIcon} d-block d-md-none `}
          onClick={toggleVisibility}
        />
      </div>
    </nav>
  );
};

export default Header;
