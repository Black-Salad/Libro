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

const BookshelfMore = ({ location, match }) => {
  // 임시 데이터
  const cookies = new Cookies();
  const loginUserId = cookies.get("loginUserId");
  const shelfUser = loginUserId;

  const query = queryString.parse(location.search);
  const { kind } = query;

  let kindDisplayStr = "";
  let apiUrl = "";

  switch (kind) {
    case "reading":
      kindDisplayStr = "읽고 있는 책";
      apiUrl = `${LIBRO_API_URL}/api/book/shelf/join/?user_id=${shelfUser}&shelf_state=1`;
      break;
    case "finished":
      kindDisplayStr = "읽은 책";
      apiUrl = `${LIBRO_API_URL}/api/book/shelf/join/?user_id=${shelfUser}&shelf_state=2`;
      break;
    case "interested":
      kindDisplayStr = "관심 책";
      apiUrl = `${LIBRO_API_URL}/api/book/star/join/?user_id=${shelfUser}`;
      break;
    default:
      kindDisplayStr = "";
  }

  const [booklist, setBooklist] = useState([]);
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

  // DatePicker
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  useEffect(() => {
    axios
      .get(apiUrl)
      .then((response) => {
        setBooklist(response.data);
      })
      .catch((response) => {
        console.error(response);
      });
  }, [modalState.open]);

  return (
    <Layout>
      <BreadCrumbs
        breads={[
          <Link to="/">My Bookshelf</Link>,
          <Link to={`/bookshelfmore?kind=${kind}`}>{kindDisplayStr}</Link>,
        ]}
      />
      <div>
        <div style={{ display: "flex" }}>
          <span>{kindDisplayStr}</span>
        </div>
        <div style={{ marginTop: 15 }}>
          <Paper>
            기간 선택
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DatePicker
                autoOk
                disableFuture
                format="yyyy년 MM월 dd일"
                label={"독서 시작 날짜"}
                maxDate={new Date()}
                views={["year", "month", "date"]}
                value={startDate}
                onChange={setStartDate}
                style={{ width: 160 }}
              />
              ~
              <DatePicker
                autoOk
                format="yyyy년 MM월 dd일"
                label={"완독한 날짜"}
                minDate={startDate}
                maxDate={new Date()}
                views={["year", "month", "date"]}
                value={endDate}
                onChange={setEndDate}
                style={{ width: 160 }}
              />
            </MuiPickersUtilsProvider>
          </Paper>
        </div>
        <ul className="list-group list-group-horizontal row">
          {booklist.map((book, index) => (
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
                src={book.book_id.book_img}
                style={{ maxWidth: "100%", boxShadow: "1px 1px 1px 1px grey" }}
                onClick={() => onOpenModal(book)}
              />
              <br />
              <div className="text-secondary" style={{ marginTop: "10px" }}>
                {book.book_id.book_title}
              </div>
            </li>
          ))}
        </ul>
      </div>
      <Bookprofile
        open={modalState.open}
        setModalState={setModalState}
        currentBook={currentBook}
      />
    </Layout>
  );
};

export default BookshelfMore;
