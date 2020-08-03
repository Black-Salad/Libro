import React, { useState } from "react";
import { Plus, Search, ChevronLeft } from "react-feather";
import { Link } from "react-router-dom";
import Note from "../components/common/Note";
import BreadCrumbs from "../components/common/BreadCrumbs";
import NoteSearch from "../components/common/NoteSearch";

const Viewnotes = () => {
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
          <a className="page-link" href="">
            2
          </a>
        </li>
        <li className="page-item">
          <a className="page-link" href="">
            3
          </a>
        </li>
        <li className="page-item">
          <a className="page-link" href="">
            Next
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Viewnotes;
