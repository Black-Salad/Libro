import React from "react";
import Books from "../components/common/Books";

const Bookshelf = () => {
  return (
    <div>
      <nav ariaLabel="breadcrumb" className="main-breadcrumb">
        <ol className="breadcrumb border breadcrumb-style1">
          <li className="breadcrumb-item active" ariaCurrent="page">
            <a href="#">내 책꽂이</a>
          </li>
        </ol>
      </nav>
      <div>
        <span>읽고 있는 책</span>
      </div>
      <Books kind="reading"></Books>
      <hr />
      <p>읽은 책</p>
      <Books kind="finished"></Books>
      <hr />
      <p>관심 책</p>
      <Books kind="interested"></Books>
      <hr />
    </div>
  );
};

export default Bookshelf;
