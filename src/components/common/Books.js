import React, { useState, useEffect } from "react";
import Bookprofile from "./Bookprofile";

const Books = (props) => {
  const { list, setHasChanged } = props;
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

  const bookList = list.map((book, index) => (
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
  ));

  return (
    <div>
      <ul className="list-group list-group-horizontal row">{bookList}</ul>
      <Bookprofile
        open={modalState.open}
        setModalState={setModalState}
        currentBook={currentBook}
        setHasChanged={setHasChanged}
      />
    </div>
  );
};
export default Books;
