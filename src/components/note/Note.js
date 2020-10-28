import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { Cookies } from "react-cookie";
import { LIBRO_API_URL } from "../../constants/config";
import axios from "axios";
import Moment from "react-moment";
import NoteLike from "./NoteLike";
import RemoveRedEyeOutlinedIcon from "@material-ui/icons/RemoveRedEyeOutlined";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import UserButton from "../common/UserButton";
import { Grid } from "@material-ui/core";
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
}));

const Note = (props) => {
  const classes = useStyles();
  let history = useHistory();
  const cookies = new Cookies();
  const loginUserId = cookies.get("loginUserId");
  const apiUrl1 = `${LIBRO_API_URL}/api/note/?user_id=${props.userIDX}&note_private=true`;

  const [notes, setNotes] = useState([]);
  const [nextUrl, setNextUrl] = useState(null);
  // const [more, setMore] = useState({
  //   limit: 4,
  //   show: true,
  // });

  //useEffect
  useEffect(() => {
    axios
      .get(apiUrl1)
      .then((response) => {
        setNotes(response.data.results);
        setNextUrl(response.data.next);
        // setMore({ ...more, show: response.data.length > 4 ? true : false });
      })
      .catch((response) => {
        console.error(response);
      });
  }, [props]);

  //삭제
  const onDelete = (noteIDX) => {
    const apiUrl2 = `${LIBRO_API_URL}/api/note/${noteIDX}/`;
    if (window.confirm("해당 독서록을 삭제하시겠습니까?")) {
      axios
        .delete(apiUrl2)
        .then((response) => {
          alert("삭제완료");
          history.go(0);
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
      <div className="row gutters-sm">
        {notes.length === 0 ? (
          <p
            className="text-secondary font-size-sm mt-5"
            style={{ height: 80, width: "100%", textAlign: "center" }}
          >
            등록된 독서록이 없습니다 😥
          </p>
        ) : null}
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
                    <UserButton userId={item.user_id} />
                  </div>
                  <div>
                    <Grid container className={classes.gridRoot} spacing={1}>
                      <Grid
                        item
                        className={
                          `${classes.viewBtn}` +
                          (item.user_id == loginUserId
                            ? " col-4 col-xs-4 col-sm-4 col-md-4"
                            : " col-6 col-xs-6 col-sm-6 col-md-6")
                        }
                      >
                        <RemoveRedEyeOutlinedIcon />
                        <span style={{ fontSize: 7 }}>
                          {item.note_viewcount}
                        </span>
                      </Grid>
                      <Grid
                        item
                        className={
                          `${classes.viewBtn}` +
                          (item.user_id == loginUserId
                            ? " col-4 col-xs-4 col-sm-4 col-md-4"
                            : " col-6 col-xs-6 col-sm-6 col-md-6")
                        }
                      >
                        <NoteLike
                          noteIDX={item.note_id}
                          userIDX={item.user_id}
                        />
                      </Grid>
                      {item.user_id == loginUserId ? (
                        <Grid
                          item
                          className={`${classes.viewBtn} col-4 col-xs-4 col-sm-4 col-md-4`}
                          onClick={() => onDelete(item.note_id)}
                          title="삭제"
                        >
                          <DeleteOutlinedIcon color="secondary" />
                        </Grid>
                      ) : null}
                    </Grid>
                  </div>
                </div>
              </div>
            </React.Fragment>
          );
        })}
      </div>
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

export default Note;
