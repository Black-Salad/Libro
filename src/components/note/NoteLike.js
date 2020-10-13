import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Cookies } from "react-cookie";
import axios from "axios";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";

const NoteLike = (props) => {
  let now = new Date();
  let history = useHistory();
  const cookies = new Cookies();
  const loginUserId = cookies.get("loginUserId");

  const apiUrl1 = `http://localhost:8000/api/note/like?note_id=${props.noteIDX}`;
  const apiUrl2 = `http://localhost:8000/api/note/like?note_id=${props.noteIDX}&user_id=${loginUserId}`;
  const apiUrl3 = `http://localhost:8000/api/note/like/`;
  const apiUrl4 = `http://localhost:8000/api/user/alarm/`;

  const [like, setLike] = useState({});
  const [likeUser, setLikeUser] = useState({
    note_id: props.noteIDX,
    user_id: loginUserId,
    like_date: now.toISOString(),
  });
  const [likeCnt, setLikeCnt] = useState(0);
  const [alarm, setAlarm] = useState({
    user_id: loginUserId,
    target_user_id: props.userIDX,
    note_id: props.noteIDX,
    alarm_type: 2,
    alarm_status: true,
  });

  //useEffect
  useEffect(() => {
    axios.get(apiUrl2).then((response) => {
      setLike(response.data);
    });

    axios.get(apiUrl1).then((response) => {
      setLikeCnt(response.data.length);
    });
  }, []);

  //좋아요버튼
  const onClickLike = () => {
    axios.post(apiUrl3, likeUser).then((response) => {
      setLikeCnt(likeCnt + 1);
      setLike([response.data]);

      // 본인이 한 게시물엔 알람 안가게
      if (loginUserId != props.userIDX) {
        axios.post(apiUrl4, alarm).then((response) => {
          console.log("Alarm", response.data);
        });
      }
      axios.post(`http://localhost:8000/api/timeline/`, {
        user_id: loginUserId,
        tl_kind: "5",
        like_id: response.data.like_id,
      });
    });
  };

  const onClickNoneLike = () => {
    axios.delete(apiUrl3 + `${like[0].like_id}/`).then((response) => {
      setLikeCnt(likeCnt - 1);
      setLike(response.data);
    });
  };

  return (
    <>
      {like.length == 1 ? (
        <span
          className="btn has-icon btn-xs  text-danger"
          onClick={onClickNoneLike}
        >
          <FavoriteIcon color="secondary" />
          &nbsp;{likeCnt}
        </span>
      ) : (
        <span
          className="btn has-icon btn-xs  text-danger"
          onClick={onClickLike}
        >
          <FavoriteBorderIcon color="secondary" />
          &nbsp;{likeCnt}
        </span>
      )}
    </>
  );
};

export default NoteLike;
