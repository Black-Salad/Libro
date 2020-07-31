import React, { useState, useRef, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";

const NoteForm = (props) => {
  //---------------------------- 독서록 등록 ------------------------------------------------------------------------
  //useState
  let now = new Date();

  const [note, setNote] = useState({
    idx: 0,
    noteUser: "test01",
    noteBook: "",
    noteTitle: "",
    noteContents: "",
    noteDate: now.toLocaleString(),
  });

  // const [notes, setNotes] = useState([]);
  // 임시 notes
  const [notes, setNotes] = useState([
    {
      idx: 1,
      noteUser: "test01",
      noteBook: "여행의 이유",
      bookIDX: 1,
      noteTitle: "여행의 이유를 읽고나서",
      noteContents: "예~~~~~~~~~~~~~~~`여행~~~~~~~~`",
      noteDate: "2020-03-20",
    },
    {
      idx: 2,
      noteUser: "test01",
      noteBook: "점심메뉴",
      bookIDX: 2,
      noteTitle: "점심은 뭘 먹어야 잘 먹었다 소문이 날까",
      noteContents: "잘모르겠따",
      noteDate: "2020-07-30",
    },
    {
      idx: 3,
      noteUser: "test01",
      noteBook: "존리의 부자되기 습관",
      bookIDX: 3,
      noteTitle: "부자가되려면..............",
      noteContents: "...........",
      noteDate: "2020-07-31",
    },
    {
      idx: 4,
      noteUser: "test01",
      noteBook: "여기는 책이름이고",
      bookIDX: 4,
      noteTitle: "여기는 독서록 제목을 적는곳이구",
      noteContents: "여기는 독서록 내용을 적는곳이지",
      noteDate: "2020-07-20",
    },
  ]);

  //내용이 바뀔때마다 setNote
  const noteOnChange = (e) => {
    setNote({ ...note, [e.target.name]: [e.target.value] });
  };

  //ref 설정
  const refTitle = useRef(null);
  const refContents = useRef(null);

  // 저장버튼 클릭시 setNotes
  const noteSave = () => {
    note.idx = notes.length + 1;
    note.noteDate = now.toLocaleString();
    if (note.noteBook == 0) {
      alert("책을 골라주세요");
      return false;
    }

    if (note.noteTite == "") {
      alert("제목을 입력해주세요");
      refTitle.current.focus();
      return false;
    }

    if (note.refContents == "") {
      alert("내용을 입력해주세요");
      return false;
    }
    setNotes({ ...notes, note });
    window.location.href = "./Viewnotes";
  };

  //---------------------------- 독서록 수정 ------------------------------------------------------------------------
  //select useState
  const [selectNote, setSelectNote] = useState({});

  //값 가져와서 selectNote에 값 설정
  //useMemo는 배열값을 리턴해야하는데 배열이 아니라서 콘솔창에 오류표시남 수정필요
  useMemo(() => {
    notes.map((item) => {
      if (item.idx == props.idx)
        setSelectNote({
          idx: item.idx,
          noteUser: item.noteUser,
          noteBook: item.noteBook,
          bookIDX: 1,
          noteTitle: item.noteTitle,
          noteContents: item.noteContents,
          noteDate: item.noteDate,
        });
    });
    return selectNote;
  }, selectNote);

  const noteModifyOnChange = (e) => {
    setSelectNote({ ...selectNote, [e.target.name]: [e.target.value] });
  };

  //수정완료
  const noteModify = () => {
    setNotes(
      notes.map((item) =>
        props.idx == item.idx
          ? {
              ...item,
              noteUser: selectNote.noteUser,
              noteBook: selectNote.noteBook,
              bookIDX: selectNote.bookIDX,
              noteTitle: selectNote.noteTitle,
              noteContents: selectNote.noteContents,
              noteDate: selectNote.noteDate,
            }
          : item
      )
    );
    alert("수정완료");
    window.location.href = "/viewnotedetail/" + props.idx;
  };

  return (
    <>
      <div className="card">
        <div className="card-body">
          <form>
            <div className="form-group">
              <label>책 선택</label>
              <br />

              {props.idx == null ? (
                <select
                  className="custom-select custom-select-sm w-auto mr-1"
                  name="noteBook"
                  onChange={(e) => noteOnChange(e)}
                  value={note.bookIDX}
                >
                  {/* 책꽂이 for문 */}
                  <option value="0">독서록을 쓸 책 선택</option>
                  <option value="1">여행의 이유</option>
                  <option value="2">점심메뉴</option>
                  <option value="3">존리의 부자되기 습관</option>
                  <option value="4">책이름이고</option>
                  <option value="5">더 해빙 The Having</option>
                </select>
              ) : (
                <select
                  className="custom-select custom-select-sm w-auto mr-1"
                  name="noteBook"
                  onChange={(e) => noteModifyOnChange(e)}
                  value={selectNote.bookIDX}
                >
                  {/* 책꽂이 for문 */}
                  <option value="0">독서록을 쓸 책 선택</option>
                  <option value="1">여행의 이유</option>
                  <option value="2">점심메뉴</option>
                  <option value="3">존리의 부자되기 습관</option>
                  <option value="4">책이름이고</option>
                  <option value="5">더 해빙 The Having</option>
                </select>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="blogTitle">제목</label>
              {props.idx == null ? (
                <input
                  type="text"
                  className="form-control"
                  name="noteTitle"
                  value={note.noteTitle}
                  ref={refTitle}
                  onChange={(e) => noteOnChange(e)}
                />
              ) : (
                <input
                  type="text"
                  className="form-control"
                  name="noteTitle"
                  value={selectNote.noteTitle}
                  // ref={refTitle}
                  onChange={(e) => noteModifyOnChange(e)}
                />
              )}
            </div>

            <div className="form-group">
              <label>내용</label>
              {props.idx == null ? (
                <textarea
                  className="form-control"
                  name="noteContents"
                  value={note.noteContents}
                  ref={refContents}
                  onChange={(e) => noteOnChange(e)}
                ></textarea>
              ) : (
                <textarea
                  className="form-control"
                  name="noteContents"
                  value={selectNote.noteContents}
                  // ref={refContents}
                  onChange={(e) => noteModifyOnChange(e)}
                ></textarea>
              )}
            </div>
          </form>

          {props.status == "write" ? (
            <button
              type="button"
              className="btn btn-btn btn-outline-primary btn-sm has-icon"
              style={{ margin: "10px auto" }}
              onClick={noteSave}
            >
              저장
            </button>
          ) : (
            <>
              <button
                type="button"
                className="btn btn btn-outline-primary btn-sm has-icon-primary"
                style={{ margin: "10px auto" }}
                onClick={noteModify}
              >
                수정완료
              </button>
              <Link to={`/viewnotedetail/${selectNote.idx}`}>
                <button
                  type="button"
                  className="btn btn-outline-danger btn-sm has-icon"
                  style={{ marginLeft: "10px" }}
                  onClick={noteModify}
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
