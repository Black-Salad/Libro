import React from "react";
import { Plus, Search, ChevronLeft } from "react-feather";
import { Link } from "react-router-dom";
import ViewnotesCom from "../components/common/Viewnotes";

const Viewnotes = () => {
  return (
    <div>
      <nav ariaLabel="breadcrumb" className="main-breadcrumb">
        <ol className="breadcrumb border breadcrumb-style1">
          <li className="breadcrumb-item active" ariaCurrent="page">
            <a href="#">내 독서록</a>
          </li>
        </ol>
      </nav>

      <div className="card mb-3">
        <div className="card-body p-2" style={{ height: "47px" }}>
          <div className="d-flex align-items-center collapse transition-none blog-toolbar">
            <button
              className="btn btn-sm btn-icon mr-2"
              data-toggle="collapse"
              data-target=".blog-toolbar"
            >
              <ChevronLeft />
            </button>
            <span className="input-icon input-icon-sm">
              <i className="material-icons">search</i>
              <input
                type="text"
                className="form-control form-control-sm bg-gray-200 border-gray-200"
                placeholder="Search blog"
              />
            </span>
          </div>
          <div className="d-flex align-items-center collapse transition-none show blog-toolbar">
            <Link to="/writenote">
              <button
                className="btn btn-outline-primary btn-sm has-icon"
                type="button"
              >
                <Plus /> 독서록 쓰기
              </button>
            </Link>
            <button
              className="btn btn-light btn-sm btn-icon ml-auto mr-1"
              type="button"
              data-toggle="collapse"
              data-target=".blog-toolbar"
            >
              <Search />
            </button>
          </div>
        </div>
      </div>

      {/* 독서록리스트 */}
      <ViewnotesCom />

      {/* 페이징처리 */}
      <ul className="pagination justify-content-center mb-0">
        <li className="page-item disabled">
          <span className="page-link">Previous</span>
        </li>
        <li className="page-item active">
          <span className="page-link">1</span>
        </li>
        <li className="page-item">
          <a className="page-link" href="javascript:void(0)">
            2
          </a>
        </li>
        <li className="page-item">
          <a className="page-link" href="javascript:void(0)">
            3
          </a>
        </li>
        <li className="page-item">
          <a className="page-link" href="javascript:void(0)">
            Next
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Viewnotes;
