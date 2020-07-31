import React from "react";

const Note = (props) => {
  //noteDetail 이동
  const detail = () => {
    window.location.href = "./viewnotedetail/" + props.item.idx;
  };

  const onDelete = () => {
    if (window.confirm("해당 독서록을 삭제하시겠습니까?")) {
      // 추후 주석제거
      // const filterList = notes.filter((item) => item.idx !== props.item.idx);
      // setNotes(filterList);
      // alert("삭제완료");
    }
  };
  return (
    <>
      <div className="col-6 col-sm-4 col-md-3 col-xl-3 mb-3">
        <div className="card h-100">
          <img src="/img/blog/1.jpg" className="card-img-top" alt="..." />
          <div className="card-body">
            <h6 className="card-title" onClick={detail}>
              {props.item.noteTitle}
            </h6>
            <div className="card-subtitle text-muted font-size-sm mb-2">
              {props.item.noteBook}
            </div>
          </div>
          <div className="card-footer font-size-sm text-muted">
            <span className="ml-1 mr-auto">{props.item.noteDate}</span>
            <a
              class="btn btn-link has-icon btn-xs bigger-130 text-danger"
              onClick={onDelete}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-trash mr-1"
              >
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              </svg>
              삭제
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Note;
