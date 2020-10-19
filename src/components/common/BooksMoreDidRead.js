import React, { useState, useEffect } from "react";
import axios from "axios";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import { LIBRO_API_URL } from "../../constants/config";
import { Button } from "@material-ui/core";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { format } from "date-fns";
import SearchIcon from "@material-ui/icons/Search";

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
  datepick: {
    // width: 120,
    margin: "0px 3px",
  },
}));

const BooksMoreDidRead = ({ shelfUser, onOpenModal, modalState, changed }) => {
  const classes = useStyles();
  const [bookList, setBookList] = useState([]);
  const [nextUrl, setNextUrl] = useState("");
  const [endDate, setEndDate] = useState(new Date());
  const Today = new Date();
  const [startDate, setStartDate] = useState(
    Today.setMonth(Today.getMonth() - 1)
  ); // 한달 전으로 설정

  const apiUrl = `${LIBRO_API_URL}/api/book/shelf/datefilter/?user_id=${shelfUser}&shelf_state=2`;

  useEffect(() => {
    axios
      .get(
        apiUrl +
          `&start_date__gte=${format(
            startDate,
            "yyyy-MM-dd"
          )}&end_date__lte=${format(endDate, "yyyy-MM-dd")}`
      )
      .then((res) => {
        console.log(res.data);
        setBookList(res.data);
      })
      .catch((res) => {
        console.error(res);
      });
  }, [changed, shelfUser]);

  const onClickSearch = () => {
    axios
      .get(
        apiUrl +
          `&start_date__gte=${format(
            startDate,
            "yyyy-MM-dd"
          )}&end_date__lte=${format(endDate, "yyyy-MM-dd")}`
      )
      .then((res) => {
        console.log(res.data);
        setBookList(res.data);
      })
      .catch((res) => {
        console.error(res);
      });
  };

  return (
    <div>
      <div className="media">
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DatePicker
            className={`${classes.datepick} col-4  col-md-3 col-lg-3`}
            autoOk
            disableFuture
            format="yyyy-MM-dd"
            label={"독서 시작 날짜"}
            maxDate={endDate}
            views={["year", "month", "date"]}
            value={startDate}
            onChange={setStartDate}
          />
          <DatePicker
            className={`${classes.datepick} col-4 col-md-3 col-lg-3`}
            autoOk
            format="yyyy-MM-dd"
            label={"완독한 날짜"}
            minDate={startDate}
            maxDate={new Date()}
            views={["year", "month", "date"]}
            value={endDate}
            onChange={setEndDate}
          />
        </MuiPickersUtilsProvider>
        <div
          // className="col-4 col-md-6 col-lg-6"
          style={{
            textAlign: "right",
            width: "100%",
            paddingTop: 10,
          }}
        >
          <Button
            variant="contained"
            color="primary"
            style={{ textAlign: "right" }}
            onClick={() => onClickSearch()}
          >
            <SearchIcon />
            조회
          </Button>
        </div>
      </div>
      <Paper className={classes.paper}>
        {bookList.length === 0 ? (
          <div style={{ color: "grey", margin: "20px auto" }}>
            해당 기간에 읽은 책이 없습니다.
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
export default BooksMoreDidRead;
