import React, { useState, useEffect } from "react";
import BreadCrumbs from "../components/common/BreadCrumbs";
import { Link } from "react-router-dom";
import queryString from "query-string";
import { Cookies } from "react-cookie";
import axios from "axios";
import Bookprofile from "../components/common/Bookprofile";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import Paper from "@material-ui/core/Paper";
import Layout from "../components/Layout";
import { LIBRO_API_URL } from "../constants/config";
import BooksMore from "../components/common/BooksMore";
import BooksMoreDidRead from "../components/common/BooksMoreDidRead";

const BookshelfMore = ({ location, match }) => {
  // 임시 데이터
  const cookies = new Cookies();
  const loginUserId = cookies.get("loginUserId");
  const shelfUser =
    match.params.userIDX == undefined ? loginUserId : match.params.userIDX;
  // const query = queryString.parse(location.search);
  const kind = match.params.kind;

  let kindDisplayStr = "";
  let apiUrl = "";

  switch (kind) {
    case "reading":
      kindDisplayStr = " 님이 읽고 있는 책";
      apiUrl = `${LIBRO_API_URL}/api/book/shelf/join/?user_id=${shelfUser}&shelf_state=1`;
      break;
    case "didRead":
      kindDisplayStr = " 님이 읽은 책";
      apiUrl = `${LIBRO_API_URL}/api/book/shelf/join/?user_id=${shelfUser}&shelf_state=2`;
      break;
    case "star":
      kindDisplayStr = " 님의 관심 책";
      apiUrl = `${LIBRO_API_URL}/api/book/star/join/?user_id=${shelfUser}`;
      break;
    default:
      kindDisplayStr = "";
  }
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

  // 사용자 이름 가져오기
  const apiUrl1 = `${LIBRO_API_URL}/api/user/${shelfUser}/`;
  const [userInfo, setUserInfo] = useState({});
  const [changed, setChanged] = useState(false);

  useEffect(() => {
    axios.get(apiUrl1).then((response) => {
      setUserInfo(response.data);
    });
  }, []);

  return (
    <Layout>
      <BreadCrumbs
        breads={[
          // <Link to={`/bookshelf/${shelfUser}`}>
          //   {userInfo.user_name} 님의 책꽂이
          // </Link>,
          <>{userInfo.user_name + kindDisplayStr}</>,
        ]}
      />
      {kind !== "didRead" ? (
        <BooksMore
          bKind={kind}
          shelfUser={shelfUser}
          onOpenModal={onOpenModal}
          modalState={modalState}
          changed={changed}
        />
      ) : (
        <BooksMoreDidRead
          shelfUser={shelfUser}
          onOpenModal={onOpenModal}
          modalState={modalState}
          changed={changed}
        />
      )}

      <Bookprofile
        open={modalState}
        setModalState={setModalState}
        currentBook={currentBook}
        changed={changed}
        setChanged={setChanged}
      />
    </Layout>
  );
};

export default BookshelfMore;
