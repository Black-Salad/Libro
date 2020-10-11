import React from "react";
import Layout from "../components/Layout";
import BreadCrumbs from "../components/common/BreadCrumbs";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(2),
  },
  content: {
    margin: theme.spacing(1),
  },
  image: {
    width: "100%",
  },
}));

const Timeline = () => {
  const classes = useStyles();
  return (
    <Layout>
      <BreadCrumbs breads={[<Link to="/timeline">타임라인</Link>]} />
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            jade님이 test1님을 팔로우합니다.
          </Paper>
          <Paper className={classes.paper}>
            jade님이 [위저드 베이커리] 책을 책꽂이에 담았습니다.
            <Grid className={classes.content} container spacing={3}>
              <Grid item xs={2}>
                <img
                  className={classes.image}
                  src="http://localhost:8000/img/user.svg"
                />
              </Grid>
              <Grid item xs={10}>
                2020-10-11부터 읽는 중
              </Grid>
            </Grid>
          </Paper>
          <Paper className={classes.paper}>
            jade님이 [위저드 베이커리] 책을 관심 책에 추가했습니다.
            <Grid className={classes.content} container spacing={3}>
              <Grid item xs={1}>
                <img
                  className={classes.image}
                  src="http://localhost:8000/img/user.svg"
                />
              </Grid>
              <Grid item xs={1}>
                <img
                  className={classes.image}
                  src="http://localhost:8000/img/user.svg"
                />
              </Grid>
              <Grid item xs={10}>
                2020-10-11부터 읽는 중
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Timeline;
