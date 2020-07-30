import React from "react";

const Viewnotes = (props) => {
  return (
    <>
      <div className="row gutters-sm">
        <div className="col-6 col-sm-4 col-md-3 col-xl-3 mb-3">
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
      </div>
    </>
  );
};

export default Viewnotes;
