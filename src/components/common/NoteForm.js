import React, { useState, useRef, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { insertNote, modifyNote } from "../../modules/note";

const NoteForm = (props) => {
  //---------------------------- 독서록 등록 ------------------------------------------------------------------------
  //useState
  let now = new Date();

  const [note, setNote] = useState({
    noteIDX: 0,
    noteUser: "test01",
    noteBook: "",
    noteTitle: "",
    noteContents: "",
    noteDate: now.toISOString().substring(0, 10),
  });

  const notes = useSelector((state) => state.note.notes);

  const dispatch = useDispatch();

  //내용이 바뀔때마다 setNote
  const noteOnChange = (e) => {
    setNote({ ...note, [e.target.name]: [e.target.value] });
  };

  //ref 설정
  const refTitle = useRef(null);
  const refContents = useRef(null);

  // 저장버튼 클릭시 setNotes
  const noteSave = () => {
    note.noteIDX = notes.length + 1;
    note.noteDate = now.toISOString().substring(0, 10);
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
    // setNotes({ ...notes, note });
    dispatch(insertNote(note));
    //location 필요
  };

  //---------------------------- 독서록 수정 ------------------------------------------------------------------------

  //select useState
  const [selectNote, setSelectNote] = useState({});

  //값 가져와서 selectNote에 값 설정
  //useMemo는 배열값을 리턴해야하는데 배열이 아니라서 콘솔창에 오류표시남 수정필요
  useMemo(() => {
    notes.map((item) => {
      if (item.noteIDX == props.noteIDX)
        setSelectNote({
          noteIDX: item.noteIDX,
          noteUser: item.noteUser,
          noteBook: item.noteBook,
          bookIDX: item.bookIDX,
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
    dispatch(modifyNote(selectNote));
    alert("수정완료");
    // console.log(history);
    // console.log(props.history);
    // 페이지이동
    // window.location.href = `/viewnotedetail/${props.noteIDX}`;
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
                </>
              ) : (
                <>
                  <label>책 이름</label>
                  <br />
                  {selectNote.noteBook}
                </>
              )}
            </div>

            <div className="form-group">
              <label>제목</label>
              {props.noteIDX == null ? (
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
              {props.noteIDX == null ? (
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
              <Link to={`/viewnotedetail/${selectNote.noteIDX}`}>
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
