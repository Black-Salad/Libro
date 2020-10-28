import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { LIBRO_API_URL } from "../../constants/config";
import FollowButton from "./FollowButton";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import Button from "@material-ui/core/Button";
import { Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Cookies } from "react-cookie";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    color: "#585858",
    fontSize: "90%",
    textAlign: "center",
  },
  subTitleArea: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
}));

const FollowRecommend = () => {
  const classes = useStyles();
  const cookies = new Cookies();
  const loginUserId = cookies.get("loginUserId");

  const [followBtnClicked, setFollowBtnClicked] = useState(false);
  const [recomUsers, setRecomUsers] = useState([]);
  useEffect(() => {
    axios
      .get(`${LIBRO_API_URL}/api/user/recommend/?user=${loginUserId}`)
      .then((response) => {
        setRecomUsers(response.data);
      });
  }, []);
  return (
    <>
      <div className="row row-cols-2 row-cols-sm-3 row-cols-md-3 row-cols-xl-4 gutters-sm">
        {recomUsers.map((item, index) => {
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
                    to={`/room/${item.user_id}`}
                    className="card-body text-center"
                  >
                    <img
                      src={item.user_img}
                      style={{
                        width: "100px",
                        height: "100px",
                        marginTop: "-65px",
                        objectFit: "cover",
                      }}
                      alt="User"
                      className="img-fluid img-thumbnail rounded-circle border-0 mb-3"
                    />
                    <h5 className="card-title">{item.user_name}</h5>
                    <p className={`text-secondary mb-1 ${classes.subTitleArea}`}>{item.user_email}</p>
                    <p className="text-muted font-size-sm">
                      {item.user_introduction}
                    </p>
                  </Link>
                  <div className="card-footer" style={{ margin: "auto" }}>
                    <FollowButton
                      userIDX={item.user_id}
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
      {recomUsers.length == 0 ? (
        <Paper className={classes.paper}>
          <div style={{ color: "grey", margin: "10px auto" }}>
            팔로우할 리브로 회원이 없습니다.😥
            <br />
            <Link to={`follow/${loginUserId}`}>
              내가 팔로우 중인 친구들 보러가기
            </Link>
          </div>
        </Paper>
      ) : null}
    </>
  );
};

export default FollowRecommend;
