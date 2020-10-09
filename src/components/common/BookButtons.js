import React, { useEffect, useState } from "react";
import axios from "axios";
import { Fab, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import StarIcon from "@material-ui/icons/Star";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import CheckIcon from "@material-ui/icons/Check";
import CreateIcon from "@material-ui/icons/Create";
import Popover from "@material-ui/core/Popover";
import { yellow } from "@material-ui/core/colors";
import { Chip } from "@material-ui/core";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { format } from "date-fns";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  gridRoot: {
    flexGrow: 1,
  },
  shelfBtns: {
    textAlign: "center",
    // padding: theme.spacing(2),
  },
  noteBtns: {
    textAlign: "right",
  },
}));

// String to Date Method
const dateParse = (dateStr) => {
  var y = dateStr.substr(0, 4);
  var m = dateStr.substr(5, 2);
  var d = dateStr.substr(8, 2);
  return new Date(y, m - 1, d);
};

const BookButtons = (props) => {
  const { loginUser, currentBook } = props;
  const [starBtn, setStarBtn] = useState({ exist: false });
  const [shelfStatus, setShelfStatus] = useState({
    exist: false,
    status: 0,
    shelf_id: null,
    start_date: null,
    end_date: null,
  });
  // DatePicker
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  // Popover
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const id = open ? anchorEl.name : undefined;
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  // style
  const classes = useStyles();

  // 버튼 세팅하기 위한 Ajax
  useEffect(() => {
    const starApiUrl = `http://localhost:8000/api/book/star/count/?user_id=${loginUser}&book_isbn=${currentBook.isbn}`;
    const shelfApiUrl = `http://localhost:8000/api/book/shelf/count/?user_id=${loginUser}&book_isbn=${currentBook.isbn}`;
    // star btn
    axios
      .get(starApiUrl)
      .then((response) => {
        if (response.data.length > 0) {
          setStarBtn({ exist: true });
        } else {
          setStarBtn({ exist: false });
        }
      })
      .catch((response) => {
        console.error(response);
      });
    // shelf relate btns
    axios
      .get(shelfApiUrl)
      .then((response) => {
        if (response.data.length > 0) {
          setShelfStatus({
            exist: true,
            status: response.data[0].shelf_state,
            shelf_id: response.data[0].shelf_id,
            start_date: response.data[0].start_date,
            end_date: response.data[0].end_date,
          });
        } else {
          setShelfStatus({
            exist: false,
            status: 0,
            shelf_id: null,
            start_date: null,
            end_date: null,
          });
        }
      })
      .catch((response) => {
        console.error(response);
      });
  }, []);

  // 관심 버튼 클릭 이벤트
  const onClickStar = () => {
    const starApiUrl = `http://localhost:8000/api/book/star/count/?user_id=${loginUser}&book_isbn=${currentBook.isbn}`;
    axios
      .get(starApiUrl)
      .then((response) => {
        // 이미 관심책에 추가되어 있는 경우
        if (response.data.length > 0) {
          axios
            .delete(
              `http://localhost:8000/api/book/star/${response.data[0].star_id}/`
            )
            .then((response) => {
              setStarBtn({ exist: false });
            })
            .catch((response) => {
              console.error(response);
            });
        }
        // 관심책에 없는 경우 -> book db에 존재 여부도 고려해야 함.
        else {
          // book db 확인
          axios
            .get(
              `http://localhost:8000/api/book/?book_isbn=${currentBook.isbn}`
            )
            .then((response) => {
              // book db에 책이 존재하면
              if (response.data.length > 0) {
                //관심 책에 추가
                axios
                  .post(`http://localhost:8000/api/book/star/`, {
                    book_isbn: currentBook.isbn,
                    user_id: loginUser,
                    book_id: response.data[0].book_id,
                  })
                  .then((response) => {
                    setStarBtn({ exist: true });
                  })
                  .catch((response) => {
                    console.error(response);
                  });
              } else {
                // book db에 없으면 추가.
                console.log("여기");
                axios
                  .post(`http://localhost:8000/api/book/`, {
                    book_title: currentBook.title,
                    book_author: currentBook.authors.join(", "),
                    book_publisher: currentBook.publisher,
                    book_img: currentBook.thumbnail,
                    book_desc: currentBook.contents,
                    book_url: currentBook.url,
                    book_isbn: currentBook.isbn,
                  })
                  .then((response) => {
                    console.log(response.data);
                    // 관심 책에 추가
                    axios
                      .post(`http://localhost:8000/api/book/star/`, {
                        book_isbn: response.data.book_isbn,
                        user_id: loginUser,
                        book_id: response.data.book_id,
                      })
                      .then((response) => {
                        setStarBtn({ exist: true });
                      })
                      .catch((response) => {
                        console.error(response);
                      });
                  })
                  .catch((response) => {
                    console.error(response);
                  });
              }
            })
            .catch((response) => {
              console.error(response);
            });
        }
      })
      .catch((response) => {
        console.error(response);
      });
  };

  const onClickRead = (e) => {
    // setAnchorEl(e.currentTarget);
    //  book db 확인
    axios
      .get(`http://localhost:8000/api/book/?book_isbn=${currentBook.isbn}`)
      .then((response) => {
        // book db에 책이 존재하면
        if (response.data.length > 0) {
          //읽는 중인 책에 추가
          axios
            .post(`http://localhost:8000/api/book/shelf/`, {
              book_isbn: currentBook.isbn,
              shelf_state: 1,
              start_date: format(startDate, "yyyy-MM-dd"), // 수정 필요
              end_date: "9999-12-31",
              user_id: loginUser,
              book_id: response.data[0].book_id,
            })
            .then((response) => {
              setShelfStatus({
                exist: true,
                status: 1,
                shelf_id: response.data.shelf_id,
                start_date: response.data.start_date,
                end_date: response.data.end_date,
              });
              handleClose();
            })
            .catch((response) => {
              console.error(response);
            });
        } else {
          // book db에 없으면 추가.
          axios
            .post(`http://localhost:8000/api/book/`, {
              book_title: currentBook.title,
              book_author: currentBook.authors.join(", "),
              book_publisher: currentBook.publisher,
              book_img: currentBook.thumbnail,
              book_desc: currentBook.contents,
              book_url: currentBook.url,
              book_isbn: currentBook.isbn,
            })
            .then((response) => {
              //읽는 중인 책에 추가
              console.log(response.data);
              axios
                .post(`http://localhost:8000/api/book/shelf/`, {
                  book_isbn: currentBook.isbn,
                  shelf_state: 1,
                  start_date: format(startDate, "yyyy-MM-dd"), // 수정 필요
                  end_date: "9999-12-31",
                  user_id: loginUser,
                  book_id: response.data.book_id,
                })
                .then((response) => {
                  setShelfStatus({
                    exist: true,
                    status: 1,
                    shelf_id: response.data.shelf_id,
                    start_date: response.data.start_date,
                    end_date: response.data.end_date,
                  });
                  handleClose();
                })
                .catch((response) => {
                  console.error(response);
                });
            })
            .catch((response) => {
              console.error(response);
            });
        }
      })
      .catch((response) => {
        console.error(response);
      });
  };

  const onClickFinish = (e) => {
    // setAnchorEl(e.currentTarget);
    if (shelfStatus.shelf_id !== null) {
      axios
        .patch(
          `http://localhost:8000/api/book/shelf/${shelfStatus.shelf_id}/`,
          {
            shelf_state: 2,
            end_date: format(endDate, "yyyy-MM-dd"),
          }
        )
        .then((response) => {
          setShelfStatus({
            ...shelfStatus,
            status: 2,
            start_date: response.data.start_date,
            end_date: response.data.end_date,
          });
          handleClose();
        })
        .catch((response) => {
          console.error(response);
        });
    }
  };

  const onClickRemove = () => {
    if (
      window.confirm(
        (shelfStatus.status == 1
          ? "읽는 중인 책입니다.\n"
          : "완독한 책입니다.\n") + "책꽂이에서 삭제하시겠습니까?"
      )
    ) {
      if (shelfStatus.shelf_id !== null) {
        axios
          .delete(
            `http://localhost:8000/api/book/shelf/${shelfStatus.shelf_id}/`
          )
          .then((response) => {
            setShelfStatus({
              exist: false,
              status: 0,
              shelf_id: null,
              start_date: null,
              end_date: null,
            });
          })
          .catch((response) => {
            console.error(response);
          });
      }
    }
  };
  return (
    <div>
      <div className={classes.root}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <div>
              {shelfStatus.status == 0 ? (
                <Chip
                  size="small"
                  label="+ 버튼을 눌러 읽기 시작"
                  color="default"
                />
              ) : (
                <Chip
                  size="small"
                  label={
                    shelfStatus.status == 1
                      ? `${shelfStatus.start_date} 부터 읽는 중 🏃‍♀️`
                      : `${shelfStatus.start_date} ~ ${shelfStatus.end_date} 완독👍`
                  }
                  color={shelfStatus.status == 1 ? "secondary" : "primary"}
                  // onClick={shelfStatus.status == 1 ? onC}
                />
              )}
            </div>
          </Grid>
          <Grid item xs={4}>
            <Fab
              size="small"
              color="default"
              title={starBtn.exist ? "관심 책에서 삭제" : "관심 책에 추가"}
              onClick={() => onClickStar()}
            >
              <StarIcon style={starBtn.exist ? { color: yellow[300] } : {}} />
            </Fab>
          </Grid>
          <Grid item xs={4} className={classes.shelfBtns}>
            {shelfStatus.status == 1 ? (
              <Fab
                aria-describedby="FinishPopover"
                size="small"
                color="primary"
                title="완독했어요"
                onClick={(e) => handleClick(e)}
              >
                <CheckIcon />
              </Fab>
            ) : null}
            {shelfStatus.exist ? (
              <Fab
                size="small"
                color="default"
                title="책꽂이에서 삭제"
                onClick={() => onClickRemove()}
              >
                <RemoveIcon />
              </Fab>
            ) : (
              <>
                <Fab
                  aria-describedby="startPopover"
                  size="small"
                  color="secondary"
                  title="이 책 읽기"
                  onClick={(e) => handleClick(e)}
                >
                  <AddIcon />
                </Fab>
              </>
            )}
          </Grid>
          <Grid item xs={4} className={classes.noteBtns}>
            <Fab size="small" color="default" title="독서록 쓰기">
              <CreateIcon />
            </Fab>
          </Grid>
        </Grid>
      </div>

      <div>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          // style={{ zIndex: 1100, margin: "10px" }}
          // disablePortal
        >
          <div style={{ margin: "10px" }}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              {shelfStatus.status == 0 ? (
                <DatePicker
                  autoOk
                  disableFuture
                  format="yyyy년 MM월 dd일"
                  label={"독서 시작 날짜"}
                  maxDate={
                    shelfStatus.end_date !== null
                      ? dateParse(shelfStatus.end_date)
                      : new Date()
                  }
                  views={["year", "month", "date"]}
                  value={startDate}
                  onChange={setStartDate}
                />
              ) : (
                <DatePicker
                  autoOk
                  format="yyyy년 MM월 dd일"
                  label={"완독한 날짜"}
                  minDate={
                    shelfStatus.start_date !== null
                      ? dateParse(shelfStatus.start_date)
                      : new Date()
                  }
                  maxDate={new Date()}
                  views={["year", "month", "date"]}
                  value={endDate}
                  onChange={setEndDate}
                />
              )}
            </MuiPickersUtilsProvider>
            <div>
              <Button
                variant="contained"
                color={shelfStatus.status == 0 ? "secondary" : "primary"}
                style={{ marginTop: "10px" }}
                onClick={
                  shelfStatus.status == 0
                    ? (e) => onClickRead(e)
                    : (e) => onClickFinish(e)
                }
              >
                등록
              </Button>
            </div>
          </div>
        </Popover>
      </div>
    </div>
  );
};

export default BookButtons;
