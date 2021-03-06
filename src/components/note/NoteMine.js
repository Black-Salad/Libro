import React, { useState, useEffect } from "react";
import { Plus, Search, ChevronLeft } from "react-feather";
import { Link, useHistory } from "react-router-dom";
import { Cookies } from "react-cookie";
import axios from "axios";
import Moment from "react-moment";
import { LIBRO_API_URL } from "../../constants/config";

import NoteLike from "./NoteLike";
import RemoveRedEyeOutlinedIcon from "@material-ui/icons/RemoveRedEyeOutlined";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import Button from "@material-ui/core/Button";
import VisibilityOffOutlinedIcon from "@material-ui/icons/VisibilityOffOutlined";
import { makeStyles } from "@material-ui/core/styles";
import UserButton from "../common/UserButton";
import { Grid, Paper } from "@material-ui/core";

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
  profile: {
    width: 30,
    height: 30,
    borderRadius: "50%",
    objectFit: "cover",
  },
}));
const NoteMine = () => {
  const classes = useStyles();
  let history = useHistory();
  const cookies = new Cookies();
  const loginUserId = cookies.get("loginUserId");
  const loginUserName = cookies.get("loginUserName");
  const loginUserImg = cookies.get("loginUserImg");

  const [notes, setNotes] = useState([]);
  const [nextUrl, setNextUrl] = useState(null);
  const [deleted, setDeleted] = useState(false);

  //값 가져와서 setNotes
  useEffect(() => {
    const apiUrl = `${LIBRO_API_URL}/api/note/list/?user_id=${loginUserId}`;
    axios
      .get(apiUrl)
      .then((response) => {
        setNotes(response.data.results);
        setNextUrl(response.data.next);
      })
      .catch((response) => {
        console.error(response);
      });
  }, [deleted]);

  //삭제
  const onDelete = (noteIDX) => {
    const apiUrl = `${LIBRO_API_URL}/api/note/${noteIDX}/`;
    if (window.confirm("해당 독서록을 삭제하시겠습니까?")) {
      axios
        .delete(apiUrl)
        .then((response) => {
          setDeleted(!deleted);
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
      // console.log(loginUserId);
      const search = e.target.value;
      const apiUrl = `${LIBRO_API_URL}/api/note/search/?search=${encodeURIComponent(
        search
      )}&user_id=${loginUserId}`;
      axios
        .get(apiUrl)
        .then((response) => {
          setNotes(response.data.results);
          setNextUrl(response.data.next);
        })
        .catch((response) => {
          console.error(response);
        });
    }
  };

  const onClickMore = () => {
    axios
      .get(nextUrl)
      .then((response) => {
        setNotes([...notes, ...response.data.results]);
        setNextUrl(response.data.next);
      })
      .catch((response) => {
        console.error(response);
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

      {notes.length === 0 ? (
        <Paper className={classes.paper}>
          <div style={{ color: "grey", margin: "10px auto" }}>
            독서록이 없습니다. 독서록을 작성해보세요.✍
          </div>
        </Paper>
      ) : (
        <div className="row gutters-sm">
          {notes.map((item, index) => {
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
                      <div className="ml-1 mr-auto" style={{ marginBottom: 3 }}>
                        <Moment format={"YYYY-MM-DD"}>{item.note_date}</Moment>
                        <br />
                      </div>
                      {/* <UserButton userId={item.user_id.user_id} /> */}
                      <Link to={`/room/${loginUserId}`} className="mr-2">
                        <img
                          alt=""
                          src={loginUserImg}
                          className={`${classes.profile} rounded-circle mr-2`}
                        />
                        {loginUserName}
                      </Link>
                    </div>
                    <div>
                      <Grid container className={classes.gridRoot} spacing={1}>
                        <Grid
                          item
                          className={`${classes.viewBtn} col-4 col-xs-4 col-sm-4 col-md-4`}
                        >
                          {item.note_private === true ? (
                            <>
                              <RemoveRedEyeOutlinedIcon />
                              <span style={{ fontSize: 7 }}>
                                {item.note_viewcount}
                              </span>
                            </>
                          ) : (
                            <>
                              <VisibilityOffOutlinedIcon />
                            </>
                          )}
                        </Grid>
                        <Grid
                          item
                          className={`${classes.viewBtn} col-4 col-xs-4 col-sm-4 col-md-4`}
                        >
                          <NoteLike
                            noteIDX={item.note_id}
                            userIDX={item.user_id}
                          />
                        </Grid>
                        <Grid
                          item
                          className={`${classes.viewBtn} col-4 col-xs-4 col-sm-4 col-md-4`}
                          onClick={() => onDelete(item.note_id)}
                          title="삭제"
                        >
                          <DeleteOutlinedIcon color="secondary" />
                        </Grid>
                      </Grid>
                    </div>
                  </div>
                </div>
              </React.Fragment>
            );
          })}
        </div>
      )}
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

export default NoteMine;
