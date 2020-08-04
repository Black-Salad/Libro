import React from "react";
import BreadCrumbs from "../components/common/BreadCrumbs";
import { Link } from "react-router-dom";
import queryString from "query-string";
import Books from "../components/common/Books";

const BookshelfMore = ({ location, match }) => {
  const query = queryString.parse(location.search);
  const { kind } = query;
  let kindDisplayStr = "";
  switch (kind) {
    case "reading":
      kindDisplayStr = "읽고 있는 책";
      break;
    case "finished":
      kindDisplayStr = "읽은 책";
      break;
    case "interested":
      kindDisplayStr = "관심 책";
      break;
    default:
      kindDisplayStr = "";
  }

  // ====================== 삭제 기능 추가 필요 ======================
  return (
    <div>
      <BreadCrumbs
        breads={[
          <Link to="/">My Bookshelf</Link>,
          <Link to={`/bookshelfmore?kind=${kind}`}>{kindDisplayStr}</Link>,
        ]}
      />
      <div>
        <div style={{ display: "flex" }}>
          <Link to={`/bookshelfmore?kind=${kind}`}>
            <span>{kindDisplayStr}</span>
          </Link>
        </div>
        <Books kind={kind}></Books>
      </div>
    </div>
  );
};

export default BookshelfMore;
