import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import Moment from "react-moment";

const NoteComment = (props) => {
  let history = useHistory();

  const loginUserId = 1;
  const loginUserName = "test01";
  const loginUserEmail = "test01@naver.com";

  const commentDelate = (comment_id) => {
    const apiUrl = `http://localhost:8000/api/note/comment/${comment_id}/`;
    if (window.confirm("해당 댓글을 삭제하시겠습니까?")) {
      axios
        .patch(apiUrl, { comment_state: false })
        .then((response) => {
          console.log("comment delete Data", response);
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
                <Link to="" data-toggle="collapse" data-target=".forum-content">
                  <img
                    src="../img/user1.svg"
                    className="mr-1 rounded-circle"
                    width="50"
                    alt="User"
                  />
                </Link>
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
            type="button"
            className="btn btn-xs has-icon text-danger"
            onClick={() => commentDelate(props.item.comment_id)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-trash mr-1"
            >
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            </svg>
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
