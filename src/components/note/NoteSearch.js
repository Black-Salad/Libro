import React, { useState, useEffect, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import Moment from "react-moment";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { LIBRO_API_URL } from "../../constants/config";

import NoteLike from "./NoteLike";
import NoteDetail from "./NoteDetail";
import RemoveRedEyeOutlinedIcon from "@material-ui/icons/RemoveRedEyeOutlined";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import UserButton from "../common/UserButton";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(1),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
    textAlign: "center",
    verticalAlign: "center",
  },
  gridRoot: {
    flexGrow: 1,
    width: "100%",
    position: "relative",
    margin: "5px 0px",
  },
  viewBtn: {
    textAlign: "center",
    maxHeight: "100%",
  },
  contentBox: {
    color: "#585858",
    border: "1px solid lightgrey",
    boxShadow: "2px 2px 4px #BDBDBD",
  },
  bImage: {
    width: "100%",
    height: "100px",
    borderRadius: "3px",
    objectFit: "cover",
    cursor: "pointer",
  },
  titleArea: {
    padding: 10,
    paddingBottom: 0,
    fontSize: "14px",
  },
  rTitleArea: {
    width: "100%",
    display: "block",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    margin: 0,
  },
  subTitleArea: {
    marginTop: 3,
    color: "#A4A4A4",
    fontSize: "12px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  date: {
    paddingRight: "5px",
    fontSize: "12px",
    color: "#A4A4A4",
    textAlign: "right",
  },
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    marginBottom: "1rem",
    width: "100%",
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
}));

