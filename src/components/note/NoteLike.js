import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

const NoteLike = (props) => {
  let now = new Date();
  let history = useHistory();

  const loginUserId = 1;
  const loginUserName = "test01";
  const loginUserEmail = "test01@naver.com";

  const apiUrl4 = `http://localhost:8000/api/note/like?note_id=${props.noteIDX}&user_id=${loginUserId}`;
  const apiUrl5 = `http://localhost:8000/api/note/like/`;
  const apiUrl6 = `http://localhost:8000/api/note/like?note_id=${props.noteIDX}&like_state=true`;

  const [like, setLike] = useState({
    note_id: props.noteIDX,
    user_id: loginUserId,
    like_date: now.toISOString(),
    like_state: true,
  });
  const [likeUser, setLikeUser] = useState({
    like_id: 0,
  });
  const [likeCnt, setLikeCnt] = useState(0);

  //값 가져와서 setNote
  useEffect(() => {
    axios.get(apiUrl4).then((response) => {
      console.log("like", response.data);
      if (response.data.length == 1) setLikeUser(response.data[0]);
      else setLikeUser(response.data);
    });

    axios.get(apiUrl6).then((response) => {
      console.log("likecnt", response.data.length);
      setLikeCnt(response.data.length);
    });
  }, []);

  //좋아요버튼
  const noneLikeButton =
    "https://iconmonstr.com/wp-content/g/gd/makefg.php?i=../assets/preview/2012/png/iconmonstr-favorite-2.png&r=255&g=0&b=0";
  const likeButton =
    "https://iconmonstr.com/wp-content/g/gd/makefg.php?i=../assets/preview/2012/png/iconmonstr-favorite-1.png&r=255&g=0&b=0";

  const onClickLike = () => {
    console.log(like);

    if (likeUser.length == 0) {
      axios.post(apiUrl5, like).then((response) => {
        console.log("like 저장", response);
        history.go(0);
      });
    } else {
      axios
        .patch(apiUrl5 + `${likeUser.like_id}/`, { like_state: true })
        .then((response) => {
          console.log("like", response);
          history.go(0);
        });
    }
  };

  const onClickNoneLike = () => {
    console.log("likeUser", likeUser[0]);

    axios
      .patch(apiUrl5 + `${likeUser.like_id}/`, { like_state: false })
      .then((response) => {
        console.log("none like", response);
        history.go(0);
      });
  };

  return (
    <>
      {likeUser.like_state ? (
        <span
          className="btn has-icon btn-xs  text-danger"
          onClick={onClickNoneLike}
        >
          <img
            src={likeButton}
            style={{ width: "15px" }}
            alt=""
            className="mr-1"
          />
          {likeCnt}
        </span>
      ) : (
        <span
          className="btn has-icon btn-xs  text-danger"
          onClick={onClickLike}
        >
          <img
            src={noneLikeButton}
            style={{ width: "15px" }}
            alt=""
            className="mr-1"
          />
          {likeCnt}
        </span>
      )}
    </>
  );
};

export default NoteLike;
