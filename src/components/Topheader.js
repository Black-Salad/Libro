import React from "react";
import * as Icon from "react-feather";
import { Link } from "react-router-dom";

const Topheader = () => {
  // const toggleSidebar = () => {
  //   document.querySelector("body").className = "sidebar-expand";
  // };
  return (
    <div className="main-header">
      <a
        className="nav-link nav-link-faded rounded-circle nav-icon"
        href="#"
        data-toggle="sidebar"
        // onClick={toggleSidebar}
      >
        <Icon.Menu />
      </a>
      <div className="logo" style={{ marginLeft: "15px" }}>
        <Icon.Feather />
        <span style={{ marginLeft: "7px" }}>Libro</span>
      </div>
      <ul className="nav nav-circle ml-auto top-nav">
        <li className="nav-item dropdown nav-notif">
          <a
            className="nav-link nav-link-faded nav-icon has-badge dropdown-toggle no-caret"
            href="#"
          >
            <Icon.Bell />
          </a>
        </li>
        <li className="nav-item dropdown ml-2">
          <Link to="/login">
            <button
              type="button"
              className="btn btn-secondary btn-block btn-login"
              style={{ textDecoration: "none", color: "#ffffff" }}
            >
              Login
            </button>
          </Link>
          {/* <a
            className="nav-link nav-link-faded rounded nav-link-img dropdown-toggle px-2"
            href="#"
          >
            <img src="./img/user.svg" className="rounded-circle mr-2" />
            <span className="d-none d-sm-block">Jade Kim</span>
          </a> */}
        </li>
      </ul>
    </div>
  );
};

export default Topheader;
