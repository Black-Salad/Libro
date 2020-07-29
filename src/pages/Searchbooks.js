import React from "react";
import Temp from "../components/Temp";

const Searchbooks = () => {
  return (
    <div>
      <nav aria-label="breadcrumb" class="main-breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
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
