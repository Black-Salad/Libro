import React, { useState, useEffect } from "react";
import BreadCrumbs from "../components/common/BreadCrumbs";
import { Link } from "react-router-dom";
import { Cookies } from "react-cookie";
import Bookprofile from "../components/common/Bookprofile";
import Layout from "../components/Layout";
import Books from "../components/common/Books";
import axios from "axios";
import { LIBRO_API_URL } from "../constants/config";

const BookshelfPage = ({ match }) => {
  // 임시 데이터
  const cookies = new Cookies();
  const loginUserId = cookies.get("loginUserId");
  const shelfUser =
    match.params.userIDX == undefined ? loginUserId : match.params.userIDX;

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

  const apiUrl1 = `${LIBRO_API_URL}/api/user/${shelfUser}/`;
  const [userInfo, setUserInfo] = useState({});
  useEffect(() => {
    axios.get(apiUrl1).then((response) => {
      setUserInfo(response.data);
    });
  }, []);

  return (
    <Layout>
      <BreadCrumbs
        breads={[<Link to="/"> {userInfo.user_name}의 책꽂이</Link>]}
      />
      <Books
        bKind="reading"
        shelfUser={shelfUser}
        onOpenModal={onOpenModal}
        modalState={modalState}
        profile={false}
      />
      <hr />
      <Books
        bKind="didRead"
        shelfUser={shelfUser}
        onOpenModal={onOpenModal}
        modalState={modalState}
        profile={false}
      />
      <hr />
      <Books
        bKind="star"
        shelfUser={shelfUser}
        onOpenModal={onOpenModal}
        modalState={modalState}
        profile={false}
      />
      <Bookprofile
        open={modalState}
        setModalState={setModalState}
        currentBook={currentBook}
      />
    </Layout>
  );
};

export default BookshelfPage;
