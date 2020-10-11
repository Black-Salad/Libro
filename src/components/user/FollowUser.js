import React, { useState, useEffect } from "react";
import axios from "axios";

import FollowButton from "./FollowButton";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import Button from "@material-ui/core/Button";

const FollowUser = (props) => {
  const apiUrl1 = `http://localhost:8000/api/user/follow/join/`;
  const [follow, setFollow] = useState([]);
  const [more, setMore] = useState({
    limit: 6,
    show: true,
  });

  // useEffect
  useEffect(() => {
    axios.get(apiUrl1 + `?user_id=${props.userIDX}`).then((response) => {
      console.log(response.data);
      setFollow(response.data);
      setMore({ ...more, show: response.data.length > 6 ? true : false });
    });
  }, []);

  // 더보기 버튼
  const moreBtn = () => {
    console.log(follow.length);
    console.log(more.limit);
    setMore({
      show: follow.length > more.limit + 4 ? true : false,
      limit: more.limit + 4,
    });
  };

  return (
    <div class="row row-cols-2 row-cols-sm-3 row-cols-md-3 row-cols-xl-4 gutters-sm">
      {follow.slice(0, more.limit).map((item, index) => {
        return (
          <React.Fragment key={index}>
            <div class="col mb-3">
              <div class="card">
                <img
                  src="/img/pattern/pattern1-wide.png"
                  alt="Cover"
                  class="card-img-top"
                />
                <div class="card-body text-center">
                  <img
                    src={item.target_user_id.user_img}
                    style={{ width: "100px", marginTop: "-65px" }}
                    alt="User"
                    class="img-fluid img-thumbnail rounded-circle border-0 mb-3"
                  />
                  <h5 class="card-title">{item.target_user_id.user_name}</h5>
                  <p class="text-secondary mb-1">
                    {item.target_user_id.user_email}
                  </p>
                  <p class="text-muted font-size-sm">
                    {item.target_user_id.user_introduction}
                  </p>
                </div>
                <div class="card-footer">
                  <FollowButton userIDX={item.target_user_id.user_id} />
                </div>
              </div>
            </div>
          </React.Fragment>
        );
      })}
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
    </div>
  );
};

export default FollowUser;