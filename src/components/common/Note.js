import React, { useState } from "react";
import { Plus, Search, ChevronLeft } from "react-feather";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteNote, searchNote } from "../../modules/note";

const Note = () => {
  const dispatch = useDispatch();

  //--------------------- 삭제 ----------------------------------------------
  const onDelete = (noteIDX) => {
    dispatch(deleteNote(noteIDX));
  };

  //--------------------- 검색( 추후 백엔드쪽개발, 그냥 구현만 해놓음 )----------------------------------------------
  window.onload = () => {
    document.getElementsByClassName("gutters-sm")[1].style.display = "none";
  };

  const onKeyPressSearch = (e) => {
    if (e.key === "Enter") {
      //e.chardCode === 13
      dispatch(searchNote(e.target.value));
      document.getElementsByClassName("gutters-sm")[0].style.display = "none";
      document.getElementsByClassName("gutters-sm")[1].style.display = "flex";
    }
  };

  const notes = useSelector((state) => state.note.notes);
  const searchNotes = useSelector((state) => state.note.searchNotes);

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
