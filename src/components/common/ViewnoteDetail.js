import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteNote } from "../../modules/note";

const ViewnoteDetail = (props) => {
  //---------------------------- props => param값 **비교해서 selectnote에 값삽입------------------------------------------------------------------------

  const dispatch = useDispatch();
  const notes = useSelector((state) => state.note.notes);

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

  //---------------------------- 독서록 삭제 ------------------------------------------------------------------------
  const onDelete = (noteIDX) => {
    if (window.confirm("해당 독서록을 삭제하시겠습니까?")) {
      console.log(props.noteIDX);
      dispatch(deleteNote(noteIDX));
      // const filterList = notes.filter((item) => item.noteIDX !== props.noteIDX);
      // setNotes(filterList);
      alert("삭제완료");
      // 페이지 이동
      // window.location.href = "/viewnotes";
    }
  };

  return (
    <>
      {/* note contents */}
      <div className="card">
        <div className="card-body">
          <div className="form-group">
            <label>책 이름</label>
            <div className="text-secondary">{selectNote.noteBook}</div>
          </div>
          <hr />

          <div className="form-group">
            <label>제목</label>
            <div className=" text-secondary">{selectNote.noteTitle}</div>
          </div>
          <hr />

          <div className="form-group">
            <label>내용</label>
            <div className="text-secondary">{selectNote.noteContents}</div>
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
              <Link to={`/modifynote/${selectNote.noteIDX}`}>
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
                onClick={() => onDelete(selectNote.noteIDX)}
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
                  <a
                    href="#"
                    data-toggle="collapse"
                    data-target=".forum-content"
                    className="text-body"
                  >
                    닉네임이나 이메일을 적어보자
                  </a>
                </h6>
                <p className="text-secondary">
                  왕ㅇ 여행가고싶ㄴㅔ여 댓글내용을 입력해보자
                </p>
                <p className="text-muted">2020-08-03</p>
              </div>
            </div>
            <hr />
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
                  <a
                    href="#"
                    data-toggle="collapse"
                    data-target=".forum-content"
                    className="text-body"
                  >
                    닉네임이나 이메일을 적어보자
                  </a>
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
