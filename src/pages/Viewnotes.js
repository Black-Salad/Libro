import React from "react";
import { Plus, Search, ChevronLeft } from "react-feather";
import { Link } from "react-router-dom";
import BreadCrumbs from "../components/common/BreadCrumbs";

const Viewnotes = () => {
  return (
    <div>
      <BreadCrumbs breads={["내 독서록"]} />

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

      <div className="row gutters-sm">
        <div className="col-sm-4 col-md-3 col-xl-3 mb-3">
          <div className="card h-100">
            <img src="/img/blog/1.jpg" className="card-img-top" alt="..." />
            <div className="card-body">
              <h6 className="card-title">여행의 이유를 읽고</h6>
              <div className="card-subtitle text-muted font-size-sm mb-2">
                by Jade Kim
              </div>
            </div>
            <div className="card-footer font-size-sm text-muted">
              <span className="ml-1 mr-auto">07/04/20</span>
            </div>
            <div className="card-footer justify-content-between"></div>
          </div>
        </div>
        <div className="col-sm-4 col-md-3 col-xl-3 mb-3">
          <div className="card h-100">
            <img src="/img/blog/1.jpg" className="card-img-top" alt="..." />
            <div className="card-body">
              <h6 className="card-title">아가미를 읽고</h6>
              <div className="card-subtitle text-muted font-size-sm mb-2">
                by Jade Kim
              </div>
            </div>
            <div className="card-footer font-size-sm text-muted">
              <span className="ml-1 mr-auto">07/04/20</span>
            </div>
            <div className="card-footer justify-content-between"></div>
          </div>
        </div>
      </div>

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
