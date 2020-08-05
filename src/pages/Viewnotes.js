import React from "react";
import Note from "../components/common/Note";
import BreadCrumbs from "../components/common/BreadCrumbs";
import { Link } from "react-router-dom";

const Viewnotes = () => {
  return (
    <>
      <BreadCrumbs breads={[<Link to="/viewnotes">내 독서록</Link>]} />

      {/* 글등록 및 검색 */}
      {/* <NoteSearch /> */}

      {/* 독서록리스트 */}
      <Note />

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
    </>
  );
};

export default Viewnotes;
