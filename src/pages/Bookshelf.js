import React, { useState, useEffect } from "react";
import Books from "../components/common/Books";
import { ChevronRight } from "react-feather";
import BreadCrumbs from "../components/common/BreadCrumbs";
import { Link } from "react-router-dom";
import axios from "axios";
import Bookprofile from "../components/common/Bookprofile";

const Bookshelf = () => {
  // 임시 데이터
  const shelfUser = 2;

  // 보여줄 책 목록 저장 스테이트 * 3 (읽은 책, 읽는 중, 관심)
  const [didReads, setDidReads] = useState([]);
  const [readings, setReadings] = useState([]);
  const [stars, setStars] = useState([]);
  const [hasChanged, setHasChanged] = useState({ change: 0 });

  // AJAX
  useEffect(() => {
    const apiUrl1 = `http://localhost:8000/api/book/shelf/join/?user_id=${shelfUser}&shelf_state=1`;
    const apiUrl2 = `http://localhost:8000/api/book/shelf/join/?user_id=${shelfUser}&shelf_state=2`;
    const apiUrl3 = `http://localhost:8000/api/book/star/join/?user_id=${shelfUser}`;

    axios
      .get(apiUrl1)
      .then((response) => {
        setReadings(response.data);
      })
      .catch((response) => {
        console.error(response);
      });
    axios
      .get(apiUrl2)
      .then((response) => {
        setDidReads(response.data);
      })
      .catch((response) => {
        console.error(response);
      });
    axios
      .get(apiUrl3)
      .then((response) => {
        setStars(response.data);
      })
      .catch((response) => {
        console.error(response);
      });
  }, [hasChanged.change]);

  return (
    <div>
      <BreadCrumbs breads={[<Link to="/">My Bookshelf</Link>]} />

      <div>
        <div style={{ display: "flex" }}>
          <span>읽고 있는 책 </span>
          <span style={{ marginLeft: "auto" }}>
            <Link to="/bookshelfmore?kind=reading">
              more
              <ChevronRight />
            </Link>
          </span>
        </div>
        <Books list={readings} setHasChanged={setHasChanged}></Books>
      </div>
      <hr />
      <div>
        <div style={{ display: "flex" }}>
          <span>읽은 책 </span>
          <span style={{ marginLeft: "auto" }}>
            <Link to="/bookshelfmore?kind=finished">
              {/* <Link to="/bookshelfmore/finished"> */}
              more
              <ChevronRight />
            </Link>
          </span>
        </div>
        <Books list={didReads} setHasChanged={setHasChanged}></Books>
      </div>
      <hr />
      <div>
        <div style={{ display: "flex" }}>
          <span>관심 책 </span>
          <span style={{ marginLeft: "auto" }}>
            <Link to="/bookshelfmore?kind=interested">
              {/* <Link to="/bookshelfmore/interested"> */}
              more
              <ChevronRight />
            </Link>
          </span>
        </div>
        <Books list={stars} setHasChanged={setHasChanged}></Books>
      </div>
    </div>
  );
};

export default Bookshelf;
