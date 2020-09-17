import React, { useState, useEffect } from "react";
import { Plus, Search, ChevronLeft } from "react-feather";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import Moment from "react-moment";

const NoteComment = (props) => {
  let history = useHistory();
  const apiUrl = `http://localhost:8000/api/user/${props.user_id}`;

  const [user, setUser] = useState({});
  useEffect(() => {
    axios
      .get(apiUrl)
      .then((response) => {
        console.log("user Data", response);
        setUser(response.data);
      })
      .catch((response) => {
        console.error(response);
      });
  }, []);

  return (
    <>
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
                <strong>{user.user_name}</strong>

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
    </>
  );
};

export default NoteComment;
