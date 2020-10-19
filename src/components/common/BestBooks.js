import React, { useState, useEffect } from "react";
import axios from "axios";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import { LIBRO_API_URL } from "../../constants/config";
import Bookprofile from "./Bookprofile";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(1),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
    textAlign: "center",
    verticalAlign: "center",
  },
  ulArea: {
    width: "100%",
    margin: "0 auto",
  },
  liArea: {
    textAlign: "center",
    padding: "2px 5px !important",
    background: "none",
    border: "none",
  },
  bImage: {
    width: "100%",
    border: "1px solid lightgrey",
    boxShadow: "2px 2px 4px #999",
    cursor: "pointer",
    maxWidth: "120px",
  },
  bTitle: {
    margin: "10px 0",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    fontSize: 14,
  },
}));

const BestBooks = () => {
  const classes = useStyles();

  // 모달 스테이트
  const [modalState, setModalState] = useState(false);
  const [changed, setChanged] = useState(false);
  // 현재 선택한 책 정보 저장하는 스테이트 (책 상세 모달용)
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
      idx: book.book_id,
      title: book.book_title,
      authors: book.book_author.split(","),
      isbn: book.book_isbn,
      thumbnail: book.book_img,
      publisher: book.book_publisher,
      contents: book.book_desc,
      url: book.book_url,
    });
    console.log(currentBook);
  };

  const [bookList, setBookList] = useState([]);
  useEffect(() => {
    axios.get(`${LIBRO_API_URL}/api/book/star/navigate/`).then((res) => {
      setBookList(res.data);
    });
  }, []);
  return (
    <div>
      <Paper className={classes.paper}>
        {bookList.length == 0 ? (
          <div style={{ color: "grey", margin: "20px auto" }}>
            등록된 인기 책이 없습니다.
            <br />
          </div>
        ) : (
          <ul
            className={`${classes.ulArea} list-group list-group-horizontal row`}
          >
            {bookList.map((book, index) => (
              <li
                key={index}
                className={`${classes.liArea} list-group-item col-4 col-xs-4 col-sm-3 col-md-2 col-xl-2`}
              >
                <img
                  alt=""
                  className={classes.bImage}
                  src={
                    book.book_img == ""
                      ? LIBRO_API_URL + "/img/unnamed.png"
                      : book.book_img
                  }
                  onClick={() => onOpenModal(book)}
                />
                <br />
                <div className={`${classes.bTitle} text-secondary`}>
                  {book.book_title}
                </div>
              </li>
            ))}
          </ul>
        )}
      </Paper>
      <Bookprofile
        open={modalState}
        setModalState={setModalState}
        currentBook={currentBook}
        changed={changed}
        setChanged={setChanged}
      />
    </div>
  );
};

export default BestBooks;
