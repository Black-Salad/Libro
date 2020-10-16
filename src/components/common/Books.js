import React, { useState, useEffect } from "react";
import { ChevronRight } from "react-feather";
import { Link } from "react-router-dom";
import axios from "axios";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import { LIBRO_API_URL } from "../../constants/config";
import { Cookies } from "react-cookie";

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

const Books = ({
  bKind,
  shelfUser,
  onOpenModal,
  modalState,
  profile,
  userName,
}) => {
  const classes = useStyles();
  const [bookList, setBookList] = useState([]);
  const [showMore, setShowMore] = useState(false);
  let bKindStr = "";
  let apiUrl = "";
  // eslint-disable-next-line default-case
  switch (bKind) {
    case "reading":
      bKindStr = "읽고 있는 책";
      apiUrl = `${LIBRO_API_URL}/api/book/shelf/join/?user_id=${shelfUser}&shelf_state=1`;
      break;
    case "didRead":
      bKindStr = "읽은 책";
      apiUrl = `${LIBRO_API_URL}/api/book/shelf/join/?user_id=${shelfUser}&shelf_state=2`;
      break;
    case "star":
      bKindStr = "관심 책";
      apiUrl = `${LIBRO_API_URL}/api/book/star/join/?user_id=${shelfUser}`;
      break;
  }

  const cookies = new Cookies();
  const loginUser = cookies.get("loginUserId");

  useEffect(() => {
    axios
      .get(apiUrl)
      .then((res) => {
        if (res.data.length > 6) {
          setShowMore(true);
        }
        setBookList(res.data.slice(0, 6));
      })
      .catch((res) => {
        console.error(res);
      });
  }, [modalState, shelfUser]);

  return (
    <div>
      <div className="text-secondary" style={{ display: "flex" }}>
        <span>{bKindStr}</span>
        {profile ? (
          <span style={{ marginLeft: "auto" }}>
            <Link to={`/bookshelf/${shelfUser}`}>
              {/* ******** 수정하기 ******** */}
              {userName}의 책꽂이
              <ChevronRight />
            </Link>
          </span>
        ) : showMore ? (
          <span style={{ marginLeft: "auto" }}>
            <Link to={`/`}>
              {/* ******** 수정하기 ******** */}
              more
              <ChevronRight />
            </Link>
          </span>
        ) : null}
      </div>
      <Paper className={classes.paper}>
        {bookList.length == 0 ? (
          <div style={{ color: "grey", margin: "20px auto" }}>
            책이 없습니다.😞
            <br />
            {profile || shelfUser !== loginUser ? null : bKind === "didRead" ? (
              <>어서 완독해보세요.🏃‍♀️</>
            ) : (
              <Link to="/searchbooks">책 탐색하러 이동</Link>
            )}
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
                    book.book_id.book_img == ""
                      ? LIBRO_API_URL + "/img/unnamed.png"
                      : book.book_id.book_img
                  }
                  onClick={() => onOpenModal(book)}
                />
                <br />
                <div className={`${classes.bTitle} text-secondary`}>
                  {book.book_id.book_title}
                </div>
              </li>
            ))}
          </ul>
        )}
      </Paper>
    </div>
  );
};
export default Books;
