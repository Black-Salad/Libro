import React, { useState, useEffect } from "react";
import axios from "axios";

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Box from "@material-ui/core/Box";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import Button from "@material-ui/core/Button";

const RoomProfile = (props) => {
  const apiUrl1 = `http://localhost:8000/api/user/${props.userIDX}`;
  const [user, setUser] = useState({});

  useEffect(() => {
    axios
      .get(apiUrl1)
      .then((response) => {
        setUser(response.data);
      })
      .catch((response) => {
        console.error(response);
      });
  }, []);

  const useStyles = makeStyles(() => ({
    card: {
      display: "flex",
      marginBottom: "1rem",
    },
    cardDetails: {
      flex: 1,
    },
    cardMedia: {
      width: 160,
    },
  }));
  const classes = useStyles();

  return (
    <Box>
      <Card className={classes.card}>
        <img className={classes.cardMedia} src={user.user_img} alt="" />
        <div className={classes.cardDetails}>
          <CardContent>
            <Typography component="h2" variant="h5">
              {user.user_name}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              {user.user_email}
            </Typography>
            <Typography variant="subtitle1" paragraph>
              {user.user_introduction}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              startIcon={<PersonAddIcon />}
            >
              Follow
            </Button>
          </CardContent>
        </div>
      </Card>
    </Box>
  );
};

export default RoomProfile;
