import React from "react";

const BreadCrumbs = () => {
  return (
    <div>
      <nav ariaLabel="breadcrumb" className="main-breadcrumb">
        <ol className="breadcrumb border breadcrumb-style1">
          <li className="breadcrumb-item active" ariaCurrent="page">
            <a href="#">내 책꽂이</a>
          </li>
        </ol>
      </nav>
    </div>
  );
};

export default BreadCrumbs;
