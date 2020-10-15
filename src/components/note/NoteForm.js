import React, { useState, useRef, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { Cookies } from "react-cookie";
import axios from "axios";

import Button from "@material-ui/core/Button";
import SaveAltIcon from "@material-ui/icons/SaveAlt";
import CloseIcon from "@material-ui/icons/Close";
import RefreshIcon from "@material-ui/icons/Refresh";

const NoteForm = (props) => {
  let now = new Date();
  let history = useHistory();
  const cookies = new Cookies();
  const loginUserId = cookies.get("loginUserId");

  const apiUrl = `http://localhost:8000/api/note/`;
  const apiUrl2 = `http://localhost:8000/api/book/`;
  const apiUrl3 = `http://localhost:8000/api/timeline/`;

  const [note, setNote] = useState({});
  const [notes, setNotes] = useState([]);
  const [shelf, setShelf] = useState([]);

  //독서록 등록
  useEffect(() => {
    if (props.noteIDX == null) {
      setNote({
        user_id: loginUserId,
        book_id: 0,
        book_img: "",
        book_title: "",
        note_title: "",
        note_contents: "",
        note_private: true,
        note_viewcount: 0,
        note_date: now.toISOString(),
        note_state: true,
      });
    } else {
      axios.get(apiUrl + `${props.noteIDX}/`).then((response) => {
        setNote(response.data);
      });
    }

    axios
      .get(apiUrl2 + `shelf/join/?user_id=${loginUserId}&shelf_state=2`)
      .then((response) => {
        setShelf(response.data);
        console.log(response.data);
      });

    axios.get(apiUrl).then((response) => {
      setNotes(response.data);
    });
  }, []);

  //ref 설정
  const refTitle = useRef(null);
  const refContents = useRef(null);
  const refSelect = useRef(null);

  //내용이 바뀔때마다 setNote
  const noteOnChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
    console.log(note);
  };

  const selectOnChange = (e) => {
    axios.get(apiUrl2 + `${e.target.value}/`).then((response) => {
      console.log(response.data);
      console.log(note);
      setNote({
        ...note,
        book_id: response.data.book_id,
        book_img: response.data.book_img,
        book_title: response.data.book_title,
      });
    });
  };

  //독서록 저장
  const noteSave = () => {
    note.note_id = notes.length + 1;
    note.note_date = now.toISOString();
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

    if (window.confirm("등록하시겠습니까?")) {
      axios.post(apiUrl, note).then((response) => {
        console.log(response.data);
        axios
          .post(apiUrl3, {
            user_id: loginUserId,
            tl_kind: "4",
            note_id: response.data.note_id,
          })
          .then((response) => {
            alert("등록완료");
            history.push("/viewnotes");
          });
      });
    }
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

    axios.put(apiUrl + `${props.noteIDX}/`, note).then((response) => {
      alert("수정완료");
      console.log(response.data);
      history.push(`/viewnotedetail/${props.noteIDX}`);
    });
  };

  return (
    <>
      <div className="card">
        <div className="card-body">
          <form>
            <div className="form-row">
              <div className="form-group col-sm-9">
                {props.noteIDX == null ? (
                  <>
                    <label>책 선택</label>
                    <br />
                    <select
                      className="custom-select"
                      ref={refSelect}
                      onChange={(e) => selectOnChange(e)}
                    >
                      <option value="0">독서록을 쓸 책 선택</option>

                      {shelf.map((item, index) => {
                        return (
                          <React.Fragment key={index}>
                            <option value={item.book_id.book_id}>
                              {item.book_id.book_title}
                            </option>
                          </React.Fragment>
                        );
                      })}
                    </select>
                  </>
                ) : (
                  <>
                    <label>책 이름</label>
                    <br />
                    {note.book_title}
                  </>
                )}
              </div>
              <div className="form-group col-sm-3">
                <label>공개 여부</label>
                <br />
                <select
                  className="custom-select"
                  name="note_private"
                  onChange={(e) => noteOnChange(e)}
                  value={note.note_private}
                >
                  <option value="true">O</option>
                  <option value="false">X</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>제목</label>
              <input
                type="text"
                className="form-control"
                name="note_title"
                value={note.note_title || ""}
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
              <Button
                variant="contained"
                color="primary"
                startIcon={<SaveAltIcon />}
                className="mb-1 mr-2"
                size="small"
                onClick={() => noteSave()}
              >
                저장
              </Button>
              <Button
                variant="contained"
                color="secondary"
                startIcon={<CloseIcon />}
                className="mb-1 mr-2"
                size="small"
                onClick={() => {
                  history.push(`/viewnotes`);
                }}
              >
                취소
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="contained"
                color="primary"
                startIcon={<RefreshIcon />}
                className="mb-1 mr-2"
                size="small"
                onClick={() => noteModify()}
              >
                수정완료
              </Button>
              <Button
                variant="contained"
                color="secondary"
                startIcon={<CloseIcon />}
                className="mb-1 mr-2"
                size="small"
                onClick={() => {
                  history.push(`/viewnotedetail/${note.note_id}`);
                }}
              >
                취소
              </Button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default NoteForm;
