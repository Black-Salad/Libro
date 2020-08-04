import React from "react";
import Books from "../components/common/Books";
import { ChevronRight } from "react-feather";
// import Bookprofile from "../components/common/Bookprofile";
import BreadCrumbs from "../components/common/BreadCrumbs";
import { Link } from "react-router-dom";
// import Button from "../components/common/Button";

const Bookshelf = () => {
  //---------------------------- Bookprofile open ----------------------------
  // const onOpen = () => {
  //   var bprofile = document.querySelector("#searchModal");
  //   bprofile.style.display = "block";
  //   document.querySelector("body").classList.add("modal-open");
  //   document.querySelector("#modal-back").innerHTML =
  //     '<div class="modal-backdrop fade show"></div>';
  // };
  return (
    <div>
      <BreadCrumbs breads={[<Link to="/">My Bookshelf</Link>]} />

      <div>
        <div style={{ display: "flex" }}>
          <Link to="/bookshelfmore?kind=reading">
            <span>읽고 있는 책 </span>
          </Link>
          {/* <Button onClick={onOpen}>임시</Button> */}
          <span style={{ marginLeft: "auto" }}>
            <Link to="/bookshelfmore?kind=reading">
              {/* <Link to="/bookshelfmore/reading"> */}
              more
              <ChevronRight />
            </Link>
          </span>
        </div>
        {/* Books 컴포넌트에 어느 항목인지 알려주는(읽고 있는 책/읽은 책/관심 책)kind를 props로 줍니다. */}
        <Books kind="reading"></Books>
      </div>
      <hr />
      <div>
        <div style={{ display: "flex" }}>
          <Link to="/bookshelfmore?kind=finished">
            <span>읽은 책 </span>
          </Link>
          <span style={{ marginLeft: "auto" }}>
            <Link to="/bookshelfmore?kind=finished">
              {/* <Link to="/bookshelfmore/finished"> */}
              more
              <ChevronRight />
            </Link>
          </span>
        </div>
        <Books kind="finished"></Books>
      </div>
      <hr />
      <div>
        <div style={{ display: "flex" }}>
          <Link to="/bookshelfmore?kind=interested">
            <span>관심 책 </span>
          </Link>
          <span style={{ marginLeft: "auto" }}>
            <Link to="/bookshelfmore?kind=interested">
              {/* <Link to="/bookshelfmore/interested"> */}
              more
              <ChevronRight />
            </Link>
          </span>
        </div>
        <Books kind="interested"></Books>
      </div>
    </div>
  );
};

export default Bookshelf;
