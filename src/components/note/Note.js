import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { Cookies } from "react-cookie";
import axios from "axios";
import Moment from "react-moment";
import NoteLike from "./NoteLike";
import RemoveRedEyeOutlinedIcon from "@material-ui/icons/RemoveRedEyeOutlined";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import Button from "@material-ui/core/Button";

const Note = (props) => {
  let history = useHistory();
  const cookies = new Cookies();
  const loginUserId = cookies.get("loginUserId");
  const apiUrl1 = `http://localhost:8000/api/note/?user_id=${props.userIDX}`;

  const [notes, setNotes] = useState([]);
  const [more, setMore] = useState({
    limit: 4,
    show: true,
  });

  //useEffect
  useEffect(() => {
    axios
      .get(apiUrl1)
      .then((response) => {
        setNotes(response.data);
        setMore({ ...more, show: response.data.length > 4 ? true : false });
      })
      .catch((response) => {
        console.error(response);
      });
  }, []);

  //삭제
  const onDelete = (noteIDX) => {
    const apiUrl2 = `http://localhost:8000/api/note/${noteIDX}/`;
    if (window.confirm("해당 독서록을 삭제하시겠습니까?")) {
      axios
        .patch(apiUrl2, { note_state: false })
        .then((response) => {
          alert("삭제완료");
          history.go(0);
        })
        .catch((response) => {
          console.error(response);
        });
    }
  };

  // 더보기 버튼
  const moreBtn = () => {
    console.log(notes.length);
    console.log(more.limit);
    setMore({
      show: notes.length > more.limit + 4 ? true : false,
      limit: more.limit + 4,
    });
  };

  return (
    <>
      <div className="row gutters-sm">
        {notes.length === 0 ? (
          <div className="col-6 col-sm-6 col-md-3 col-xl-3 mb-3">
            <p className="text-secondary font-size-sm">등록된 책이 없습니다</p>
          </div>
        ) : null}
        {notes.slice(0, more.limit).map((item, index) => {
          return (
            <React.Fragment key={index}>
              <div className="col-6 col-sm-6 col-md-3 col-xl-3 mb-3">
                <div className="card h-100">
                  <img
                    src={item.book_img}
                    alt="..."
                    style={{ width: "60%", margin: "auto", cursor: "pointer" }}
                    onClick={() => {
                      history.push(`/viewnotedetail/${item.note_id}`);
                    }}
                  />
                  <div className="card-body">
                    <h6 className="card-title">
                      <Link to={`/viewnotedetail/${item.note_id}`}>
                        {item.note_title}
                      </Link>
                    </h6>
                    <div className="card-subtitle text-muted font-size-sm mb-2">
                      {item.book_title}
                    </div>
                  </div>
                  <div className="card-footer font-size-sm text-muted">
                    <span className="ml-1 mr-auto">
                      <Moment format={"YYYY/MM/DD"}>{item.note_date}</Moment>
                    </span>
                  </div>
                  <div className="card-footer justify-content-between">
                    <span className="has-icon btn-xs">
                      <RemoveRedEyeOutlinedIcon /> {item.note_viewcount}
                    </span>

                    <NoteLike noteIDX={item.note_id} />
                    {item.user_id === loginUserId ? (
                      <span
                        className="btn btn-link has-icon btn-xs bigger-130 text-danger"
                        onClick={() => onDelete(item.note_id)}
                        title="삭제"
                      >
                        <DeleteOutlinedIcon color="secondary" />
                      </span>
                    ) : null}
                  </div>
                </div>
              </div>
            </React.Fragment>
          );
        })}
      </div>
      {more.show ? (
        <Button
          fullWidth
          className="text-secondary"
          startIcon={<MoreHorizIcon />}
          onClick={() => moreBtn()}
        >
          더보기
        </Button>
      ) : null}
    </>
  );
};

export default Note;
