import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { Cookies } from "react-cookie";
import axios from "axios";
import Moment from "react-moment";
import NoteLike from "./NoteLike";
import RemoveRedEyeOutlinedIcon from "@material-ui/icons/RemoveRedEyeOutlined";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";

const Note = () => {
  let history = useHistory();
  const cookies = new Cookies();
  const loginUserId = cookies.get("loginUserId");
  const [notes, setNotes] = useState([]);

  //useEffect
  useEffect(() => {
    const apiUrl = `http://localhost:8000/api/note/?user_id=${loginUserId}`;
    axios
      .get(apiUrl)
      .then((response) => {
        setNotes(response.data);
      })
      .catch((response) => {
        console.error(response);
      });
  }, []);

  //삭제
  const onDelete = (noteIDX) => {
    const apiUrl = `http://localhost:8000/api/note/${noteIDX}/`;
    if (window.confirm("해당 독서록을 삭제하시겠습니까?")) {
      axios
        .patch(apiUrl, { note_state: false })
        .then((response) => {
          alert("삭제완료");
          history.go(0);
        })
        .catch((response) => {
          console.error(response);
        });
    }
  };

  return (
    <>
      <div className="row gutters-sm">
        {notes.map((item, index) => {
          return (
            <React.Fragment key={index}>
              <div className="col-6 col-sm-4 col-md-3 col-xl-3 mb-3">
                <div className="card h-100">
                  <img
                    src={item.book_img}
                    alt="..."
                    style={{ width: "70%", margin: "auto" }}
                  />
                  <div className="card-body">
                    <h6 className="card-title">
                      <Link to={`./viewnotedetail/${item.note_id}`}>
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

                    <span
                      className="btn btn-link has-icon btn-xs bigger-130 text-danger"
                      onClick={() => onDelete(item.note_id)}
                      title="삭제"
                    >
                      <DeleteOutlinedIcon color="secondary" />
                    </span>
                  </div>
                </div>
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </>
  );
};

export default Note;
