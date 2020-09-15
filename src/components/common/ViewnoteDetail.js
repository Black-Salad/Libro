import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

const ViewnoteDetail = (props) => {
  let history = useHistory();

  const apiUrl = `http://localhost:8000/api/note/${props.noteIDX}`;

  const [note, setNote] = useState({});

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
  }, []);

  //독서록 삭제
  const onDelete = () => {
    if (window.confirm("해당 독서록을 삭제하시겠습니까?")) {
      axios
        .delete(apiUrl)
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
      <div className="card" style={{ marginTop: "10px" }}>
        <div className="card-body">
          <fieldset className="form-fieldset">
            <legend>댓글</legend>

            {/* 댓글for문 */}
            <div className="media forum-item">
              <a href="#" data-toggle="collapse" data-target=".forum-content">
                <img
                  src="../img/user1.svg"
                  className="mr-3 rounded-circle"
                  width="50"
                  alt="User"
                />
              </a>
              <div className="media-body">
                <h6>
                  <span
                    href="#"
                    data-toggle="collapse"
                    data-target=".forum-content"
                    className="text-body"
                  >
                    닉네임이나 이메일을 적어보자
                  </span>
                </h6>
                <p className="text-secondary">
                  왕ㅇ 여행가고싶ㄴㅔ여 댓글내용을 입력해보자
                </p>
                <p className="text-muted">2020-08-03</p>
              </div>
            </div>
            <hr />
            <div className="media forum-item">
              <span
                href="#"
                data-toggle="collapse"
                data-target=".forum-content"
              >
                <img
                  src="../img/user1.svg"
                  className="mr-3 rounded-circle"
                  width="50"
                  alt="User"
                />
              </span>
              <div className="media-body">
                <h6>
                  <span
                    href="#"
                    data-toggle="collapse"
                    data-target=".forum-content"
                    className="text-body"
                  >
                    닉네임이나 이메일을 적어보자
                  </span>
                </h6>
                <p className="text-secondary">
                  왕ㅇ 여행가고싶ㄴㅔ여 댓글내용을 입력해보자
                </p>
                <p className="text-muted">2020-08-03</p>
              </div>
            </div>
          </fieldset>

          {/* 댓글쓰기form */}
          <form>
            <fieldset className="form-fieldset">
              {/* <legend>댓글달기</legend> */}
              <div className="form-group">
                <label>test123@naver.com(닉네임이나 이메일)</label>
                <input
                  type="text"
                  className="form-control"
                  id="fieldsetExampleInput2"
                  placeholder="댓글내용"
                />
              </div>
              <button className="btn btn-primary" type="button">
                댓글등록
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </>
  );
};

export default ViewnoteDetail;
