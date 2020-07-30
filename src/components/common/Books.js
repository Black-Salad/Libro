import React, { useState, useEffect } from "react";

const Books = (props) => {
  const [myBooks, setMyBooks] = useState([
    {
      b_id: 1,
      b_state: "reading",
      b_title: "아가미",
      b_img: "/img/book_thumbnail/아가미.jpg",
    },
    {
      b_id: 2,
      b_state: "finished",
      b_title: "여행의이유",
      b_img: "/img/book_thumbnail/여행의이유.jpg",
    },
    {
      b_id: 3,
      b_state: "finished",
      b_title: "파과",
      b_img: "/img/book_thumbnail/파과.jpg",
    },
    {
      b_id: 4,
      b_state: "interested",
      b_title: "돈만 모으는 여자는 위험하다",
      b_img: "/img/book_thumbnail/돈만모으는여자는위험하다.jpg",
    },
    {
      b_id: 5,
      b_state: "interested",
      b_title: "젠더는 해롭다",
      b_img: "/img/book_thumbnail/젠더는해롭다.jpg",
    },
    {
      b_id: 6,
      b_state: "finished",
      b_title: "글쓰기 특강",
      b_img: "/img/book_thumbnail/글쓰기특강.jpg",
    },
  ]);
  const [displayBooks, setDisplayBooks] = useState([]);

  useEffect(() => {
    let filteredList = myBooks.filter((book) => book.b_state === props.kind);
    setDisplayBooks(filteredList);
  }, []);

  const bookList = displayBooks.map((book, index) => (
    <li key={index} className="list-group-item" style={{ textAlign: "center" }}>
      <img src={book.b_img} />
      <br />
      <div className="text-secondary" style={{ marginTop: "10px" }}>
        {book.b_title}
      </div>
    </li>
  ));

  return <ul className="list-group list-group-horizontal">{bookList}</ul>;
};
export default Books;
