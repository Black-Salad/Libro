import React, { useState, useRef } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { LIBRO_API_URL } from "../../constants/config";
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
import { LIBRO_API_URL } from "../../constants/config";

const Register = () => {
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

  const [user, setUser] = useState({
    user_email: "",
    user_pw: "",
    user_name: "",
  });
  const [pwConfirm, setPwConfirm] = useState("");
  const apiUrl1 = `${LIBRO_API_URL}/api/user/`;
  const apiUrl2 = `${LIBRO_API_URL}/api/user/?user_email=${encodeURIComponent(
    user.user_email
  )}`;
  const apiUrl3 = `${LIBRO_API_URL}/api/user/?user_name=${encodeURIComponent(
    user.user_name
  )}`;
  const checkbox = useRef(null);
  let history = useHistory();

  const [error, setError] = useState({
    user_name: false,
    user_email: false,
    user_pw: false,
  });

  // 값이 바뀔 때마다 onchange
  const userOnChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    console.log(user.user_name);
    // confirm(e);
  };

  const pwConfirmOnChange = (e) => {
    setPwConfirm(e.target.value);
  };

  // 정상값 확인
  const confirm = (e) => {
    switch (e.target.name) {
      case "user_name":
        axios.get(apiUrl3).then((response) => {
          console.log(user.user_name);
          console.log(response.data);
          if (response.data.length !== 0) {
            setError({ ...error, user_name: true });
          } else {
            if (user.user_name.length <= 1)
              setError({ ...error, user_name: true });
            else setError({ ...error, user_name: false });
          }
        });

        break;
      case "user_email":
        if (!isEmail(user.user_email)) setError({ ...error, user_email: true });
        else setError({ ...error, user_email: false });
        break;
      case "user_pw":
        if (user.user_pw !== pwConfirm) setError({ ...error, user_pw: true });
        else setError({ ...error, user_pw: false });
        break;
      case "user_pw_confirm":
        if (user.user_pw !== pwConfirm) setError({ ...error, user_pw: true });
        else setError({ ...error, user_pw: false });
        break;
      default:
    }
  };

  // 정상값 확인
  const onkeyup = (e) => {
    switch (e.target.name) {
      case "user_name":
        axios.get(apiUrl3).then((response) => {
          console.log(user.user_name);
          console.log(response.data);
          if (response.data.length !== 0) {
            setError({ ...error, user_name: true });
          } else {
            if (user.user_name.length <= 1)
              setError({ ...error, user_name: true });
            else setError({ ...error, user_name: false });
          }
        });
        break;
      case "user_email":
        if (!isEmail(user.user_email)) setError({ ...error, user_email: true });
        else setError({ ...error, user_email: false });
        break;
      case "user_pw":
        if (user.user_pw !== pwConfirm) setError({ ...error, user_pw: true });
        else setError({ ...error, user_pw: false });
        break;
      case "user_pw_confirm":
        if (user.user_pw !== pwConfirm) setError({ ...error, user_pw: true });
        else setError({ ...error, user_pw: false });
        break;
      default:
    }
  };

  // 이메일 형식확인
  const isEmail = (email) => {
    const emailRegex = /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    return emailRegex.test(email);
  };

  // 회원가입 user테이블에 저장
  const register = () => {
    console.log(user);
    if (
      user.user_name.length === 0 ||
      user.user_email.length === 0 ||
      user.user_pw.length === 0
    ) {
      alert("공란을 입력바랍니다.");
      return false;
    }

    if (error.user_name && error.user_email && error.user_pw) {
      alert("정확히 입력바랍니다");
      return false;
    }

    if (!checkbox.current.checked) {
      alert("개인 정보 정책에 동의바랍니다.");
      return false;
    }

    axios.get(apiUrl2).then((response) => {
      console.log(response);
      if (response.data.length === 0) {
        axios
          .post(apiUrl1, user)
          .then(() => {
            alert("회원가입이 완료되었습니다.");
            history.push("/login");
          })
          .catch(() => {
            alert("서버오류");
          });
      } else {
        alert("사용 중인 이메일입니다.");
        setError({ ...error, user_email: true });
      }
    });
  };

  return (
    <>
      <Container component="main" maxWidth="xs" className={classes.main}>
        <Box className={classes.paper} boxShadow={3}>
          <Typography component="h1" variant="h5">
            <Icon.Feather /> Libro
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              name="user_name"
              label="Username"
              autoFocus
              onChange={(e) => userOnChange(e)}
              onKeyUp={(e) => onkeyup(e)}
              error={error.user_name}
              helperText={
                error.user_name
                  ? "최소 2글자 이상 또는 사용 중인 이름입니다."
                  : ""
              }
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="Email Address"
              name="user_email"
              onChange={(e) => userOnChange(e)}
              onKeyUp={(e) => onkeyup(e)}
              error={error.user_email}
              helperText={
                error.user_email ? "이메일을 확인해주시길 바랍니다." : ""
              }
            />

            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              name="user_pw"
              label="Password"
              type="password"
              onChange={(e) => userOnChange(e)}
              onKeyUp={(e) => onkeyup(e)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="Password Confirmation"
              type="password"
              name="user_pw_confirm"
              onChange={(e) => pwConfirmOnChange(e)}
              onKeyUp={(e) => onkeyup(e)}
              error={error.user_pw}
              helperText={
                error.user_pw ? "비밀번호를 확인해주시길 바랍니다." : ""
              }
            />
            <FormControlLabel
              control={<Checkbox color="primary" />}
              label={<Box fontSize={14}>개인 정보 정책에 동의합니다</Box>}
              inputRef={checkbox}
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={() => register()}
            >
              회원가입
            </Button>
            <Grid container justify="flex-end">
              <Grid item xs>
                <Link href="/lookforpassword" variant="body2">
                  비밀번호 찾기
                </Link>
              </Grid>
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

export default Register;
