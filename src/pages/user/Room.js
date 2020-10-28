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
import { LIBRO_API_URL } from "../../constants/config";
import Books from "../../components/common/Books";

const Room = ({ match }) => {
  let history = useHistory();
  const cookies = new Cookies();
  const loginUserId = cookies.get("loginUserId");
  const shelfUser = match.params.userIDX;

  const [changed, setChanged] = useState(false);

  // 모달 팝업 스테이트
  const [modalState, setModalState] = useState(false);
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
    setModalState(true);
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
  const [userName, setUserName] = useState();

  // AJAX
  useEffect(() => {
    const apiUrl4 = `${LIBRO_API_URL}/api/user/${shelfUser}/`;

    axios
      .get(apiUrl4)
      .then((response) => {
        // console.log(response);
        setUserName(response.data.user_name);
        if (response.data.user_state === false) {
          alert("탈퇴한 계정입니다.");
          history.go(-1);
        }
      })
      .catch(() => {
        alert("잘못된 접근입니다.");
        history.go(-1);
      });
  }, [shelfUser]);

  return (
    <Layout>
      <BreadCrumbs
        breads={[
          <Link to={`/room/${match.params.userIDX}`}>{userName}의 Room</Link>,
        ]}
      />

      <RoomProfile userIDX={match.params.userIDX} />
      <hr />
      {/* 읽고 있는 책  */}
      <section>
        <Books
          bKind="reading"
          shelfUser={shelfUser}
          userName={userName}
          onOpenModal={onOpenModal}
          modalState={modalState}
          profile={true}
          changed={changed}
        />
      </section>

      <Bookprofile
        open={modalState}
        setModalState={setModalState}
        currentBook={currentBook}
        changed={changed}
        setChanged={setChanged}
      />

      <hr />

      {/* 독서록 */}
      <section>
        <p className="font-size-m text-secondary">독서록</p>
        <Note userIDX={match.params.userIDX} />
      </section>
    </Layout>
  );
};

export default Room;
