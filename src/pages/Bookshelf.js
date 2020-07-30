import React from "react";
import Books from "../components/common/Books";
import { Plus } from "react-feather";
import Bookprofile from "../components/common/Bookprofile";

const Bookshelf = () => {
  //---------------------------- Bookprofile open ----------------------------
  const open = () => {
    var bprofile = document.querySelector("#searchModal");
    bprofile.style.display = "block";
    document.querySelector("body").classList.add("modal-open");
    document.querySelector("#modal-back").innerHTML =
      '<div class="modal-backdrop fade show"></div>';
  };
  return (
    <div>
      {/* Books 컴포넌트에 어느 항목인지 알려주는(읽고 있는 책/읽은 책/관심 책)kind를 props로 줍니다. */}
      <div>
        <div style={{ marginBottom: "10px" }}>
          <span>읽고 있는 책 </span>
          <span>
            더보기
            <Plus />
          </span>
        </div>
        <Books kind="reading"></Books>
      </div>
      <hr />
      <div>
        <div style={{ marginBottom: "10px" }}>
          <span>읽은 책 </span>
          <span>
            더보기
            <Plus />
          </span>
        </div>
        <Books kind="finished"></Books>
      </div>
      <hr />
      <div>
        <div style={{ marginBottom: "10px" }}>
          <span>관심 책 </span>
          <span>
            더보기
            <Plus />
          </span>
        </div>
        <Books kind="interested"></Books>
      </div>
      <Bookprofile />
    </div>
  );
};

export default Bookshelf;
