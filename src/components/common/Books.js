import React, { useState } from "react";

const Books = (props) => {
  const [booksReading, setBooksReading] = useState([
    {
      b_id: 1,
      b_title: "아가미",
      b_img: "/img/book_thumbnail/아가미.jpg",
    },
  ]);
  const [booksFinished, setBooksFinished] = useState([
    {
      b_id: 1,
      b_title: "여행의 이유",
      b_img: "/img/book_thumbnail/여행의이유.jpg",
    },
    {
      b_id: 2,
      b_title: "글쓰기 특강",
      b_img: "/img/book_thumbnail/글쓰기특강.jpg",
    },
    {
      b_id: 3,
      b_title: "파과",
      b_img: "/img/book_thumbnail/파과.jpg",
    },
  ]);
  const [booksInterested, setBooksInterested] = useState([
    {
      b_id: 1,
      b_title: "돈만 모으는 여자는 위험하다",
      b_img: "/img/book_thumbnail/돈만모으는여자는위험하다.jpg",
    },
    {
      b_id: 2,
      b_title: "젠더는 해롭다",
      b_img: "/img/book_thumbnail/젠더는해롭다.jpg",
    },
  ]);

  // 읽고 있는 책 바인딩
  if (props.kind === "reading") {
    const bookList = booksReading.map((book, index) => (
      <li
        key={index}
        className="list-group-item"
        style={{ textAlign: "center" }}
      >
        <img src={book.b_img} />
        <br />
        <div className="text-secondary" style={{ marginTop: "10px" }}>
          {book.b_title}
        </div>
      </li>
    ));
    return <ul className="list-group list-group-horizontal">{bookList}</ul>;
  }
  // 읽은 책 바인딩
  else if (props.kind === "finished") {
    const bookList = booksFinished.map((book, index) => (
      <li
        key={index}
        className="list-group-item"
        style={{ textAlign: "center" }}
      >
        <img src={book.b_img} />
        <br />
        <div className="text-secondary" style={{ marginTop: "10px" }}>
          {book.b_title}
        </div>
      </li>
    ));
    return <ul className="list-group list-group-horizontal">{bookList}</ul>;
  }
  // 관심 책 바인딩
  else if (props.kind === "interested") {
    const bookList = booksInterested.map((book, index) => (
      <li
        key={index}
        className="list-group-item"
        style={{ textAlign: "center" }}
      >
        <img src={book.b_img} />
        <br />
        <div className="text-secondary" style={{ marginTop: "10px" }}>
          {book.b_title}
        </div>
      </li>
    ));
    return <ul className="list-group list-group-horizontal">{bookList}</ul>;
  } else {
    return <div>잘못된 경로입니다.</div>;
  }
};

export default Books;
