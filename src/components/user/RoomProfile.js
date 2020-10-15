import React, { useState, useEffect } from "react";
import axios from "axios";
import FollowButton from "./FollowButton";

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";

const RoomProfile = (props) => {
  const apiUrl1 = `http://localhost:8000/api/user/${props.userIDX}/`;
  const apiUrl2 = `http://localhost:8000/api/user/follow/`;
  const [user, setUser] = useState({});
  const [follower, setFollower] = useState();
  const [following, setFollowing] = useState();

  useEffect(() => {
    axios.get(apiUrl1).then((response) => {
      setUser(response.data);
    });
    axios.get(apiUrl2 + `?user_id=${props.userIDX}`).then((response) => {
      console.log(response.data);
      setFollowing(response.data.length);
    });
    axios.get(apiUrl2 + `?target_user_id=${props.userIDX}`).then((response) => {
      console.log(response.data);
      setFollower(response.data.length);
    });
  }, []);

  const useStyles = makeStyles((theme) => ({
    card: {
      display: "flex",
      marginBottom: "1rem",
      padding: "1rem",
      textAlign: "center",
      [theme.breakpoints.up("sm")]: {
        textAlign: "left",
      },
    },
    cardMedia: {
      width: 180,
      height: 180,
      borderRadius: "50%!important",
      objectFit: "cover",
    },
    cardName: {
      "@media (max-width: 599px)": {
        width: "100%",
      },
      "@media (min-width: 599px)": {
        marginRight: "1rem",
      },
    },
  }));
  const classes = useStyles();

  return (
    <Box>
      <Card className={classes.card}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4} md={4} lg={3}>
            <img className={classes.cardMedia} src={user.user_img} alt="" />
          </Grid>
          <Grid item xs={12} sm={8} md={8} lg={9}>
            <Grid container>
              <Typography
                component="h2"
                variant="h5"
                className={classes.cardName}
              >
                {user.user_name}
              </Typography>
              <Grid item sm={3} xs={12}>
                <FollowButton userIDX={props.userIDX} />
              </Grid>
            </Grid>
            <Link to={`/follower/${props.userIDX}`}>
              팔로워 <b>{follower}</b>
            </Link>{" "}
            <Link to={`/follow/${props.userIDX}`}>
              팔로잉 <b>{following}</b>
            </Link>
            <hr />
            <Typography variant="subtitle1" color="textSecondary">
              {user.user_email}
            </Typography>
            <Typography variant="subtitle1" paragraph>
              {user.user_introduction} <br />
            </Typography>
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
};

export default RoomProfile;
