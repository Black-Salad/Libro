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

const NoteSearch = (props) => {
  const [notes, setNotes] = useState([]);
  const [modal, setModal] = useState({
    open: false,
    note_id: 0,
  });
  const [more, setMore] = useState({
    limit: 8,
    show: false,
  });
  const refSearch = useRef(null);

  const apiUrl = `http://localhost:8000/api/book/?book_isbn=${props.bookISBN}`;
  const apiUrl1 = `http://localhost:8000/api/note/`;
  const apiUrl2 = `http://localhost:8000/api/note/search/?note_private=true&search=`;

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
              show: response.data.length > 8 ? true : false,
            });
          });
      } else {
        setNotes(response.data);
        // axios.get(apiUrl1).then((response) => {
        //   setNotes(response.data);
        //   setMore({
        //     ...more,
        //     show: response.data.length > 8 ? true : false,
        //   });
        // });
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
          setMore({ ...more, show: response.data.length > 8 ? true : false });
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
        setMore({ ...more, show: response.data.length > 8 ? true : false });
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
      show: notes.length > more.limit + 8 ? true : false,
      limit: more.limit + 8,
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

  const useStyles = makeStyles((theme) => ({
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
          return (
            <React.Fragment key={index}>
              <div className="col-6 col-sm-6 col-md-3 col-xl-3 mb-3">
                <div className="card h-100">
                  <img
                    src={item.book_img}
                    alt="..."
                    style={{ width: "60%", margin: "auto", cursor: "pointer" }}
                    onClick={() => openModal(item.note_id)}
                  />
                  <div className="card-body">
                    <h6
                      className="card-title"
                      style={{ cursor: "pointer" }}
                      onClick={() => openModal(item.note_id)}
                    >
                      {item.note_title}
                    </h6>
                    <div className="card-subtitle text-muted font-size-sm mb-2">
                      {item.book_title}
                    </div>
                  </div>
                  <div className="card-footer font-size-sm text-muted">
                    <span className="ml-1 mr-auto">
                      <Moment format={"YYYY/MM/DD"}>{item.note_date}</Moment>
                    </span>
                  </div>
                  <div className="card-footer justify-content-between">
                    <span className="has-icon btn-xs">
                      <RemoveRedEyeOutlinedIcon /> {item.note_viewcount}
                    </span>

                    <NoteLike noteIDX={item.note_id} userIDX={item.user_id} />
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
