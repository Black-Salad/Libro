import React, { useEffect } from "react";
import * as Icon from "react-feather";
import { Link } from "react-router-dom";
import { Cookies } from "react-cookie";
import HomeIcon from "@material-ui/icons/Home";
import SettingsIcon from "@material-ui/icons/Settings";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

const Topheader = () => {
  const cookies = new Cookies();

  // 로그인정보가 없으면 로그인화면으로 이동
  useEffect(() => {
    if (cookies.get("loginUserId") == null) {
      alert("로그인정보가 없습니다.");
      window.location = "/login";
    }
  });

  // 로그아웃
  const logout = () => {
    cookies.remove("loginUserId");
    cookies.remove("loginUserName");
    cookies.remove("loginUserEmail");
    cookies.remove("loginUserImg");
    window.location = "/login";
  };

  return (
    <div className="main-header">
      <Link
        to="#"
        className="nav-link nav-link-faded rounded-circle nav-icon"
        data-toggle="sidebar"
      >
        <Icon.Menu />
      </Link>
      <div className="logo" style={{ marginLeft: "15px" }}>
        <Icon.Feather />
        <span style={{ marginLeft: "7px" }}>Libro</span>
      </div>
      <ul className="nav nav-circle ml-auto top-nav">
        <li className="nav-item dropdown nav-notif">
          <Link
            to="#"
            className="nav-link nav-link-faded nav-icon has-badge dropdown-toggle no-caret"
          >
            <Icon.Bell />
          </Link>
        </li>
        <li className="nav-item dropdown ml-2">
          <Link
            to="#"
            className="nav-link nav-link-faded rounded nav-link-img dropdown-toggle px-2"
            data-toggle="dropdown"
            data-display="static"
          >
            <img
              src={`${cookies.get("loginUserImg")}`}
              alt=""
              className="rounded-circle mr-2"
            />
            <span className="d-none d-sm-block">
              {cookies.get("loginUserName")}
            </span>
          </Link>
          <div className="dropdown-menu dropdown-menu-right pt-0 overflow-hidden">
            <div className="media align-items-center bg-primary text-white px-4 py-3 mb-2">
              <img
                src={`${cookies.get("loginUserImg")}`}
                alt=""
                className="rounded-circle"
                width="50"
                height="50"
              />
              <div className="media-body ml-2 text-nowrap">
                <h6 className="mb-0">{cookies.get("loginUserName")}</h6>
                <span className="text-gray-400 font-size-sm">
                  {cookies.get("loginUserEmail")}
                </span>
              </div>
            </div>
            <Link
              to={`/room/${cookies.get("loginUserId")}`}
              className="dropdown-item has-icon"
            >
              <HomeIcon /> &nbsp; My Room
            </Link>
            <Link to="/setting" className="dropdown-item has-icon">
              <SettingsIcon /> &nbsp; 설정
            </Link>
            <button
              className="dropdown-item has-icon text-danger"
              onClick={() => logout()}
            >
              <ExitToAppIcon /> &nbsp; 로그아웃
            </button>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Topheader;
