import React, { useState, useEffect } from "react";
import { Plus, Search, ChevronLeft } from "react-feather";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import Moment from "react-moment";

const Note = () => {
  let history = useHistory();

  const loginUserId = 1;
  const loginUserName = "test01";
  const loginUserEmail = "test01@naver.com";

  const [notes, setNotes] = useState([]);

  //값 가져와서 setNotes
  useEffect(() => {
    const apiUrl = `http://localhost:8000/api/note/?user_id=${loginUserId}`;
    axios
      .get(apiUrl)
      .then((response) => {
        console.log("notes Data", response);
        setNotes(response.data);
      })
      .catch((response) => {
        console.error(response);
      });
  }, []);

  //삭제
  const onDelete = (noteIDX) => {
    const apiUrl = `http://localhost:8000/api/note/${noteIDX}/`;
    if (window.confirm("해당 독서록을 삭제하시겠습니까?")) {
      axios
        .patch(apiUrl, { note_state: false })
        .then((response) => {
          console.log("note delete Data", response);
          alert("삭제완료");
          history.go(0);
        })
        .catch((response) => {
          console.error(response);
        });
    }
  };

  //검색
  const onKeyPressSearch = (e) => {
    if (e.key === "Enter") {
      // e.chardCode === 13
      alert(e.target.value);
      const noteTitle = e.target.value;
      // const apiUrl = `http://localhost:8000/api/note/?note_title=${noteTitle}`;
      // axios
      //   .get(apiUrl)
      //   .then((response) => {
      //     console.log("notes Data", response);
      //     setNotes(response.data);
      //   })
      //   .catch((response) => {
      //     console.error(response);
      //   });
    }
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
            >
              <ChevronLeft />
            </button>
            <input
              type="text"
              className="form-control form-control-sm bg-gray-200 border-gray-200"
              placeholder="독서록제목"
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
                      <Link to={`./viewnotedetail/${item.note_id}`}>
                        {item.note_title}
                      </Link>
                    </h6>
                    <div className="card-subtitle text-muted font-size-sm mb-2">
                      {item.book_id}
                    </div>
                  </div>
                  <div className="card-footer font-size-sm text-muted">
                    <span className="ml-1 mr-auto">
                      <Moment format={"YYYY/MM/DD"}>{item.note_date}</Moment>
                    </span>
                    <span
                      className="btn btn-link has-icon btn-xs bigger-130 text-danger"
                      onClick={() => onDelete(item.note_id)}
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
                    </span>
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
