import React, { useState, useEffect } from "react";
import axios from "axios";

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import Box from "@material-ui/core/Box";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import PersonAddDisabledIcon from "@material-ui/icons/PersonAddDisabled";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

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
      width: 160,
      borderRadius: "50%!important",
    },
  }));
  const classes = useStyles();

  return (
    <Box>
      <Card className={classes.card}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4} md={3} lg={2}>
            <img className={classes.cardMedia} src={user.user_img} alt="" />
          </Grid>
          <Grid item xs={12} sm={8} md={9} lg={10}>
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
              className="mr-2"
            >
              Follow
            </Button>
            <Button
              variant="contained"
              color="secondary"
              startIcon={<PersonAddDisabledIcon />}
            >
              UnFollow
            </Button>
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
};

export default RoomProfile;
