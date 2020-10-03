import React from "react";
import { Link, useHistory } from "react-router-dom";
import { Cookies } from "react-cookie";
import axios from "axios";
import Moment from "react-moment";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";

const NoteComment = (props) => {
  let history = useHistory();
  const cookies = new Cookies();
  const loginUserId = cookies.get("loginUserId");

  const commentDelate = (comment_id) => {
    const apiUrl = `http://localhost:8000/api/note/comment/${comment_id}/`;
    if (window.confirm("해당 댓글을 삭제하시겠습니까?")) {
      axios
        .patch(apiUrl, { comment_state: false })
        .then(() => {
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
      {loginUserId != props.item.user_id ? (
        <div className="chat-msg">
          <div className="popover popover-static bs-popover-right">
            <div className="arrow"></div>

            <div className="popover-body">
              <div className="media">
                <img
                  src={props.item.user_img}
                  className="mr-1 rounded-circle"
                  width="50"
                  alt="User"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    history.push(`/room/${props.item.user_id}`);
                  }}
                />
                <div className="media-body ml-2">
                  <strong>{props.item.user_name}</strong>

                  <p>{props.item.comment_contents}</p>
                  <time className="chat-time">
                    <Moment format={"YYYY/MM/DD HH:mm:ss"}>
                      {props.item.comment_date}
                    </Moment>
                  </time>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="chat-msg right">
          <button
            className="btn btn-xs has-icon text-danger"
            onClick={() => commentDelate(props.item.comment_id)}
          >
            <DeleteOutlinedIcon color="secondary" />
          </button>
          <div className="popover popover-static bs-popover-left">
            <div className="arrow"></div>
            <div
              className="popover-body"
              style={{ minWidth: "130px", textAlign: "right" }}
            >
              <div className="media">
                <div className="media-body ml-2">
                  <p>{props.item.comment_contents}</p>
                  <time
                    className="chat-time"
                    style={{ whiteSpace: "nowrap", right: "10px" }}
                  >
                    <Moment format={"YYYY/MM/DD HH:mm:ss"}>
                      {props.item.comment_date}
                    </Moment>
                  </time>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NoteComment;
