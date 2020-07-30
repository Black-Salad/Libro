import React, { Children } from "react";
import Topheader from "./Topheader";
import Sidebar from "./Sidebar";
import BreadCrumbs from "./common/BreadCrumbs";

const Layout = (props) => {
  const children = props.children || null;
  return (
    <div className="libro-layout">
      {/* 좌측 메뉴 바 */}
      <Sidebar />
      <div className="main">
        {/* 상단 헤더 바 */}
        <Topheader />
        <div className="main-body">
          <BreadCrumbs />
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
