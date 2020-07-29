import React from "react";

const Writenote = () => {
  return (
    <div>
      <nav aria-label="breadcrumb" class="main-breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <a href="#">독서록 쓰기</a>
          </li>
        </ol>
      </nav>
      <form>
        {/* <div className="row">
          <div className="col-lg-8"> */}
        <div className="card">
          <div className="card-body">
            <div className="form-group">
              <label htmlFor="blogTitle">Title</label>
              <input
                type="text"
                className="form-control"
                id="blogTitle"
                autoFocus
                autoComplete="off"
              />
            </div>
            <div className="form-group" style={{ display: "block" }}>
              <label>Content</label>
              <textarea className="form-control"></textarea>
            </div>
          </div>
        </div>
        {/* </div>
        </div> */}
      </form>
    </div>
  );
};

export default Writenote;
