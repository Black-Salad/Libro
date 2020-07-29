import React from "react";
import { Plus, Search, ChevronLeft } from "react-feather";
import { Link } from "react-router-dom";

const Viewnotes = () => {
  return (
    <div>
      <nav aria-label="breadcrumb" class="main-breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
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

      <div className="row gutters-sm">
        <div className="col-sm-6 col-md-4 col-xl-3 mb-3">
          <div className="card h-100">
            <img src="/img/blog/1.jpg" className="card-img-top" alt="..." />
            <div className="card-body">
              <h6 className="card-title">
                React Native Basics: Implementing Infinite Scroll
              </h6>
              <div className="card-subtitle text-muted font-size-sm mb-2">
                by <a href="javascript:void(0)">mulev</a>
              </div>
              <a
                href="javascript:void(0)"
                className="badge badge-pill badge-light"
              >
                react
              </a>
              <a
                href="javascript:void(0)"
                className="badge badge-pill badge-light"
              >
                react-native
              </a>
              <a
                href="javascript:void(0)"
                className="badge badge-pill badge-light"
              >
                scroll
              </a>
            </div>
            <div className="card-footer font-size-sm text-muted">
              <span>published</span>,
              <span className="ml-1 mr-auto">07/04/20</span>
              <span>
                <i className="far fa-eye"></i> 19
              </span>
              <span>
                <i className="far fa-comment ml-2"></i> 3
              </span>
            </div>
            <div className="card-footer justify-content-between">
              <a
                href="javascript:void(0)"
                className="btn btn-link has-icon btn-xs bigger-130 text-primary"
              >
                <i className="mr-1" data-feather="eye"></i>View
              </a>
              <a
                href="javascript:void(0)"
                className="btn btn-link has-icon btn-xs bigger-130 text-success"
              >
                <i className="mr-1" data-feather="edit"></i>Edit
              </a>
              <a
                href="javascript:void(0)"
                className="btn btn-link has-icon btn-xs bigger-130 text-danger"
              >
                <i className="mr-1" data-feather="trash"></i>Delete
              </a>
            </div>
          </div>
        </div>
        <div className="col-sm-6 col-md-4 col-xl-3 mb-3">
          <div className="card h-100">
            <img src="/img/blog/2.jpg" className="card-img-top" alt="..." />
            <div className="card-body">
              <h6 className="card-title">
                When You Should use Redux with APIs
              </h6>
              <div className="card-subtitle text-muted font-size-sm mb-2">
                by <a href="javascript:void(0)">santiago-rodrig</a>
              </div>
              <a
                href="javascript:void(0)"
                className="badge badge-pill badge-light"
              >
                react
              </a>
              <a
                href="javascript:void(0)"
                className="badge badge-pill badge-light"
              >
                react-redux
              </a>
              <a
                href="javascript:void(0)"
                className="badge badge-pill badge-light"
              >
                api
              </a>
            </div>
            <div className="card-footer font-size-sm text-muted">
              <span className="text-warning">draft</span>,
              <span className="ml-1 mr-auto">07/04/20</span>
            </div>
            <div className="card-footer justify-content-between">
              <a
                href="javascript:void(0)"
                className="btn btn-link has-icon btn-xs bigger-130 text-primary"
              >
                <i className="mr-1" data-feather="eye"></i>View
              </a>
              <a
                href="javascript:void(0)"
                className="btn btn-link has-icon btn-xs bigger-130 text-success"
              >
                <i className="mr-1" data-feather="edit"></i>Edit
              </a>
              <a
                href="javascript:void(0)"
                className="btn btn-link has-icon btn-xs bigger-130 text-danger"
              >
                <i className="mr-1" data-feather="trash"></i>Delete
              </a>
            </div>
          </div>
        </div>
        <div className="col-sm-6 col-md-4 col-xl-3 mb-3">
          <div className="card h-100">
            <img src="/img/blog/3.jpg" className="card-img-top" alt="..." />
            <div className="card-body">
              <h6 className="card-title">Beginners Guider To React Router</h6>
              <div className="card-subtitle text-muted font-size-sm mb-2">
                by <a href="javascript:void(0)">melbeavs_</a>
              </div>
              <a
                href="javascript:void(0)"
                className="badge badge-pill badge-light"
              >
                react
              </a>
              <a
                href="javascript:void(0)"
                className="badge badge-pill badge-light"
              >
                react-router
              </a>
            </div>
            <div className="card-footer font-size-sm text-muted">
              <span>published</span>,
              <span className="ml-1 mr-auto">07/02/20</span>
              <span>
                <i className="far fa-eye"></i> 46
              </span>
              <span>
                <i className="far fa-comment ml-2"></i> 4
              </span>
            </div>
            <div className="card-footer justify-content-between">
              <a
                href="javascript:void(0)"
                className="btn btn-link has-icon btn-xs bigger-130 text-primary"
              >
                <i className="mr-1" data-feather="eye"></i>View
              </a>
              <a
                href="javascript:void(0)"
                className="btn btn-link has-icon btn-xs bigger-130 text-success"
              >
                <i className="mr-1" data-feather="edit"></i>Edit
              </a>
              <a
                href="javascript:void(0)"
                className="btn btn-link has-icon btn-xs bigger-130 text-danger"
              >
                <i className="mr-1" data-feather="trash"></i>Delete
              </a>
            </div>
          </div>
        </div>
        <div className="col-sm-6 col-md-4 col-xl-3 mb-3">
          <div className="card h-100">
            <img src="/img/blog/4.jpg" className="card-img-top" alt="..." />
            <div className="card-body">
              <h6 className="card-title">JavaScript Promises from Scratch</h6>
              <div className="card-subtitle text-muted font-size-sm mb-2">
                by <a href="javascript:void(0)">thejscode</a>
              </div>
              <a
                href="javascript:void(0)"
                className="badge badge-pill badge-light"
              >
                javascript
              </a>
              <a
                href="javascript:void(0)"
                className="badge badge-pill badge-light"
              >
                promise
              </a>
            </div>
            <div className="card-footer font-size-sm text-muted">
              <span>published</span>,
              <span className="ml-1 mr-auto">07/01/20</span>
              <span>
                <i className="far fa-eye"></i> 44
              </span>
              <span>
                <i className="far fa-comment ml-2"></i> 7
              </span>
            </div>
            <div className="card-footer justify-content-between">
              <a
                href="javascript:void(0)"
                className="btn btn-link has-icon btn-xs bigger-130 text-primary"
              >
                <i className="mr-1" data-feather="eye"></i>View
              </a>
              <a
                href="javascript:void(0)"
                className="btn btn-link has-icon btn-xs bigger-130 text-success"
              >
                <i className="mr-1" data-feather="edit"></i>Edit
              </a>
              <a
                href="javascript:void(0)"
                className="btn btn-link has-icon btn-xs bigger-130 text-danger"
              >
                <i className="mr-1" data-feather="trash"></i>Delete
              </a>
            </div>
          </div>
        </div>
        <div className="col-sm-6 col-md-4 col-xl-3 mb-3">
          <div className="card h-100">
            <img src="/img/blog/5.jpg" className="card-img-top" alt="..." />
            <div className="card-body">
              <h6 className="card-title">Learning ReactJS From Scratch</h6>
              <div className="card-subtitle text-muted font-size-sm mb-2">
                by <a href="javascript:void(0)">KGPrajwal</a>
              </div>
              <a
                href="javascript:void(0)"
                className="badge badge-pill badge-light"
              >
                react
              </a>
              <a
                href="javascript:void(0)"
                className="badge badge-pill badge-light"
              >
                get-started
              </a>
            </div>
            <div className="card-footer font-size-sm text-muted">
              <span>published</span>,
              <span className="ml-1 mr-auto">06/30/20</span>
              <span>
                <i className="far fa-eye"></i> 52
              </span>
              <span>
                <i className="far fa-comment ml-2"></i> 9
              </span>
            </div>
            <div className="card-footer justify-content-between">
              <a
                href="javascript:void(0)"
                className="btn btn-link has-icon btn-xs bigger-130 text-primary"
              >
                <i className="mr-1" data-feather="eye"></i>View
              </a>
              <a
                href="javascript:void(0)"
                className="btn btn-link has-icon btn-xs bigger-130 text-success"
              >
                <i className="mr-1" data-feather="edit"></i>Edit
              </a>
              <a
                href="javascript:void(0)"
                className="btn btn-link has-icon btn-xs bigger-130 text-danger"
              >
                <i className="mr-1" data-feather="trash"></i>Delete
              </a>
            </div>
          </div>
        </div>
        <div className="col-sm-6 col-md-4 col-xl-3 mb-3">
          <div className="card h-100">
            <img src="/img/blog/6.jpg" className="card-img-top" alt="..." />
            <div className="card-body">
              <h6 className="card-title">Jamstack Tools, Explained</h6>
              <div className="card-subtitle text-muted font-size-sm mb-2">
                by <a href="javascript:void(0)">CookieDuster</a>
              </div>
              <a
                href="javascript:void(0)"
                className="badge badge-pill badge-light"
              >
                jamstack
              </a>
            </div>
            <div className="card-footer font-size-sm text-muted">
              <span>published</span>,
              <span className="ml-1 mr-auto">06/28/20</span>
              <span>
                <i className="far fa-eye"></i> 33
              </span>
              <span>
                <i className="far fa-comment ml-2"></i> 8
              </span>
            </div>
            <div className="card-footer justify-content-between">
              <a
                href="javascript:void(0)"
                className="btn btn-link has-icon btn-xs bigger-130 text-primary"
              >
                <i className="mr-1" data-feather="eye"></i>View
              </a>
              <a
                href="javascript:void(0)"
                className="btn btn-link has-icon btn-xs bigger-130 text-success"
              >
                <i className="mr-1" data-feather="edit"></i>Edit
              </a>
              <a
                href="javascript:void(0)"
                className="btn btn-link has-icon btn-xs bigger-130 text-danger"
              >
                <i className="mr-1" data-feather="trash"></i>Delete
              </a>
            </div>
          </div>
        </div>
        <div className="col-sm-6 col-md-4 col-xl-3 mb-3">
          <div className="card h-100">
            <img src="/img/blog/7.jpg" className="card-img-top" alt="..." />
            <div className="card-body">
              <h6 className="card-title">
                How To Handle Form and Validation with React?
              </h6>
              <div className="card-subtitle text-muted font-size-sm mb-2">
                by <a href="javascript:void(0)">si-le</a>
              </div>
              <a
                href="javascript:void(0)"
                className="badge badge-pill badge-light"
              >
                form
              </a>
              <a
                href="javascript:void(0)"
                className="badge badge-pill badge-light"
              >
                validation
              </a>
              <a
                href="javascript:void(0)"
                className="badge badge-pill badge-light"
              >
                react
              </a>
            </div>
            <div className="card-footer font-size-sm text-muted">
              <span>published</span>,
              <span className="ml-1 mr-auto">06/23/20</span>
              <span>
                <i className="far fa-eye"></i> 42
              </span>
              <span>
                <i className="far fa-comment ml-2"></i> 10
              </span>
            </div>
            <div className="card-footer justify-content-between">
              <a
                href="javascript:void(0)"
                className="btn btn-link has-icon btn-xs bigger-130 text-primary"
              >
                <i className="mr-1" data-feather="eye"></i>View
              </a>
              <a
                href="javascript:void(0)"
                className="btn btn-link has-icon btn-xs bigger-130 text-success"
              >
                <i className="mr-1" data-feather="edit"></i>Edit
              </a>
              <a
                href="javascript:void(0)"
                className="btn btn-link has-icon btn-xs bigger-130 text-danger"
              >
                <i className="mr-1" data-feather="trash"></i>Delete
              </a>
            </div>
          </div>
        </div>
        <div className="col-sm-6 col-md-4 col-xl-3 mb-3">
          <div className="card h-100">
            <img src="/img/blog/8.jpg" className="card-img-top" alt="..." />
            <div className="card-body">
              <h6 className="card-title">
                What Are JWTs And Should You Use Them?
              </h6>
              <div className="card-subtitle text-muted font-size-sm mb-2">
                by <a href="javascript:void(0)">vivekkrishnavk</a>
              </div>
              <a
                href="javascript:void(0)"
                className="badge badge-pill badge-light"
              >
                jwt
              </a>
              <a
                href="javascript:void(0)"
                className="badge badge-pill badge-light"
              >
                auth
              </a>
            </div>
            <div className="card-footer font-size-sm text-muted">
              <span>published</span>,
              <span className="ml-1 mr-auto">06/22/20</span>
              <span>
                <i className="far fa-eye"></i> 39
              </span>
              <span>
                <i className="far fa-comment ml-2"></i> 7
              </span>
            </div>
            <div className="card-footer justify-content-between">
              <a
                href="javascript:void(0)"
                className="btn btn-link has-icon btn-xs bigger-130 text-primary"
              >
                <i className="mr-1" data-feather="eye"></i>View
              </a>
              <a
                href="javascript:void(0)"
                className="btn btn-link has-icon btn-xs bigger-130 text-success"
              >
                <i className="mr-1" data-feather="edit"></i>Edit
              </a>
              <a
                href="javascript:void(0)"
                className="btn btn-link has-icon btn-xs bigger-130 text-danger"
              >
                <i className="mr-1" data-feather="trash"></i>Delete
              </a>
            </div>
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
