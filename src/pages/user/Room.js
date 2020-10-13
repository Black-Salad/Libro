import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import BreadCrumbs from "../../components/common/BreadCrumbs";
import Note from "../../components/note/Note";
import RoomProfile from "../../components/user/RoomProfile";
import Bookprofile from "../../components/common/Bookprofile";

import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Cookies } from "react-cookie";
import axios from "axios";
import { ChevronRight } from "react-feather";

const Room = ({ match }) => {
  let history = useHistory();
  const cookies = new Cookies();
  const loginUserId = cookies.get("loginUserId");
  const shelfUser = match.params.userIDX;

  // 보여줄 책 목록 저장 스테이트 * 3 (읽은 책, 읽는 중, 관심)
  const [didReads, setDidReads] = useState([]);
  const [readings, setReadings] = useState([]);
  const [stars, setStars] = useState([]);
  // 모달 팝업 스테이트
  const [modalState, setModalState] = useState({ open: false });
  // 현재 선택한 책 정보 저장하는 스테이트
  const [currentBook, setCurrentBook] = useState({
    idx: 0,
    kind: "",
    title: "",
    authors: [""],
    isbn: "",
    thumbnail: "",
    publisher: "",
    contents: "",
    url: "",
  });

  // 모달 팝업 오픈 이벤트
  const onOpenModal = (book) => {
    setModalState({ open: true });
    setCurrentBook({
      idx: book.book_id.book_id,
      title: book.book_id.book_title,
      authors: book.book_id.book_author.split(","),
      isbn: book.book_id.book_isbn,
      thumbnail: book.book_id.book_img,
      publisher: book.book_id.book_publisher,
      contents: book.book_id.book_desc,
      url: book.book_id.book_url,
    });
  };

  // AJAX
  useEffect(() => {
    const apiUrl1 = `http://localhost:8000/api/book/shelf/join/?user_id=${shelfUser}&shelf_state=1`;
    const apiUrl2 = `http://localhost:8000/api/book/shelf/join/?user_id=${shelfUser}&shelf_state=2`;
    const apiUrl3 = `http://localhost:8000/api/book/star/join/?user_id=${shelfUser}`;
    const apiUrl4 = `http://localhost:8000/api/user/${shelfUser}/`;

    axios.get(apiUrl1).then((response) => {
      setReadings(response.data);
    });

    axios.get(apiUrl2).then((response) => {
      setDidReads(response.data);
    });

    axios.get(apiUrl3).then((response) => {
      setStars(response.data);
    });

    axios
      .get(apiUrl4)
      .then((response) => {
        if (response.data.user_state === false) {
          alert("탈퇴한 계정입니다.");
          history.go(-1);
        }
      })
      .catch(() => {
        alert("잘못된 접근입니다.");
        history.go(-1);
      });
  }, [modalState.open]);

  return (
    <Layout>
      <BreadCrumbs
        breads={[<Link to={`/room/${match.params.userIDX}`}>Room</Link>]}
      />

      <RoomProfile userIDX={match.params.userIDX} />

      {/* 읽고 있는 책  */}
      <section>
        <div style={{ display: "flex" }}>
          <span>읽고 있는 책 </span>
          <span style={{ marginLeft: "auto" }}>
            <Link to="/bookshelfmore?kind=reading">
              more
              <ChevronRight />
            </Link>
          </span>
        </div>
        {readings.length == 0 ? (
          <div style={{ height: 80, textAlign: "center" }}>
            <div style={{ marginTop: 20, color: "grey" }}>
              읽고 있는 책이 없습니다.
              <br />
              <Link to="/searchbooks">책 탐색하러 이동</Link>
            </div>
          </div>
        ) : (
          <ul className="list-group list-group-horizontal row">
            {readings.map((book, index) => (
              <li
                key={index}
                className="list-group-item col-4 col-xs-4 col-sm-3 col-md-2 col-xl-2"
                style={{
                  textAlign: "center",
                  padding: "3%",
                  background: "none",
                  border: "none",
                }}
                // style={{ textAlign: "center", background: "none", border: "none" }}
              >
                <img
                  alt=""
                  src={book.book_id.book_img}
                  style={{
                    maxWidth: "100%",
                    boxShadow: "1px 1px 1px 1px grey",
                  }}
                  onClick={() => onOpenModal(book)}
                />
                <br />
                <div
                  className="text-secondary font-size-sm"
                  style={{ marginTop: "10px" }}
                >
                  {book.book_id.book_title}
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <Bookprofile
        open={modalState.open}
        setModalState={setModalState}
        currentBook={currentBook}
      />

      <hr />

      {/* 독서록 */}
      <section>
        <p className="font-size-m">독서록</p>
        <Note userIDX={match.params.userIDX} />
      </section>
    </Layout>
  );
};

export default Room;
