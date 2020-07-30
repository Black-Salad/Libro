import React from "react";

const BreadCrumbs = (props) => {
  return (
    <div>
      <nav className="main-breadcrumb">
        <ol className="breadcrumb border breadcrumb-style1">
          {props.breads.map((bread, index) => (
            <li key={index} className="breadcrumb-item active">
              <a href="#">{bread}</a>
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
};

export default BreadCrumbs;
