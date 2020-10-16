import React, { useState, useEffect } from "react";
import { Cookies } from "react-cookie";
import axios from "axios";
import { LIBRO_API_URL } from "../../constants/config";

import Button from "@material-ui/core/Button";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import PersonAddDisabledIcon from "@material-ui/icons/PersonAddDisabled";
import { LIBRO_API_URL } from "../../constants/config";

const FollowButton = (props) => {
  const cookies = new Cookies();
  const loginUserId = cookies.get("loginUserId");

  const apiUrl1 = `${LIBRO_API_URL}/api/user/follow/`;
  const apiUrl4 = `${LIBRO_API_URL}/api/user/alarm/`;
  const [followCnt, setFollowCnt] = useState();
  const [follow, setFollow] = useState({
    user_id: loginUserId,
    target_user_id: props.userIDX,
  });
  const [alarm, setAlarm] = useState({
    user_id: loginUserId,
    target_user_id: props.userIDX,
    alarm_type: 1,
    alarm_status: true,
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

      // timeline
      axios.post(`${LIBRO_API_URL}/api/timeline/`, {
        user_id: loginUserId,
        tl_kind: "7",
        follow_id: response.data.follow_id,
      });
      // 알람
      axios.post(apiUrl4, alarm).then((response) => {
        console.log("Alarm", response.data);
      });
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
        if (props.userIDX == loginUserId) {
          return null;
        } else if (followCnt === 0) {
          return (
            <Button
              variant="contained"
              color="primary"
              startIcon={<PersonAddIcon />}
              className="mb-1"
              size="small"
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
              className="mb-1"
              size="small"
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
