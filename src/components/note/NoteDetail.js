import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { Cookies } from "react-cookie";
import axios from "axios";
import Moment from "react-moment";
import { LIBRO_API_URL } from "../../constants/config";
import { makeStyles } from "@material-ui/core/styles";

import NoteComment from "./NoteComment";
import NoteLike from "./NoteLike";

import RemoveRedEyeOutlinedIcon from "@material-ui/icons/RemoveRedEyeOutlined";
import Button from "@material-ui/core/Button";
import HomeIcon from "@material-ui/icons/Home";
import RefreshIcon from "@material-ui/icons/Refresh";
import DeleteIcon from "@material-ui/icons/Delete";
// import UserButton from "../common/UserButton";

const NoteDetail = (props) => {
  let history = useHistory();
  const cookies = new Cookies();

  const loginUserId = cookies.get("loginUserId");
  const loginUserName = cookies.get("loginUserName");
  const loginUserEmail = cookies.get("loginUserEmail");

  const apiUrl = `${LIBRO_API_URL}/api/note/${props.noteIDX}/`;
  const apiUrl2 = `${LIBRO_API_URL}/api/note/comment/userjoin/?note_id=${props.noteIDX}`;
  const apiUrl3 = `${LIBRO_API_URL}/api/note/comment/`;
  const apiUrl4 = `${LIBRO_API_URL}/api/user/alarm/`;
  // const apiUrl5 = `${LIBRO_API_URL}/api/user/${note.user_id}/`;

  const [user, setUser] = useState({});
  const [note, setNote] = useState({});
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState({
    note_id: props.noteIDX,
    user_id: loginUserId,
    comment_contents: "",
  });
  const [alarm, setAlarm] = useState({
    user_id: loginUserId,
    target_user_id: 0,
    note_id: props.noteIDX,
    alarm_type: 3,
    alarm_status: true,
  });
  const useStyles = makeStyles(() => ({
    profile: {
      width: 30,
      height: 30,
      borderRadius: "50%",
      objectFit: "cover",
    },
  }));

  const classes = useStyles();

  //useEffect
  useEffect(() => {
    axios.get(apiUrl).then((response) => {
      console.log("noteDetail Data", response);
      setNote(response.data);
      setAlarm({ ...alarm, target_user_id: response.data.user_id });

      //조회수 추후 cookie로 조건문
      axios.patch(apiUrl, { note_viewcount: response.data.note_viewcount + 1 });

      axios
        .get(`${LIBRO_API_URL}/api/user/${response.data.user_id}/`)
        .then((response) => {
          console.log("response", response);
          setUser(response.data);
        });
    });

    axios.get(apiUrl2).then((response) => {
      console.log("comment", response);
      setComments(response.data);
    });
  }, []);

  //독서록 삭제
  const onDelete = () => {
    if (window.confirm("해당 독서록을 삭제하시겠습니까?")) {
      axios
        .patch(apiUrl, { note_state: false })
        .then((response) => {
          console.log("note delete Data", response);
          alert("삭제완료");
          history.push("/viewnotes");
        })
        .catch((response) => {
          console.error(response);
        });
    }
  };

  //댓글 내용 바뀔떄마다 setComment
  const commentOnChange = (e) => {
    setComment({ ...comment, [e.target.name]: e.target.value });
    console.log(comment);
  };

  //댓글 등록
  const commentWrite = () => {
    if (comment.comment_contents === "") {
      alert("내용을 입력해주세요");
      return false;
    }
    axios.post(apiUrl3, comment).then((response) => {
      console.log(response.data);

      axios.post(`${LIBRO_API_URL}/api/timeline/`, {
        user_id: loginUserId,
        tl_kind: "6",
        comment_id: response.data.comment_id,
      });

      // 본인이 한 게시물엔 알람 안가게
      if (loginUserId != alarm.target_user_id) {
        axios.post(apiUrl4, alarm).then((response) => {
          console.log("Alarm", response.data);
        });
      }
      history.go(0);
    });
  };

  return (
    <>
      {/* note contents */}
      <div className="card">
        <div className="card-body font-size-sm">
          <div className="media mb-3 align-items-center">
            <img
              src={note.book_img}
              style={{ width: "50px", boxShadow: "grey 1px 1px 1px 1px" }}
              alt=""
            />
            <div className="media-body text-muted ml-3">
              <h6 className="mb-0 text-dark">
                <strong>{note.book_title}</strong>
              </h6>
              <div className="small">
                <Moment format={"YYYY/MM/DD HH:mm:ss"}>{note.note_date}</Moment>
              </div>
            </div>

            <div className="has-icon">
              <NoteLike noteIDX={props.noteIDX} userIDX={note.user_id} />
              <RemoveRedEyeOutlinedIcon /> {note.note_viewcount}
            </div>
          </div>
          <h5>
            <strong>{note.note_title}</strong>
          </h5>
          <hr />
          <p style={{ whiteSpace: "pre-line" }}>{note.note_contents}</p>
          <div className="btn-group-sm pt-3 list-with-gap">
            {/* <UserButton userId={note.user_id} /> */}
            <Link to={`/room/${user.user_id}`} className="mr-2">
              <img
                alt=""
                src={user.user_img}
                className={`${classes.profile} rounded-circle mr-2`}
              />
              {user.user_name}
            </Link>
            {/* <Button
              variant="contained"
              color="primary"
              startIcon={<HomeIcon />}
              className="mb-1 mr-2"
              size="small"
              onClick={() => {
                history.push(`/room/${note.user_id}`);
              }}
            >
              Room
            </Button>{" "} */}

            {/* <UserButton userId={note.user_id} /> */}
            {note.user_id == loginUserId ? (
              <>
                <Button
                  variant="contained"
                  startIcon={<RefreshIcon />}
                  className="mb-1 mr-2"
                  size="small"
                  onClick={() => {
                    history.push(`/modifynote/${note.note_id}`);
                  }}
                >
                  수정
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  startIcon={<DeleteIcon />}
                  className="mb-1 mr-2"
                  size="small"
                  onClick={() => onDelete(note.note_id)}
                >
                  삭제
                </Button>
              </>
            ) : null}
          </div>
        </div>
      </div>

      {/* 댓글 */}
      <div className="card p-2" style={{ marginTop: "10px" }}>
        <div className="card-body">
          {/* 댓글 for문 */}
          {comments.map((item, index) => {
            return (
              <React.Fragment key={index}>
                <NoteComment item={item} />
              </React.Fragment>
            );
          })}
          {/* 댓글쓰기form */}
          <br />
          <form className="chat-form">
            <strong>
              {loginUserName}({loginUserEmail})
            </strong>
            <div className="input-group">
              <textarea
                rows="3"
                className="form-control autosize"
                name="comment_contents"
                onChange={(e) => commentOnChange(e)}
                placeholder="댓글 내용"
                style={{ border: "1px solid #c2c2c2" }}
              ></textarea>
              <div className="input-group-append">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => commentWrite()}
                >
                  댓글등록
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default NoteDetail;
