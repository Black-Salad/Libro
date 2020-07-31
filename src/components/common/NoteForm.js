import React, { useState, useRef } from "react";

const NoteForm = (props) => {
  const onDelete = () => {
    if (window.confirm("해당 독서록을 삭제하시겠습니까?")) {
      // 추후 주석제거
      // const filterList = notes.filter((item) => item.idx !== props.item.idx);
      // setNotes(filterList);
      // alert("삭제완료");
    }
  };

  //---------------------------- 독서록 쓰기 저장 ------------------------------------

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

  const [notes, setNotes] = useState([]);

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

  //---------------------------- 독서록 수정 ------------------------------------
  const noteModify = () => {};

  return (
    <>
      <div className="card">
        <div className="card-body">
          <form>
            <div className="form-group">
              <label>책 선택</label>
              <br />
              <select
                className="custom-select custom-select-sm w-auto mr-1"
                name="noteBook"
                onChange={(e) => noteOnChange(e)}
                value={note.noteBook}
              >
                {/* 책꽂이 for문 */}
                <option value="0">독서록을 쓸 책 선택</option>
                <option value="1">존리의 부자되기 습관</option>
                <option value="3">김미경의 리부트</option>
                <option value="4">부의 대이동</option>
                <option value="5">더 해빙 The Having</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="blogTitle">제목</label>
              <input
                type="text"
                className="form-control"
                name="noteTitle"
                value={note.noteTitle}
                ref={refTitle}
                onChange={(e) => noteOnChange(e)}
              />
            </div>
            <div className="form-group">
              <label>내용</label>
              <textarea
                className="form-control"
                name="noteContents"
                value={note.noteContents}
                ref={refContents}
                onChange={(e) => noteOnChange(e)}
              ></textarea>
            </div>
          </form>
          <button
            type="button"
            className="btn btn-primary"
            style={{ margin: "10px auto" }}
            onClick={noteSave}
          >
            저장
          </button>

          <button
            type="button"
            className="btn btn-primary"
            style={{ margin: "10px auto" }}
            onClick={noteModify}
          >
            수정완료
          </button>
        </div>
      </div>
    </>
  );
};

export default NoteForm;
