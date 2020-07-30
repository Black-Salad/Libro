import React from "react";
import Temp from "../components/Temp";

const Searchbooks = () => {
  return (
    <div>
      <nav ariaLabel="breadcrumb" className="main-breadcrumb">
        <ol className="breadcrumb border breadcrumb-style1">
          <li className="breadcrumb-item active" ariaCurrent="page">
            <a href="#">책 검색</a>
          </li>
        </ol>
      </nav>
      책 검색
      <br />
      <Temp />
    </div>
  );
};

export default Searchbooks;
