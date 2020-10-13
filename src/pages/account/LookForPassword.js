import React, { useState, useRef } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import * as Icon from "react-feather";

const LookForPassword = () => {
  // style
  const useStyles = makeStyles((theme) => ({
    paper: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      background: "white",
      padding: 30,
      borderRadius: 16,
    },
    form: {
      width: "100%",
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(2, 0, 2),
      height: "50px",
    },
    main: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      paddingTop: theme.spacing(15),
    },
  }));
  const classes = useStyles();

  const [email, setEmail] = useState();
  const [error, setError] = useState(false);

  // 값이 바뀔 때마다 onchange
  const OnChange = (e) => {
    setEmail(e.target.value);
  };

  // 이메일 형식확인
  const isEmail = (email) => {
    const emailRegex = /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    return emailRegex.test(email);
  };

  // 정상값 확인
  const onkeyup = (e) => {};

  return (
    <>
      <Container component="main" maxWidth="xs" className={classes.main}>
        <Box className={classes.paper} boxShadow={3}>
          <Typography component="h1" variant="h5">
            <Icon.Feather /> Libro
          </Typography>
          <Box fontSize={14}>
            비밀번호를 찾고자 하는 계정의 이메일을 입력해 주세요.
          </Box>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              name="user_name"
              label="Username"
              autoFocus
              onChange={(e) => OnChange(e)}
              onKeyUp={(e) => onkeyup(e)}
              error={error.user_name}
              helperText={
                error.user_name
                  ? "최소 2글자 이상 또는 사용 중인 이름입니다."
                  : ""
              }
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              // onClick={() => register()}
            >
              회원가입
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  로그인
                </Link>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Container>
      <Box mt={10}>
        <Typography variant="body2" color="textSecondary" align="center">
          {"Copyright © "}
          <Link color="inherit" href="#">
            Libro
          </Link>{" "}
          2020.
        </Typography>
      </Box>
    </>
  );
};

export default LookForPassword;
