import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";

const ViewnoteDetail = (props) => {
  //---------------------------- props => param값 **비교해서 selectnote에 값삽입------------------------------------------------------------------------
  //임시 notes
  const [notes, setNotes] = useState([
    {
      noteIDX: 1,
      noteUser: "test01",
      noteBook: "여행의 이유",
      bookIDX: 1,
      noteTitle: "여행의 이유를 읽고나서",
      noteContents: "예~~~~~~~~~~~~~~~`여행~~~~~~~~`",
      noteDate: "2020-03-20",
    },
    {
      noteIDX: 2,
      noteUser: "test01",
      noteBook: "점심메뉴",
      bookIDX: 2,
      noteTitle: "점심은 뭘 먹어야 잘 먹었다 소문이 날까",
      noteContents: "잘모르겠따",
      noteDate: "2020-07-30",
    },
    {
      noteIDX: 3,
      noteUser: "test01",
      noteBook: "존리의 부자되기 습관",
      bookIDX: 3,
      noteTitle: "부자가되려면..............",
      noteContents: "...........",
      noteDate: "2020-07-31",
    },
    {
      noteIDX: 4,
      noteUser: "test01",
      noteBook: "여기는 책이름이고",
      bookIDX: 4,
      noteTitle: "여기는 독서록 제목을 적는곳이구",
      noteContents: "여기는 독서록 내용을 적는곳이지",
      noteDate: "2020-07-20",
    },
  ]);

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
  const onDelete = () => {
    if (window.confirm("해당 독서록을 삭제하시겠습니까?")) {
      const filterList = notes.filter((item) => item.noteIDX !== props.noteIDX);
      setNotes(filterList);
      alert("삭제완료");
      window.location.href = "/viewnotes";
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
                onClick={onDelete}
              >
                삭제
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 댓글 추후 컴포넌트로 만들기 */}
      <div class="card">
        <div class="card-body">
          <fieldset class="form-fieldset">
            <legend>댓글</legend>

            {/* 댓글for문 */}
            <div class="media forum-item">
              <a href="#" data-toggle="collapse" data-target=".forum-content">
                <img
                  src="../img/user1.svg"
                  class="mr-3 rounded-circle"
                  width="50"
                  alt="User"
                />
              </a>
              <div class="media-body">
                <h6>
                  <a
                    href="#"
                    data-toggle="collapse"
                    data-target=".forum-content"
                    class="text-body"
                  >
                    닉네임이나 이메일을 적어보자
                  </a>
                </h6>
                <p class="text-secondary">
                  왕ㅇ 여행가고싶ㄴㅔ여 댓글내용을 입력해보자
                </p>
                <p class="text-muted">2020-08-03</p>
              </div>
            </div>
            <hr />
            <div class="media forum-item">
              <a href="#" data-toggle="collapse" data-target=".forum-content">
                <img
                  src="../img/user1.svg"
                  class="mr-3 rounded-circle"
                  width="50"
                  alt="User"
                />
              </a>
              <div class="media-body">
                <h6>
                  <a
                    href="#"
                    data-toggle="collapse"
                    data-target=".forum-content"
                    class="text-body"
                  >
                    닉네임이나 이메일을 적어보자
                  </a>
                </h6>
                <p class="text-secondary">
                  왕ㅇ 여행가고싶ㄴㅔ여 댓글내용을 입력해보자
                </p>
                <p class="text-muted">2020-08-03</p>
              </div>
            </div>
          </fieldset>

          {/* 댓글쓰기form */}
          <form>
            <fieldset class="form-fieldset">
              {/* <legend>댓글달기</legend> */}
              <div class="form-group">
                <label for="fieldsetExampleInput">
                  test123@naver.com(닉네임이나 이메일)
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="fieldsetExampleInput2"
                  placeholder="댓글내용"
                />
              </div>
              <button class="btn btn-primary" type="button">
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
