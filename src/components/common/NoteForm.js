import React, { useState, useRef, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import Moment from "react-moment";

const NoteForm = (props) => {
  let now = new Date();
  let history = useHistory();
  const apiUrl = `http://localhost:8000/api/note/`;
  const apiUrl2 = `http://localhost:8000/api/note/${props.noteIDX}/`;

  const [note, setNote] = useState({});

  //독서록 등록
  useEffect(() => {
    if (props.noteIDX == null) {
      setNote({
        user_id: 1,
        book_id: 0,
        note_title: "",
        note_contents: "",
        note_like: 0,
        note_private: true,
        note_viewcount: 0,
        note_date: now.toISOString().substring(0, 10),
      });
    } else {
      axios
        .get(apiUrl2)
        .then((response) => {
          setNote(response.data);
        })
        .catch((response) => {
          console.error(response);
        });
    }
  }, []);

  const [notes, setNotes] = useState([]);

  useEffect(() => {
    axios
      .get(apiUrl)
      .then((response) => {
        setNotes(response.data);
      })
      .catch((response) => {
        console.error(response);
      });
  }, []);

  //내용이 바뀔때마다 setNote
  const noteOnChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
    console.log(note);
  };

  //ref 설정
  const refTitle = useRef(null);
  const refContents = useRef(null);

  //독서록 저장
  const noteSave = () => {
    note.note_id = notes.length + 1;
    note.note_date = now.toISOString().substring(0, 10);
    if (note.book_id == 0) {
      alert("책을 골라주세요");
      return false;
    }

    if (note.note_title == "") {
      alert("제목을 입력해주세요");
      refTitle.current.focus();
      return false;
    }

    if (note.note_contents == "") {
      alert("내용을 입력해주세요");
      refContents.current.focus();
      return false;
    }

    axios
      .post(apiUrl, note)
      .then((response) => {
        console.log(response.data);
        alert("등록완료");
        history.push("/viewnotes");
      })
      .catch((response) => {
        console.error(response);
      });
  };

  //수정
  const noteModify = () => {
    if (note.note_title == "") {
      alert("제목을 입력해주세요");
      refTitle.current.focus();
      return false;
    }

    if (note.note_contents == "") {
      alert("내용을 입력해주세요");
      refContents.current.focus();
      return false;
    }

    axios
      .put(apiUrl2, note)
      .then((response) => {
        alert("수정완료");
        console.log(response.data);
        history.push(`/viewnotedetail/${props.noteIDX}`);
      })
      .catch((response) => {
        console.error(response);
      });
  };

  return (
    <>
      <div className="card">
        <div className="card-body">
          <form>
            <div className="form-group">
              {props.noteIDX == null ? (
                <>
                  <label>책 선택</label>
                  <br />
                  <select
                    className="custom-select custom-select-sm w-auto mr-1"
                    name="book_id"
                    onChange={(e) => noteOnChange(e)}
                    value={note.book_id}
                  >
                    {/* 책꽂이 for문 */}
                    <option value="0">독서록을 쓸 책 선택</option>
                    <option value="1">여행의 이유</option>
                    <option value="2">점심메뉴</option>
                    <option value="3">존리의 부자되기 습관</option>
                    <option value="책이름이고">책이름이고</option>
                    <option value="더 해빙 The Having">
                      더 해빙 The Having
                    </option>
                  </select>
                </>
              ) : (
                <>
                  <label>책 이름</label>
                  <br />
                  {note.book_id}
                </>
              )}
            </div>

            <div className="form-group">
              <label>제목</label>
              <input
                type="text"
                className="form-control"
                name="note_title"
                value={note.note_title}
                ref={refTitle}
                onChange={(e) => noteOnChange(e)}
              />
            </div>

            <div className="form-group">
              <label>내용</label>
              <textarea
                className="form-control"
                name="note_contents"
                value={note.note_contents}
                ref={refContents}
                onChange={(e) => noteOnChange(e)}
              ></textarea>
            </div>
          </form>

          {props.status == "write" ? (
            <>
              <button
                type="button"
                className="btn btn-btn btn-outline-primary btn-sm has-icon"
                style={{ margin: "10px auto" }}
                onClick={() => noteSave()}
              >
                저장
              </button>
              <Link to="/viewnotes">
                <button
                  type="button"
                  className="btn btn-outline-danger btn-sm has-icon"
                  style={{ marginLeft: "10px" }}
                >
                  취소
                </button>
              </Link>
            </>
          ) : (
            <>
              <button
                type="button"
                className="btn btn btn-outline-primary btn-sm has-icon-primary"
                style={{ margin: "10px auto" }}
                onClick={() => noteModify()}
              >
                수정완료
              </button>
              <Link to={`/viewnotedetail/${note.note_id}`}>
                <button
                  type="button"
                  className="btn btn-outline-danger btn-sm has-icon"
                  style={{ marginLeft: "10px" }}
                >
                  취소
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default NoteForm;
