const NOTE_INSERT = "NOTE_INSERT";
const NOTE_MODIFY = "NOTE_MODIFY";
const NOTE_DELETE = "NOTE_DELETE";
const NOTE_SEARCH = "NOTE_SEARCH";
const NOTE_DETAIL = "NOTE_DETAIL";

export const insertNote = (note) => ({
  type: NOTE_INSERT,
  note,
});

export const modifyNote = (note) => ({
  type: NOTE_MODIFY,
  note,
});

export const deleteNote = (noteIDX) => ({
  type: NOTE_DELETE,
  noteIDX,
});

export const searchNote = (value) => ({
  type: NOTE_SEARCH,
  value,
});

export const detailNote = (noteIDX) => ({
  type: NOTE_DETAIL,
  noteIDX,
});

const initialState = {
  notes: [
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
    {
      noteIDX: 5,
      noteUser: "test01",
      noteBook: "여기는 책이름이고222",
      bookIDX: 5,
      noteTitle: "여기는 독서록 제목을 적는곳이구222",
      noteContents: "여기는 독서록 내용을 적는곳이지222",
      noteDate: "2020-09-20",
    },
  ],
  searchNotes: [],
};

function note(state = initialState, action) {
  switch (action.type) {
    case NOTE_INSERT:
      return { ...state, notes: state.notes.concat(action.note) };
    case NOTE_MODIFY:
      let now = new Date();
      const result = state.notes.map((item) =>
        item.noteIDX == action.note.noteIDX
          ? {
              ...item,
              noteUser: action.note.noteUser,
              noteBook: action.note.noteBook,
              bookIDX: action.note.bookIDX,
              noteTitle: action.note.noteTitle,
              noteContents: action.note.noteContents,
              noteDate: now.toISOString().substring(0, 10),
            }
          : item
      );
      return { ...state, notes: result };
    case NOTE_DELETE:
      let filterList = state.notes.filter(
        (item) => item.noteIDX !== action.noteIDX
      );
      return { ...state, notes: filterList };

    case NOTE_SEARCH:
      let filterList2 = state.notes.filter(
        (item) =>
          item.noteTitle.indexOf(action.value) !== -1 ||
          item.noteContents.indexOf(action.value) !== -1 ||
          item.noteBook.indexOf(action.value) !== -1
      );
      return { ...state, searchNotes: filterList2 };

    // case NOTE_DETAIL:
    //   let filterList3 = state.notes.filter(
    //     (item) => item.noteIDX == action.noteIDX
    //   );
    //   return { ...state, selectNote: filterList3 };
    default:
      return state;
  }
}

//리듀서 함수 모듈 내보내기
export default note;
