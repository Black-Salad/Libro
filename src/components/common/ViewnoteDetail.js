import React from "react";
import { Plus, Search, ChevronLeft } from "react-feather";
import { Link } from "react-router-dom";

const ViewnoteDetail = (props) => {
  return (
    <div>
      {/* note contents */}
      <div className="card mb-3">
        <div className="card-body">
          <div className="row">
            <div className="col-sm-2">
              <h6 className="mb-0">제목</h6>
            </div>
            <div className="col-sm-10 text-secondary">존리의 부자되기 습관</div>
          </div>
          <hr />
          <div className="row">
            <div className="col-sm-2">
              <h6 className="mb-0">내용</h6>
            </div>
            <div className="col-sm-10 text-secondary">
              2020년 상반기 경제경영 베스트 1위! 10만부 기념 리커버 에디션!
              동학개미운동을 이끄는 존봉준 존리가 제안하는 하루 만원으로
              시작하는 부자되기 습관! 부자가 되기 위해 버려야할 3가지 잘못된
              습관 누구나 부자가 될 수 있다. 다만 천천히 될 뿐이다
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-sm-3">
              <div className="list-with-gap">
                <Link to="/Viewnotes">
                  <button
                    className="btn btn-outline-primary btn-sm has-icon"
                    type="button"
                  >
                    목록
                  </button>
                </Link>
                <Link to="/writenote">
                  <button
                    className="btn btn-outline-success btn-sm has-icon"
                    type="button"
                  >
                    수정
                  </button>
                </Link>
                <button
                  className="btn btn-outline-danger btn-sm has-icon"
                  type="button"
                >
                  삭제
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewnoteDetail;
