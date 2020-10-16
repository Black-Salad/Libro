import React, { useState, useEffect, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import Moment from "react-moment";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
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
import { LIBRO_API_URL } from "../../constants/config";

const useStyles = makeStyles((theme) => ({
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
  const [notes, setNotes] = useState([]);
  const [modal, setModal] = useState({
    open: false,
    note_id: 0,
  });
  const [more, setMore] = useState({
    limit: 12,
    show: false,
  });
  const refSearch = useRef(null);

  const apiUrl = `${LIBRO_API_URL}/api/book/?book_isbn=${props.bookISBN}`;
  const apiUrl1 = `${LIBRO_API_URL}/api/note/`;
  const apiUrl2 = `${LIBRO_API_URL}/api/note/search/?note_private=true&search=`;

  //값 가져와서 setNotes
  useEffect(() => {
    axios.get(apiUrl).then((response) => {
      console.log(response.data);
      if (response.data.length !== 0) {
        axios
          .get(apiUrl1 + `?book_id=${response.data[0].book_id}`)
          .then((response) => {
            setNotes(response.data);
            setMore({
              ...more,
              show: response.data.length > 12 ? true : false,
            });
          });
      } else {
        setNotes(response.data);
        axios.get(apiUrl1).then((response) => {
          setNotes(response.data);
          setMore({
            ...more,
            show: response.data.length > 12 ? true : false,
          });
        });
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
          setNotes(response.data);
          setMore({ ...more, show: response.data.length > 12 ? true : false });
        })
        .catch((response) => {
          console.error(response);
        });
    }
  };

  // 클릭 검색
  const onClickSearch = () => {
    const search = refSearch.current.value;
    axios
      .get(apiUrl2 + search)
      .then((response) => {
        setNotes(response.data);
        setMore({ ...more, show: response.data.length > 12 ? true : false });
      })
      .catch((response) => {
        console.error(response);
      });
  };

  // 더보기 버튼
  const moreBtn = () => {
    console.log(notes.length);
    console.log(more.limit);
    setMore({
      show: notes.length > more.limit + 6 ? true : false,
      limit: more.limit + 6,
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

      <div className="row gutters-sm">
        {notes.length == 0 ? (
          <div className="col-6 col-sm-6 col-md-3 col-xl-3 mb-3">
            <p className="text-secondary font-size-sm">
              해당 독서록이 없습니다 😥
            </p>
          </div>
        ) : null}
        {notes.slice(0, more.limit).map((item, index) => {
          console.log(item);
          return (
            <React.Fragment key={index}>
              <div className={`col-6 col-sm-4 col-md-3 col-xl-2 mb-3`}>
                <div className={`${classes.contentBox} card h-100`}>
                  <img
                    src={item.book_img}
                    alt="..."
                    className={classes.bImage}
                    onClick={() => openModal(item.note_id)}
                  />
                  <div className={classes.titleArea}>
                    <b
                      className={`${classes.rTitleArea} card-title`}
                      onClick={() => openModal(item.note_id)}
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

      {more.show ? (
        <Button
          fullWidth
          className="text-secondary"
          startIcon={<MoreHorizIcon />}
          onClick={() => moreBtn()}
        >
          더보기
        </Button>
      ) : null}
    </>
  );
};

export default NoteSearch;
