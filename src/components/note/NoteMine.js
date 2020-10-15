import React, { useState, useEffect } from "react";
import { Plus, Search, ChevronLeft } from "react-feather";
import { Link, useHistory } from "react-router-dom";
import { Cookies } from "react-cookie";
import axios from "axios";
import Moment from "react-moment";
import NoteLike from "./NoteLike";
import RemoveRedEyeOutlinedIcon from "@material-ui/icons/RemoveRedEyeOutlined";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import Button from "@material-ui/core/Button";
import VisibilityOffOutlinedIcon from "@material-ui/icons/VisibilityOffOutlined";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  contentBox: {
    color: "#585858",
    border: "1px solid lightgrey",
    boxShadow: "2px 2px 4px #BDBDBD",
  },
  bImage: {
    width: "100%",
    height: "80px",
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
    fontSize: "10px",
    color: "#A4A4A4",
    textAlign: "right",
  },
}));
const NoteMine = () => {
  const classes = useStyles();
  let history = useHistory();
  const cookies = new Cookies();
  const loginUserId = cookies.get("loginUserId");

  const [notes, setNotes] = useState([]);
  const [more, setMore] = useState({
    limit: 8,
    show: true,
  });

  //값 가져와서 setNotes
  useEffect(() => {
    const apiUrl = `http://localhost:8000/api/note/?user_id=${loginUserId}`;
    axios
      .get(apiUrl)
      .then((response) => {
        setNotes(response.data);
        setMore({ ...more, show: response.data.length > 8 ? true : false });
      })
      .catch((response) => {
        console.error(response);
      });
  }, []);

  //삭제
  const onDelete = (noteIDX) => {
    const apiUrl = `http://localhost:8000/api/note/${noteIDX}/`;
    if (window.confirm("해당 독서록을 삭제하시겠습니까?")) {
      axios
        .patch(apiUrl, { note_state: false })
        .then((response) => {
          alert("삭제완료");
          history.go(0);
        })
        .catch((response) => {
          console.error(response);
        });
    }
  };

  //검색
  const onKeyPressSearch = (e) => {
    if (e.key === "Enter") {
      // e.chardCode === 13
      const search = e.target.value;
      const apiUrl = `http://localhost:8000/api/note/search/?search=${search}&user_id=${loginUserId}`;
      axios
        .get(apiUrl)
        .then((response) => {
          setNotes(response.data);
          setMore({ ...more, show: response.data.length > 8 ? true : false });
        })
        .catch((response) => {
          console.error(response);
        });
    }
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

  return (
    <>
      <div className="card mb-3">
        <div className="card-body p-2" style={{ height: "50px" }}>
          <div
            className="d-flex align-items-center collapse transition-none blog-toolbar"
            id="searchform"
          >
            <button
              className="btn btn-sm btn-icon mr-2"
              data-toggle="collapse"
              data-target=".blog-toolbar"
            >
              <ChevronLeft />
            </button>
            <input
              type="text"
              className="form-control form-control-sm bg-gray-200 border-gray-200"
              placeholder="책제목 / 독서록 제목 / 독서록 내용"
              onKeyPress={(e) => onKeyPressSearch(e)}
            />
          </div>
          <div
            className="d-flex align-items-center collapse transition-none show blog-toolbar"
            id="notewrite"
          >
            <Link to="/writenote">
              <button
                className="btn btn-outline-primary btn-sm has-icon"
                type="button"
              >
                <Plus /> 독서록 쓰기
              </button>
            </Link>

            <button
              className="btn btn-light btn-sm btn-icon ml-auto mr-1"
              type="button"
              data-toggle="collapse"
              data-target=".blog-toolbar"
            >
              <Search />
            </button>
          </div>
        </div>
      </div>

      <div className="row gutters-sm">
        {notes.slice(0, more.limit).map((item, index) => {
          console.log(item);
          return (
            <React.Fragment key={index}>
              <div className={`col-6 col-sm-4 col-md-3 col-xl-3 mb-3`}>
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
                    <b className={`${classes.rTitleArea} card-title`}>
                      <Link to={`/viewnotedetail/${item.note_id}`}>
                        {item.note_title}
                      </Link>
                    </b>
                    <div
                      className={`${classes.subTitleArea} card-subtitle font-size-xs mb-2`}
                    >
                      {item.book_title}
                    </div>
                  </div>
                  <div className={`${classes.date}`}>
                    <span className="ml-1 mr-auto">
                      <Moment format={"YYYY년 MM월 DD일"}>
                        {item.note_date}
                      </Moment>
                      <br />
                      by {item.user_id.user_name}
                    </span>
                  </div>
                  <div className="card-footer justify-content-between">
                    <span className="has-icon btn-xs">
                      {item.note_private == true ? (
                        <>
                          <RemoveRedEyeOutlinedIcon /> {item.note_viewcount}
                        </>
                      ) : (
                        <>
                          <VisibilityOffOutlinedIcon />
                        </>
                      )}
                    </span>

                    <NoteLike noteIDX={item.note_id} userIDX={item.user_id} />

                    <span
                      className="btn btn-link has-icon btn-xs bigger-130 text-danger"
                      onClick={() => onDelete(item.note_id)}
                      title="삭제"
                    >
                      <DeleteOutlinedIcon color="secondary" />
                    </span>
                  </div>
                </div>
              </div>
            </React.Fragment>
          );
        })}
      </div>
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

export default NoteMine;
