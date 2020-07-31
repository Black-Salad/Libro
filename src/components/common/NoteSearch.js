import React from "react";
import { Plus, Search, ChevronLeft } from "react-feather";
import { Link } from "react-router-dom";

const NoteSearch = (props) => {
  const search = () => {
    document.getElementById("searchform").classList.toggle("show");
    document.querySelector("#notewrite").classList.toggle("show");
  };
  return (
    <>
      <div className="card mb-3">
        <div className="card-body p-2" style={{ height: "50px" }}>
          <div
            className="d-flex align-items-center collapse transition-none blog-toolbar"
            id="searchform"
          >
            <button
              className="btn btn-sm btn-icon mr-2"
              data-toggle="collapse"
              data-target=".blog-toolbar"
              onClick={search}
            >
              <ChevronLeft />
            </button>
            <input
              type="text"
              className="form-control form-control-sm bg-gray-200 border-gray-200"
              placeholder="독서록 검색"
            />
          </div>
          <div
            className="d-flex align-items-center collapse transition-none show blog-toolbar"
            id="notewrite"
          >
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
              onClick={search}
            >
              <Search />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NoteSearch;
