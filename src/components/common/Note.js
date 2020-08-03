import React, { useState } from "react";
import { Plus, Search, ChevronLeft } from "react-feather";
import { Link } from "react-router-dom";

const Note = () => {
  //임시 notes
  const [notes, setNotes] = useState([
    {
      noteIDX: 1,
      noteUser: "test01",
      noteBook: "여행의 이유",
      bookIDX: 1,
      noteTitle: "여행의 이유를 읽고나서",
      noteContents: "예~~~~~~~~~~~~~~~`여행~~~~~~~~`",
      noteDate: "2020-03-20",
    },
    {
      noteIDX: 2,
      noteUser: "test01",
      noteBook: "점심메뉴",
      bookIDX: 2,
      noteTitle: "점심은 뭘 먹어야 잘 먹었다 소문이 날까",
      noteContents: "잘모르겠따",
      noteDate: "2020-07-30",
    },
    {
      noteIDX: 3,
      noteUser: "test01",
      noteBook: "존리의 부자되기 습관",
      bookIDX: 3,
      noteTitle: "부자가되려면..............",
      noteContents: "...........",
      noteDate: "2020-07-31",
    },
    {
      noteIDX: 4,
      noteUser: "test01",
      noteBook: "여기는 책이름이고",
      bookIDX: 4,
      noteTitle: "여기는 독서록 제목을 적는곳이구",
      noteContents: "여기는 독서록 내용을 적는곳이지",
      noteDate: "2020-07-20",
    },
  ]);

  const [searchNotes, setSearchNotes] = useState([]);

  //--------------------- 삭제 ----------------------------------------------
  const onDelete = (noteIDX) => {
    if (window.confirm("해당 독서록을 삭제하시겠습니까?")) {
      let filterList = notes.filter((item) => item.noteIDX !== noteIDX);
      setNotes(filterList);

      filterList = searchNotes.filter((item) => item.noteIDX !== noteIDX);
      setSearchNotes(filterList);

      alert("삭제완료");
    }
  };

  //--------------------- 검색 ----------------------------------------------
  window.onload = () => {
    document.getElementsByClassName("gutters-sm")[1].style.display = "none";
  };

  const onKeyPressSearch = (e) => {
    if (e.key === "Enter") {
      //e.chardCode === 13

      const filterList = notes.filter(
        (item) =>
          item.noteBook.indexOf(e.target.value) !== -1 ||
          item.noteTitle.indexOf(e.target.value) !== -1 ||
          item.noteContents.indexOf(e.target.value) !== -1
      );
      setSearchNotes(filterList);
      document.getElementsByClassName("gutters-sm")[0].style.display = "none";
      document.getElementsByClassName("gutters-sm")[1].style.display = "flex";
    }
  };

  return (
    <>
      {/******************** 검색 구현하려고 NotedSearch 임시로 가져옴 ************************/}
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
              // onClick={search}
            >
              <ChevronLeft />
            </button>
            <input
              type="text"
              className="form-control form-control-sm bg-gray-200 border-gray-200"
              placeholder="책제목 / 독서록제목 /  독서록 내용"
              onKeyPress={(e) => onKeyPressSearch(e)}
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
              // onClick={search}
            >
              <Search />
            </button>
          </div>
        </div>
      </div>

      <div className="row gutters-sm">
        {notes.map((item, index) => {
          return (
            <React.Fragment key={index}>
              <div className="col-6 col-sm-4 col-md-3 col-xl-3 mb-3">
                <div className="card h-100">
                  <img
                    src="/img/blog/1.jpg"
                    className="card-img-top"
                    alt="..."
                  />
                  <div className="card-body">
                    <h6 className="card-title">
                      <Link to={`./viewnotedetail/${item.noteIDX}`}>
                        {item.noteTitle}
                      </Link>
                    </h6>
                    <div className="card-subtitle text-muted font-size-sm mb-2">
                      {item.noteBook}
                    </div>
                  </div>
                  <div className="card-footer font-size-sm text-muted">
                    <span className="ml-1 mr-auto">{item.noteDate}</span>
                    <a
                      className="btn btn-link has-icon btn-xs bigger-130 text-danger"
                      onClick={() => onDelete(item.noteIDX)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-trash mr-1"
                      >
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                      </svg>
                      삭제
                    </a>
                  </div>
                </div>
              </div>
            </React.Fragment>
          );
        })}
      </div>

      {/*****************  검색구현하려고 만든 검색결과 나중엔 백엔드쪽에서 한번에 처리 ****************/}
      <div className="row gutters-sm">
        {searchNotes.map((item, index) => {
          return (
            <React.Fragment key={index}>
              <div className="col-6 col-sm-4 col-md-3 col-xl-3 mb-3">
                <div className="card h-100">
                  <img
                    src="/img/blog/1.jpg"
                    className="card-img-top"
                    alt="..."
                  />
                  <div className="card-body">
                    <h6 className="card-title">
                      <Link to={`./viewnotedetail/${item.noteIDX}`}>
                        {item.noteTitle}
                      </Link>
                    </h6>
                    <div className="card-subtitle text-muted font-size-sm mb-2">
                      {item.noteBook}
                    </div>
                  </div>
                  <div className="card-footer font-size-sm text-muted">
                    <span className="ml-1 mr-auto">{item.noteDate}</span>
                    <a
                      className="btn btn-link has-icon btn-xs bigger-130 text-danger"
                      onClick={() => onDelete(item.noteIDX)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-trash mr-1"
                      >
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                      </svg>
                      삭제
                    </a>
                  </div>
                </div>
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </>
  );
};

export default Note;
