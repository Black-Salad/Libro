import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import NoteComment from "./NoteComment";

const ViewnoteDetail = (props) => {
  let history = useHistory();

  const apiUrl = `http://localhost:8000/api/note/${props.noteIDX}/`;
  const apiUrl2 = `http://localhost:8000/api/note/comment?note_id=${props.noteIDX}`;

  const [note, setNote] = useState({});
  const [comments, setComments] = useState([]);

  //값 가져와서 setNote
  useEffect(() => {
    axios
      .get(apiUrl)
      .then((response) => {
        console.log("noteDetail Data", response);
        setNote(response.data);
      })
      .catch((response) => {
        console.error(response);
      });
    axios
      .get(apiUrl2)
      .then((response) => {
        console.log("comment", response);
        setComments(response.data);
      })
      .catch((response) => {
        console.error(response);
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

  return (
    <>
      {/* note contents */}
      <div className="card">
        <div className="card-body">
          <div className="form-group">
            <label>책 이름</label>
            <div className="text-secondary">{note.book_id}</div>
          </div>
          <hr />

          <div className="form-group">
            <label>제목</label>
            <div className=" text-secondary">{note.note_title}</div>
          </div>
          <hr />

          <div className="form-group">
            <label>내용</label>
            <div className="text-secondary">{note.note_contents}</div>
          </div>
          <br />

          <div className="form-group" style={{ textAlign: "end" }}>
            <div className="list-with-gap">
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
      </div>

      {/* 댓글 추후 컴포넌트로 만들기 */}
      <div className="card p-2" style={{ marginTop: "10px" }}>
        <div className="card-body">
          {/* 댓글for문 */}
          {comments.map((item, index) => {
            return (
              <React.Fragment key={index}>
                <NoteComment item={item} user_id={item.user_id} />
              </React.Fragment>
            );
          })}

          {/* 댓글쓰기form */}
          <br />
          <form className="chat-form">
            <strong>유저닉네임(test@naver.com)</strong>
            <div className="input-group">
              <textarea
                rows="3"
                className="form-control autosize"
                placeholder="댓글 내용"
                style={{ border: "1px solid #c2c2c2" }}
              ></textarea>
              <div className="input-group-append">
                <button className="btn btn-primary" type="button">
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
