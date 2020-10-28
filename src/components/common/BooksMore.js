import React, { useState, useEffect } from "react";
import axios from "axios";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import { LIBRO_API_URL } from "../../constants/config";
import { Button } from "@material-ui/core";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";

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

const BooksMore = ({ bKind, shelfUser, onOpenModal, modalState, changed }) => {
  const classes = useStyles();
  const [bookList, setBookList] = useState([]);
  const [nextUrl, setNextUrl] = useState("");
  let apiUrl = "";
  // eslint-disable-next-line default-case
  switch (bKind) {
    case "reading":
      apiUrl = `${LIBRO_API_URL}/api/book/shelf/join/?user_id=${shelfUser}&shelf_state=1`;
      break;
    case "didRead":
      apiUrl = `${LIBRO_API_URL}/api/book/shelf/join/?user_id=${shelfUser}&shelf_state=2`;
      break;
    case "star":
      apiUrl = `${LIBRO_API_URL}/api/book/star/join/?user_id=${shelfUser}`;
      break;
  }

  useEffect(() => {
    axios
      .get(apiUrl)
      .then((res) => {
        // console.log(res.data);
        setBookList(res.data.results);
        setNextUrl(res.data.next);
      })
      .catch((res) => {
        console.error(res);
      });
  }, [changed, shelfUser]);

  const onClickMore = () => {
    axios
      .get(nextUrl)
      .then((response) => {
        // console.log("more", response.data);
        setBookList([...bookList, ...response.data.results]);
        setNextUrl(response.data.next);
      })
      .catch((response) => {
        console.error(response);
      });
  };

  return (
    <div>
      <Paper className={classes.paper}>
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
        {nextUrl !== null ? (
          <Button
            fullWidth
            className="text-secondary"
            startIcon={<MoreHorizIcon />}
            onClick={() => onClickMore()}
          >
            더보기
          </Button>
        ) : null}
      </Paper>
    </div>
  );
};
export default BooksMore;
