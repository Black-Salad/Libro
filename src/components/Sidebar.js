import React, { useState, useEffect } from "react";
import * as Icon from "react-feather";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const locationArr = window.location.pathname.split("/");
  const [selectedMenu, setSelectedMenu] = useState();

  useEffect(() => {
    document.querySelector("body").className = "";
    setSelectedMenu(locationArr[1]);
  }, []);

  return (
    <div className="sidebar">
      {/* <!-- 사이드바 헤더 --> */}
      <div className="sidebar-header">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">
            <img src="/img/feather-white.svg" alt="Logo" id="main-logo" />
            Libro
          </span>
        </Link>
        <span
          className="nav-link nav-icon rounded-circle ml-auto"
          data-toggle="sidebar"
        >
          <Icon.X />
        </span>
      </div>
      {/* <!-- 사이드바 바디 --> */}
      <div className="sidebar-body">
        <ul className="nav nav-sub">
          <li className="nav-label" style={{ marginTop: "1rem" }}>
            Search
          </li>
          <li className="nav-item">
            <Link to="/searchbooks">
              <span
                className={`nav-link has-icon ${
                  selectedMenu === "searchbooks" ? "active" : null
                }`}
              >
                <Icon.Search />책 검색
              </span>
            </Link>
          </li>
          <li className="nav-label" style={{ marginTop: "1rem" }}>
            My Room
          </li>
          <li className="nav-item">
            <Link to="/">
              <span
                className={`nav-link has-icon ${
                  selectedMenu === "" ? "active" : null
                }`}
              >
                <Icon.Book />내 책꽂이
              </span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/viewnotes">
              <span
                className={`nav-link has-icon ${
                  selectedMenu === "viewnotes" ? "active" : null
                }`}
              >
                <Icon.BookOpen />내 독서록
              </span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/writenote">
              <span
                className={`nav-link has-icon ${
                  selectedMenu === "writenote" ? "active" : null
                }`}
              >
                <Icon.Edit />
                독서록 쓰기
              </span>
            </Link>
          </li>

          <li className="nav-label" style={{ marginTop: "1rem" }}>
            Navigate
          </li>

          <li className="nav-item">
            <span
              className={`nav-link has-icon show ${
                selectedMenu === "navigate" ? "active" : null
              }`}
              onClick={() => {
                window.location = "/navigate";
              }}
              style={{ cursor: "pointer" }}
            >
              <Icon.Compass />
              둘러보기
            </span>
          </li>

          <li className="nav-item">
            <Link to="/timeline">
              <span
                className={`nav-link has-icon show ${
                  selectedMenu === "timeline" ? "active" : null
                }`}
              >
                <Icon.Clock />
                타임라인
              </span>
            </Link>
          </li>

          <li className="nav-item">
            <Link to="/searchnotes/all">
              <span
                className={`nav-link has-ico ${
                  selectedMenu === "searchnotes" ? "active" : null
                }`}
              >
                <Icon.Layers />
                독서록 탐색
              </span>
            </Link>
          </li>

          <li className="nav-label" style={{ marginTop: "1rem" }}>
            Setting
          </li>

          <li className="nav-item">
            <Link to="/setting">
              <span
                className={`nav-link has-icon ${
                  selectedMenu === "setting" ? "active" : null
                }`}
              >
                <Icon.Settings />
                설정
              </span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
