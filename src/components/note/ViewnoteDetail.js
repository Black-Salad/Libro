import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import Moment from "react-moment";
import NoteComment from "./NoteComment";

const ViewnoteDetail = (props) => {
  let now = new Date();
  let history = useHistory();

  const loginUserId = 1;
  const loginUserName = "test01";
  const loginUserEmail = "test01@naver.com";

  const apiUrl = `http://localhost:8000/api/note/${props.noteIDX}/`;
  const apiUrl2 = `http://localhost:8000/api/note/comment?note_id=${props.noteIDX}`;
  const apiUrl3 = `http://localhost:8000/api/note/comment/`;
  const apiUrl4 = `http://localhost:8000/api/note/like?note_id=${props.noteIDX}&user_id=${loginUserId}`;
  const apiUrl5 = `http://localhost:8000/api/note/like/`;
  const apiUrl6 = `http://localhost:8000/api/note/like?note_id=${props.noteIDX}&like_state=true`;

  const [note, setNote] = useState({});
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState({
    note_id: props.noteIDX,
    user_id: loginUserId,
    user_name: loginUserName,
    comment_contents: "",
  });
  const [like, setLike] = useState({
    note_id: props.noteIDX,
    user_id: loginUserId,
    like_date: now.toISOString(),
    like_state: true,
  });
  const [likeUser, setLikeUser] = useState({
    like_id: 0,
  });
  const [likeCnt, setLikeCnt] = useState(0);

  //useEffect
  useEffect(() => {
    axios.get(apiUrl).then((response) => {
      console.log("noteDetail Data", response);
      setNote(response.data);

      //조회수 추후 cookie로 조건문
      axios.patch(apiUrl, { note_viewcount: response.data.note_viewcount + 1 });
    });

    axios.get(apiUrl2).then((response) => {
      console.log("comment", response);
      setComments(response.data);
    });

    axios.get(apiUrl4).then((response) => {
      console.log("like", response.data);
      if (response.data.length == 1) setLikeUser(response.data[0]);
      else setLikeUser(response.data);
    });

    axios.get(apiUrl6).then((response) => {
      console.log("likecnt", response.data.length);
      setLikeCnt(response.data.length);
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
    if (comment.comment_contents == "") {
      alert("내용을 입력해주세요");
      return false;
    }
    axios.post(apiUrl3, comment).then((response) => {
      console.log(response.data);
      alert("등록완료");
      history.go(0);
    });
  };

  //좋아요버튼
  const noneLikeButton =
    "https://iconmonstr.com/wp-content/g/gd/makefg.php?i=../assets/preview/2012/png/iconmonstr-favorite-2.png&r=255&g=0&b=0";
  const likeButton =
    "https://iconmonstr.com/wp-content/g/gd/makefg.php?i=../assets/preview/2012/png/iconmonstr-favorite-1.png&r=255&g=0&b=0";

  const onClickLike = () => {
    if (likeUser.length == 0) {
      axios.post(apiUrl5, like).then((response) => {
        console.log("like 저장", response);
        history.go(0);
      });
    } else {
      axios
        .patch(apiUrl5 + `${likeUser.like_id}/`, { like_state: true })
        .then((response) => {
          console.log("like", response);
          history.go(0);
        });
    }
  };

  const onClickNoneLike = () => {
    axios
      .patch(apiUrl5 + `${likeUser.like_id}/`, { like_state: false })
      .then((response) => {
        console.log("none like", response);
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
                <strong>{note.book_name}</strong>
              </h6>
              <div className="small">
                <Moment format={"YYYY/MM/DD HH:mm:ss"}>{note.note_date}</Moment>
              </div>
            </div>

            <div className="has-icon">
              {likeUser.like_state ? (
                <button
                  type="button"
                  className="btn btn-icon"
                  onClick={onClickNoneLike}
                >
                  <img src={likeButton} style={{ width: "30px" }} alt="" />
                </button>
              ) : (
                <button
                  type="button"
                  className="btn btn-icon"
                  onClick={onClickLike}
                >
                  <img src={noneLikeButton} style={{ width: "30px" }} alt="" />
                </button>
              )}
              <strong className="text-danger">{likeCnt}</strong>
              <span className="has-icon btn-xs">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="feather feather-eye mr-1"
                >
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
                {note.note_viewcount}
              </span>
            </div>
          </div>
          <h5>
            <strong>{note.note_title}</strong>
          </h5>
          <hr />
          <p>{note.note_contents}</p>
          <div className="btn-group-sm pt-3 list-with-gap">
            <Link to="/viewnotes">
              <button
                className="btn btn-outline-primary btn-sm has-icon"
                type="button"
              >
                목록
              </button>
            </Link>
            <Link to={`/modifynote/${note.note_id}`}>
              <button
                className="btn btn-outline-success btn-sm has-icon"
                type="button"
              >
                수정
              </button>
            </Link>
            <button
              className="btn btn-outline-danger btn-sm has-icon"
              type="button"
              onClick={() => onDelete(note.note_id)}
            >
              삭제
            </button>
          </div>
        </div>
      </div>

      {/* 댓글 */}
      <div className="card p-2" style={{ marginTop: "10px" }}>
        <div className="card-body">
          {/* 댓글for문 */}
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
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={() => commentWrite()}
                >
                  댓글등록
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ViewnoteDetail;
