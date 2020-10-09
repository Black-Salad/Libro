import React, { useState, useEffect } from "react";
import { Cookies } from "react-cookie";
import axios from "axios";

import Button from "@material-ui/core/Button";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import PersonAddDisabledIcon from "@material-ui/icons/PersonAddDisabled";

const FollowButton = (props) => {
  const cookies = new Cookies();
  const loginUserId = cookies.get("loginUserId");

  const apiUrl1 = `http://localhost:8000/api/user/follow/`;
  const [followCnt, setFollowCnt] = useState();
  const [follow, setFollow] = useState({
    user_id: loginUserId,
    target_user_id: props.userIDX,
  });

  // useEffect
  useEffect(() => {
    axios
      .get(apiUrl1 + `?user_id=${loginUserId}&target_user_id=${props.userIDX}`)
      .then((response) => {
        setFollowCnt(response.data.length);
        if (response.data.length !== 0) setFollow(response.data[0]);
      });
  }, []);

  // follow 버튼
  const followBtn = () => {
    axios.post(apiUrl1, follow).then((response) => {
      setFollowCnt(1);
      setFollow(response.data);
    });
  };

  // unfollow 버튼
  const unFollowBtn = () => {
    axios.delete(apiUrl1 + `${follow.follow_id}/`).then((response) => {
      setFollowCnt(0);
    });
  };

  return (
    <>
      {(function () {
        if (props.userIDX === loginUserId) {
          return null;
        } else if (followCnt === 0) {
          return (
            <Button
              variant="contained"
              color="primary"
              startIcon={<PersonAddIcon />}
              className="mr-2"
              onClick={() => followBtn()}
            >
              Follow
            </Button>
          );
        } else {
          return (
            <Button
              variant="contained"
              color="secondary"
              startIcon={<PersonAddDisabledIcon />}
              onClick={() => unFollowBtn()}
            >
              UnFollow
            </Button>
          );
        }
      })()}
    </>
  );
};

export default FollowButton;