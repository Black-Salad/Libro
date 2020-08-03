import React from "react";
import * as Icon from "react-feather";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const toggleSidebar = () => {
    document.querySelector("body").className = "";
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
          // onClick={toggleSidebar}
        >
          <Icon.X />
        </span>
      </div>
      {/* <!-- 사이드바 바디 --> */}
      <div className="sidebar-body">
        <ul className="nav nav-sub">
          <li className="nav-label">My Room</li>
          <li className="nav-item">
            <Link to="/">
              <span className="nav-link has-icon" onClick={toggleSidebar}>
                {/* 클릭 시 class에 active 추가 */}
                <Icon.Book />내 책꽂이
              </span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/viewnotes">
              <span className="nav-link has-icon" onClick={toggleSidebar}>
                <Icon.BookOpen />내 독서록
              </span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/writenote">
              <span className="nav-link has-icon" onClick={toggleSidebar}>
                <Icon.Edit />
                독서록 쓰기
              </span>
            </Link>
          </li>
          <li className="nav-label">Navigate</li>
          <li className="nav-item">
            <Link to="/search">
              <span className="nav-link has-icon" onClick={toggleSidebar}>
                <Icon.Search />책 검색
              </span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/navigate">
              <span className="nav-link has-icon" onClick={toggleSidebar}>
                <Icon.Compass />
                둘러보기
              </span>
            </Link>
          </li>
          <li className="nav-label">Setting</li>
          <li className="nav-item">
            <Link to="/myprofile">
              <span className="nav-link has-icon" onClick={toggleSidebar}>
                <Icon.User />내 프로필
              </span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/setting">
              <span className="nav-link has-icon" onClick={toggleSidebar}>
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
