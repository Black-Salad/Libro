import React, { useState, useEffect } from "react";
import Bookprofile from "./Bookprofile";

const Books = (props) => {
  const [myBooks, setMyBooks] = useState([
    {
      idx: 1,
      kind: "reading",
      title: "아가미",
      authors: ["구병모"],
      isbn: "1162203390 9791162203392",
      thumbnail: "/img/book_thumbnail/아가미.jpg",
    },
    {
      idx: 2,
      kind: "finished",
      title: "여행의 이유",
      authors: ["김영하"],
      isbn: "8936433695 9788936433697",
      thumbnail: "/img/book_thumbnail/여행의이유.jpg",
    },
    {
      idx: 3,
      kind: "finished",
      title: "파과",
      authors: ["구병모"],
      isbn: "1162203625 9791162203620",
      thumbnail: "/img/book_thumbnail/파과.jpg",
    },
    {
      idx: 4,
      kind: "interested",
      title: "돈만 모으는 여자는 위험하다",
      authors: ["정은길"],
      isbn: "8960869031 9788960869035",
      thumbnail: "/img/book_thumbnail/돈만모으는여자는위험하다.jpg",
    },
    {
      idx: 5,
      kind: "interested",
      title: "젠더는 해롭다",
      authors: ["쉴라 제프리스"],
      isbn: "1190158027 9791190158022",
      thumbnail: "/img/book_thumbnail/젠더는해롭다.jpg",
    },
    {
      idx: 6,
      kind: "finished",
      title: "글쓰기 특강",
      authors: ["유시민"],
      isbn: "8965133521 9788965133520",
      thumbnail: "/img/book_thumbnail/글쓰기특강.jpg",
    },
  ]);
  const [displayBooks, setDisplayBooks] = useState([]);
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
  });

  const onOpenModal = (book) => {
    setModalState({ open: true });
    setCurrentBook(book);
  };

  useEffect(() => {
    let filteredList = myBooks.filter((book) => book.kind === props.kind);
    setDisplayBooks(filteredList);
  }, []);

  const bookList = displayBooks.map((book, index) => (
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
        src={book.thumbnail}
        style={{ maxWidth: "100%", boxShadow: "1px 1px 1px 1px grey" }}
        onClick={() => onOpenModal(book)}
      />
      <br />
      <div className="text-secondary" style={{ marginTop: "10px" }}>
        {book.title}
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
      />
    </div>
  );
};
export default Books;
