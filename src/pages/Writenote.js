import React from "react";
import Bookprofile from "../components/common/Bookprofile";
import BreadCrumbs from "../components/common/BreadCrumbs";

const Writenote = () => {
  //---------------------------- Bookprofile open ----------------------------
  const onOpen = () => {
    var bprofile = document.querySelector("#searchModal");
    bprofile.style.display = "block";
    document.querySelector("body").classList.add("modal-open");
    document.querySelector("#modal-back").innerHTML =
      '<div class="modal-backdrop fade show"></div>';
  };

  return (
    <div>
      <BreadCrumbs breads={["독서록 쓰기"]} />

      <div className="card">
        <div className="card-body">
          <form>
            <div className="form-group">
              <label>책 선택</label>
              <div className="dropdown">
                <button className="btn btn-light dropdown-toggle" type="button">
                  독서록을 쓸 책 선택
                </button>
                <div className="dropdown-menu">
                  <a className="dropdown-item" href="#">
                    Action
                  </a>
                  <a className="dropdown-item" href="#">
                    Another action
                  </a>
                  <a className="dropdown-item" href="#">
                    Something else here
                  </a>
                </div>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="blogTitle">제목</label>
              <input
                type="text"
                className="form-control"
                id="blogTitle"
                autoFocus
                autoComplete="off"
              />
            </div>
            <div className="form-group">
              <label>내용</label>
              <textarea className="form-control"></textarea>
            </div>
          </form>
          <button
            type="button"
            className="btn btn-primary"
            style={{ margin: "10px auto" }}
            onClick={onOpen}
          >
            저장
          </button>
        </div>
      </div>
      <Bookprofile />
    </div>
  );
};

export default Writenote;
