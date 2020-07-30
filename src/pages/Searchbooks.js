import React from "react";
import Temp from "../components/Temp";
import BreadCrumbs from "../components/common/BreadCrumbs";
import { Search } from "react-feather";

const Searchbooks = () => {
  return (
    <div>
      <BreadCrumbs breads={["책 검색"]} />
      {/* <div className="d-flex align-items-center collapse transition-none show blog-toolbar"> */}
      <div class="col-lg-8 col-md-8 col-sm-8 mb-3">
        <input
          type="text"
          class="form-control"
          placeholder="제목 / 저자명 / 출판사"
        />
        <button
          className="btn btn-light btn-sm btn-icon ml-auto mr-1"
          type="button"
          data-toggle="collapse"
          data-target=".blog-toolbar"
        >
          <Search />
        </button>
      </div>

      {/* </div> */}
      <br />
      <Temp />
    </div>
  );
};

export default Searchbooks;
