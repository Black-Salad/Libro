import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { Cookies } from "react-cookie";
import axios from "axios";
import Moment from "react-moment";
import { LIBRO_API_URL } from "../../constants/config";
import NoteLike from "./NoteLike";
import RemoveRedEyeOutlinedIcon from "@material-ui/icons/RemoveRedEyeOutlined";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import { makeStyles } from "@material-ui/core/styles";
import UserButton from "../common/UserButton";

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
    boxShadow: "2px 2px 5px #999",
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

const BestNote = (props) => {
  let history = useHistory();
  const cookies = new Cookies();
  const loginUserId = cookies.get("loginUserId");
  const apiUrl = `${LIBRO_API_URL}/api/note/`;
  const [notes, setNotes] = useState([]);
  const classes = useStyles();

  //useEffect
  useEffect(() => {
    axios.get(apiUrl + `like/count/`).then((response) => {
      let bestNotes = response.data;
      console.log("bestNotes", bestNotes);
      for (var i = 0; i < bestNotes.length; i++) {
        axios.get(apiUrl + `${bestNotes[i].note_id}/`).then((res) => {
          if (res.data.note_state === true) {
            setNotes((notes) => [
              ...notes,
              {
                note_id: res.data.note_id,
                user_id: res.data.user_id,
                book_id: res.data.book_id,
                book_title: res.data.book_title,
                book_img: res.data.book_img,
                note_title: res.data.note_title,
                note_date: res.data.note_date,
                note_viewcount: res.data.note_viewcount,
                note_private: res.data.note_private,
                note_state: res.data.note_state,
              },
            ]);
          }
        });
      }
    });
  }, []);

  //삭제
  const onDelete = (noteIDX) => {
    if (window.confirm("해당 독서록을 삭제하시겠습니까?")) {
      axios
        .patch(apiUrl + `${noteIDX}/`, { note_state: false })
        .then((response) => {
          alert("삭제완료");
          history.go(0);
        })
        .catch((response) => {
          console.error(response);
        });
    }
  };

  return (
    <>
      <div className="row gutters-sm">
        {notes.length === 0 ? (
          <p
            className="text-secondary font-size-sm mt-5"
            style={{ height: 80, width: "100%", textAlign: "center" }}
          >
            등록된 책이 없습니다 😥
          </p>
        ) : null}
        {notes.map((item, index) => {
          return (
            <React.Fragment key={index}>
              <div className="col-6 col-sm-6 col-md-3 col-xl-3 mb-3">
                <div className="card h-100">
                  <img
                    src={item.book_img}
                    alt="..."
                    style={{ width: "60%", margin: "auto", cursor: "pointer" }}
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
                  <div className="card-footer justify-content-between">
                    <span className="has-icon btn-xs">
                      <RemoveRedEyeOutlinedIcon /> {item.note_viewcount}
                    </span>

                    <NoteLike noteIDX={item.note_id} userIDX={item.user_id} />
                    {item.user_id == loginUserId ? (
                      <span
                        className="btn btn-link has-icon btn-xs bigger-130 text-danger"
                        onClick={() => onDelete(item.note_id)}
                        title="삭제"
                      >
                        <DeleteOutlinedIcon color="secondary" />
                      </span>
                    ) : null}
                  </div>
                </div>
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </>
  );
};

export default BestNote;
