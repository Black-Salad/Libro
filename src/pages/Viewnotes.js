import React, { useState } from "react";
import { Plus, Search, ChevronLeft } from "react-feather";
import { Link } from "react-router-dom";
import Note from "../components/common/Note";
import BreadCrumbs from "../components/common/BreadCrumbs";
import NoteSearch from "../components/common/NoteSearch";

const Viewnotes = () => {
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

  return (
    <div>
      <BreadCrumbs breads={["내 독서록"]} />

      {/* 글등록 및 검색 */}
      <NoteSearch />

      {/* 독서록리스트 */}
      <div className="row gutters-sm">
        {notes.map((item, index) => {
          return (
            <React.Fragment key={index}>
              <Note item={item} />
            </React.Fragment>
          );
        })}
      </div>

      {/* 페이징처리 */}
      <ul className="pagination justify-content-center mb-0">
        <li className="page-item disabled">
          <span className="page-link">Previous</span>
        </li>
        <li className="page-item active">
          <span className="page-link">1</span>
        </li>
        <li className="page-item">
          <a className="page-link" href="#">
            2
          </a>
        </li>
        <li className="page-item">
          <a className="page-link" href="#">
            3
          </a>
        </li>
        <li className="page-item">
          <a className="page-link" href="#">
            Next
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Viewnotes;
