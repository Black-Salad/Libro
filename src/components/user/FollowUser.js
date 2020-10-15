import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
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
    <div className="row row-cols-2 row-cols-sm-3 row-cols-md-3 row-cols-xl-4 gutters-sm">
      {follow.slice(0, more.limit).map((item, index) => {
        return (
          <React.Fragment key={index}>
            <div className="col mb-3">
              <div className="card">
                <img
                  src="/img/pattern/pattern1-wide.png"
                  alt="Cover"
                  className="card-img-top"
                />
                <Link
                  to={`/room/${item.target_user_id.user_id}`}
                  className="card-body text-center"
                >
                  <img
                    src={item.target_user_id.user_img}
                    style={{
                      width: "100px",
                      height: "100px",
                      marginTop: "-65px",
                      objectFit: "cover",
                    }}
                    alt="User"
                    className="img-fluid img-thumbnail rounded-circle border-0 mb-3"
                  />
                  <h5 className="card-title">
                    {item.target_user_id.user_name}
                  </h5>
                  <p className="text-secondary mb-1">
                    {item.target_user_id.user_email}
                  </p>
                  <p className="text-muted font-size-sm">
                    {item.target_user_id.user_introduction}
                  </p>
                </Link>
                <div className="card-footer" style={{ margin: "auto" }}>
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
