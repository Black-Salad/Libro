import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ViewnoteDetail = (props) => {
  const [notes, setNotes] = useState([
    {
      idx: 1,
      noteUser: "test01",
      noteBook: "여행의 이유",
      noteTitle: "여행의 이유를 읽고나서",
      noteContents: "예~~~~~~~~~~~~~~~`여행~~~~~~~~`",
      noteDate: "2020-03-20",
    },
    {
      idx: 2,
      noteUser: "test01",
      noteBook: "점심메뉴",
      noteTitle: "점심은 뭘 먹어야 잘 먹었다 소문이 날까",
      noteContents: "잘모르겠따",
      noteDate: "2020-07-20",
    },
    {
      idx: 3,
      noteUser: "test01",
      noteBook: "점심메뉴",
      noteTitle: "점심은 뭘 먹어야 잘 먹었다 소문이 날까",
      noteContents: "잘모르겠따",
      noteDate: "2020-07-20",
    },
    {
      idx: 4,
      noteUser: "test01",
      noteBook: "점심메뉴",
      noteTitle: "점심은 뭘 먹어야 잘 먹었다 소문이 날까",
      noteContents: "잘모르겠따",
      noteDate: "2020-07-20",
    },
  ]);

  //select useState
  const [selectNote, setSelectNote] = useState({});

  //값 가져와서 selectNote에 값 설정
  useEffect(() => {
    notes.map((item) => {
      if (item.idx == props.idx)
        setSelectNote({
          idx: item.idx,
          noteUser: item.noteUser,
          noteBook: item.noteBook,
          noteTitle: item.noteTitle,
          noteContents: item.noteContents,
          noteDate: item.noteDate,
        });
    });
  });

  return (
    <div>
      {/* note contents */}
      <div className="card mb-3">
        <div className="card-body">
          <div className="row">
            <div className="col-sm-2">
              <h6 className="mb-0">제목</h6>
            </div>
            <div className="col-sm-10 text-secondary">
              {selectNote.noteTitle}
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-sm-2">
              <h6 className="mb-0">내용</h6>
            </div>
            <div className="col-sm-10 text-secondary">
              {selectNote.noteContents}
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