const NoteSearch = (props) => {
  let history = useHistory();
  const [notes, setNotes] = useState([]);
  const [modal, setModal] = useState({
    open: false,
    note_id: 0,
  });
  const [more, setMore] = useState({
    limit: 12,
    show: false,
  });
  const [nextUrl, setNextUrl] = useState(null);
  const [showMore, setShowMore] = useState(false);
  const refSearch = useRef(null);

  const apiUrl = `${LIBRO_API_URL}/api/book/?book_isbn=${props.bookISBN}`;
  const apiUrl1 = `${LIBRO_API_URL}/api/note/?note_private=true`;
  const apiUrl2 = `${LIBRO_API_URL}/api/note/search/?note_private=true&search=`;

  //값 가져와서 setNotes
  useEffect(() => {
    axios.get(apiUrl).then((response) => {
      // 해당 책의 book_id 가져오기 위해
      // console.log("res", response);
      // isbn을 넘겨받았다면 response.data.length=1, all이라면 0 / book_db에 저장된 적이 없다면 0임.
      if (response.data.length !== 0) {
        axios
          .get(apiUrl1 + `&book_id=${response.data[0].book_id}`)
          .then((response) => {
            setNotes(response.data.results);
            setNextUrl(response.data.next);
          });
      } else {
        if (props.bookISBN == "all") {
          axios.get(apiUrl1).then((response) => {
            setNotes(response.data.results);
            setNextUrl(response.data.next);
          });
        } else {
          setNotes([]);
        }
      }
    });
  }, []);

  // 엔터 검색
  const onKeyPressSearch = (e) => {
    if (e.key === "Enter") {
      // e.chardCode === 13
      const search = e.target.value;
      axios
        .get(apiUrl2 + search)
        .then((response) => {
          setNotes(response.data.results);
          setNextUrl(response.data.next);
        })
        .catch((response) => {
          console.error(response);
        });
    }
  };

  // 클릭 검색
  const onClickSearch = () => {
    const search = encodeURIComponent(refSearch.current.value);
    axios
      .get(apiUrl2 + search)
      .then((response) => {
        setNotes(response.data.results);
        setNextUrl(response.data.next);
      })
      .catch((response) => {
        console.error(response);
      });
  };

  const onClickMore = () => {
    axios
      .get(nextUrl)
      .then((response) => {
        // console.log("more", response.data);
        setNotes([...notes, ...response.data.results]);
        setNextUrl(response.data.next);
      })
      .catch((response) => {
        console.error(response);
      });
  };

  //모달창
  const openModal = (noteIDX) => {
    const popupWidth = 500;
    const popupHeight = 700;
    const popupX = document.body.offsetWidth / 2 - popupWidth / 2;
    const popupY = window.screen.height / 2 - popupHeight / 2;
    const url = `/viewnotedetail/${noteIDX}`;
    const options = `top=${popupY}, left=${popupX}, width=${popupWidth}, height=${popupHeight}, status=no, menubar=no, toolbar=no, resizable=no`;
    window.open(url, "독서록", options);

    // setModal({ open: true, note_id: noteIDX });
  };

  const closeModal = () => {
    setModal({ ...modal, open: false });
  };

  const classes = useStyles();

  return (
    <>
      <Paper className={classes.root}>
        <InputBase
          className={classes.input}
          placeholder="책제목 / 독서록 제목 / 독서록 내용"
          onKeyPress={(e) => onKeyPressSearch(e)}
          inputRef={refSearch}
        />
        <IconButton
          className={classes.iconButton}
          aria-label="search"
          onClick={() => onClickSearch()}
        >
          <SearchIcon />
        </IconButton>
      </Paper>
      {notes.length == 0 ? (
        <Paper className={classes.paper}>
          <div style={{ color: "grey", margin: "10px auto" }}>
            독서록이 없습니다 😥
          </div>
        </Paper>
      ) : null}

      <div className="row gutters-sm">
        {notes.map((item, index) => {
          // console.log(item);
          return (
            <React.Fragment key={index}>
              <div className={`col-6 col-sm-4 col-md-3 col-xl-2 mb-3`}>
                <div className={`${classes.contentBox} card h-100`}>
                  <img
                    src={item.book_img}
                    alt="..."
                    className={classes.bImage}
                    onClick={() => {
                      history.push(`/viewnotedetail/${item.note_id}`);
                    }}
                  />
                  <div className={classes.titleArea}>
                    <b
                      className={`${classes.rTitleArea} card-title`}
                      onClick={() => {
                        history.push(`/viewnotedetail/${item.note_id}`);
                      }}
                    >
                      {item.note_title}
                    </b>
                    <div
                      className={`${classes.subTitleArea} card-subtitle font-size-xs mb-2`}
                    >
                      {item.book_title}
                    </div>
                  </div>
                  <div className={`${classes.date}`}>
                    <div className="ml-1 mr-auto" style={{ marginBottom: 3 }}>
                      <Moment format={"YYYY-MM-DD"}>{item.note_date}</Moment>
                      <br />
                    </div>
                    <UserButton userId={item.user_id} />
                  </div>
                  <div>
                    <Grid container className={classes.gridRoot} spacing={1}>
                      {/* <div className="justify-content-between"> */}
                      {/* <div className="has-icon btn-xs col-4"> */}
                      <Grid
                        item
                        className={`${classes.viewBtn} col-6 col-xs-6 col-sm-6 col-md-6`}
                      >
                        <RemoveRedEyeOutlinedIcon />
                        <span style={{ fontSize: 7 }}>
                          {item.note_viewcount}
                        </span>
                      </Grid>
                      <Grid
                        item
                        className={`${classes.viewBtn} col-6 col-xs-6 col-sm-6 col-md-6`}
                      >
                        <NoteLike
                          noteIDX={item.note_id}
                          userIDX={item.user_id}
                        />
                      </Grid>
                    </Grid>
                  </div>
                </div>
              </div>
            </React.Fragment>
          );
        })}
      </div>

      <Modal
        open={modal.open}
        onClose={closeModal}
        center
        classNames={{ modal: "modal-content" }}
        styles={{
          overlay: { zIndex: 2000 },
        }}
      >
        <NoteDetail noteIDX={modal.note_id} />
      </Modal>

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
    </>
  );
};

export default NoteSearch;
