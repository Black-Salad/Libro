import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { LIBRO_API_URL } from "../../constants/config";

import FollowButton from "./FollowButton";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import Button from "@material-ui/core/Button";
import { Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    color: "#585858",
    fontSize: "90%",
    textAlign: "center",
  },
}));

const FollowUser = (props) => {
  const classes = useStyles();
  const apiUrl1 = `${LIBRO_API_URL}/api/user/follow/join/`;
  const [follow, setFollow] = useState([]);
  const [nextUrl, setNextUrl] = useState(null);
  const [followBtnClicked, setFollowBtnClicked] = useState(false);

  // useEffect
  useEffect(() => {
    axios.get(apiUrl1 + `?target_user_id=${props.userIDX}`).then((response) => {
      // console.log(response.data);
      setFollow(response.data.results);
      setNextUrl(response.data.next);
    });
  }, []);

  // // 더보기 버튼
  // const moreBtn = () => {
  //   console.log(follow.length);
  //   console.log(more.limit);
  //   setMore({
  //     show: follow.length > more.limit + 4 ? true : false,
  //     limit: more.limit + 4,
  //   });
  // };

  const onClickMore = () => {
    axios
      .get(nextUrl)
      .then((response) => {
        // console.log("more", response.data);
        setFollow([...follow, ...response.data.results]);
        setNextUrl(response.data.next);
      })
      .catch((response) => {
        console.error(response);
      });
  };

  return (
    <>
      <div className="row row-cols-2 row-cols-sm-3 row-cols-md-3 row-cols-xl-4 gutters-sm">
        {follow.map((item, index) => {
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
                    to={`/room/${item.user_id.user_id}`}
                    className="card-body text-center"
                  >
                    <img
                      src={item.user_id.user_img}
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                        marginTop: "-65px",
                      }}
                      alt="User"
                      className="img-fluid img-thumbnail rounded-circle border-0 mb-3"
                    />
                    <h5 className="card-title">{item.user_id.user_name}</h5>
                    <p className="text-secondary mb-1">
                      {item.user_id.user_email}
                    </p>
                    <p className="text-muted font-size-sm">
                      {item.user_id.user_introduction}
                    </p>
                  </Link>
                  <div className="card-footer" style={{ margin: "auto" }}>
                    <FollowButton
                      userIDX={item.user_id.user_id}
                      followBtnClicked={followBtnClicked}
                      setFollowBtnClicked={setFollowBtnClicked}
                    />
                  </div>
                </div>
              </div>
            </React.Fragment>
          );
        })}
      </div>
      {nextUrl !== null ? (
        <Button
          fullWidth
          className="text-secondary"
          startIcon={<MoreHorizIcon />}
          onClick={() => onClickMore()}
        >
          더보기
        </Button>
      ) : null}
      {follow.length == 0 ? (
        <Paper className={classes.paper}>
          <div style={{ color: "grey", margin: "10px auto" }}>
            팔로워가 없습니다.
            <br />
            리브로어들과 소통하며 팔로워를 늘려보세요.👬
          </div>
        </Paper>
      ) : null}
    </>
  );
};

export default FollowUser;
