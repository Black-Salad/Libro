import React, { useState } from "react";
import * as Icon from "react-feather";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const locationArr = window.location.pathname.split("/");
  const [selectedMenu, setSelectedMenu] = useState({
    selected: locationArr[1],
  });
  const toggleSidebar = (menu) => {
    document.querySelector("body").className = "";
    setSelectedMenu({ selected: menu });
  };

  return (
    <div className="sidebar">
      {/* <!-- 사이드바 헤더 --> */}
      <div className="sidebar-header">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">
            <img src="./img/feather-white.svg" alt="Logo" id="main-logo" />
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
          <li className="nav-label" style={{ marginTop: ".5rem" }}>
            Search
          </li>
          <li className="nav-item">
            <Link to="/search">
              <span
                className={`nav-link has-icon ${
                  selectedMenu.selected === "searchbooks" ? "active" : null
                }`}
                onClick={() => toggleSidebar("searchbooks")}
              >
                <Icon.Search />책 검색
              </span>
            </Link>
          </li>
          <li className="nav-label" style={{ marginTop: ".5rem" }}>
            My Room
          </li>
          <li className="nav-item">
            {/* <Link to="/"> */}
            <span className={`nav-link has-icon show`}>
              <Icon.Book />내 서재
            </span>
            {/* </Link> */}
            <ul>
              <li>
                <Link to="/">
                  <a
                    className={selectedMenu.selected === "" ? "active" : null}
                    onClick={() => toggleSidebar("")}
                  >
                    {/* 클릭 시 class에 active 추가 */}내 책꽂이
                  </a>
                </Link>
              </li>
              <li>
                <Link to="/viewnotes">
                  <a
                    className={
                      selectedMenu.selected === "viewnotes" ? "active" : null
                    }
                    onClick={() => toggleSidebar("viewnotes")}
                  >
                    내 독서록
                  </a>
                </Link>
              </li>
              <li>
                <Link to="/writenote">
                  <a
                    className={
                      selectedMenu.selected === "writenotes" ? "active" : null
                    }
                    onClick={() => toggleSidebar("writenotes")}
                  >
                    독서록 쓰기
                  </a>
                </Link>
              </li>
            </ul>
          </li>

          <li className="nav-label" style={{ marginTop: ".5rem" }}>
            Navigate
          </li>

          <li className="nav-item">
            {/* <Link to="/navigate"> */}
            <span
              className={`nav-link has-icon show ${
                selectedMenu.selected === "navigate" ? "active" : null
              }`}
              onClick={() => toggleSidebar("navigate")}
            >
              <Icon.Compass />
              둘러보기
            </span>
            {/* </Link> */}

            <ul>
              <li>
                {/* <Link to="/"> */}
                <a>타임라인</a>
                {/* </Link> */}
              </li>
              <li>
                {/* <Link to="/viewnotes"> */}
                <a>친구들</a>
                {/* </Link> */}
              </li>
              <li>
                {/* <Link to="/writenote"> */}
                <a>독서록 탐색</a>
                {/* </Link> */}
              </li>
            </ul>
          </li>
          <li className="nav-label" style={{ marginTop: ".5rem" }}>
            Setting
          </li>

          <li className="nav-item">
            <Link to="/setting">
              <span
                className={`nav-link has-icon ${
                  selectedMenu.selected === "setting" ? "active" : null
                }`}
                onClick={() => toggleSidebar("setting")}
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
