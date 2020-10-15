import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Cookies } from "react-cookie";
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

const LoginTest = () => {
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

  const [user, setUser] = useState({ user_email: "", user_pw: "" });
  const apiUrl = `http://localhost:8000/api/user/`;
  let history = useHistory();
  let cookies = new Cookies();
  const now = new Date();
  const checkbox = useRef(null);
  const [check, setCheck] = useState(false);

  // 아이디저장 체크박스 useEffect
  useEffect(() => {
    if (cookies.get("saveId") != null) {
      setCheck(true);
    }
  }, []);

  // 값이 바뀔 때마다 onchange
  const userOnChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // 체크박스
  const checkOnChange = (e) => {
    setCheck(e.target.checked);
  };

  // 엔터 로그인
  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      login();
    }
  };

  // 탈퇴 계정 로그인시 한달 이내 복구가능
  const restore = (res) => {
    let date = new Date(res[0].user_crea_date);
    let monthMore = new Date(res[0].user_crea_date);
    monthMore.setMonth(date.getMonth() + 1);
    if (monthMore >= new Date()) {
      if (
        window.confirm(
          "계정 탈퇴를 신청하셨습니다. 한달 이내로 복구가 가능합니다. 복구하시겠습니까?"
        )
      ) {
        axios
          .patch(apiUrl + `${res[0].user_id}/`, { user_state: true })
          .then(() => {
            alert("복구가 완료되었습니다.😊");
          });
      }
    } else {
      alert("탈퇴한 계정입니다.😯");
      axios.delete(apiUrl + `${res[0].user_id}/`);
    }
  };

  // 로그인
  const login = () => {
    // 체크박스 유무로 저장
    if (checkbox.current.checked) {
      const week = new Date().setDate(now.getDate() + 7);
      cookies.set("saveId", user.user_email, week);
    } else {
      cookies.remove("saveId");
    }

    // email,pw 확인 후 쿠키저장 후 index화면으로 이동
    axios
      .get(apiUrl + `?user_email=${user.user_email}&user_state=true`)
      .then((response) => {
        if (response.data.length === 0) {
          axios
            .get(apiUrl + `?user_email=${user.user_email}&user_state=flase`)
            .then((response) => {
              if (response.data.length === 0) {
                alert("계정 정보가 없습니다.😥");
              } else {
                restore(response.data);
              }
            });
        } else if (response.data[0].user_pw == user.user_pw) {
          cookies.set("loginUserId", response.data[0].user_id, {
            maxAge: 86400,
          });
          cookies.set("loginUserName", response.data[0].user_name, {
            maxAge: 86400,
          });
          cookies.set("loginUserEmail", response.data[0].user_email, {
            maxAge: 86400,
          });
          cookies.set("loginUserImg", response.data[0].user_img, {
            maxAge: 86400,
          });
          history.push("/");
        } else {
          alert("비밀번호를 확인바랍니다.");
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
              label="Email Address"
              name="user_email"
              onChange={(e) => userOnChange(e)}
              defaultValue={
                cookies.get("saveId") != null
                  ? cookies.get("saveId")
                  : user.user_email
              }
              autoFocus
              autoComplete="username"
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              name="user_pw"
              onChange={(e) => userOnChange(e)}
              onKeyPress={(e) => onKeyPress(e)}
              label="Password"
              type="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={
                <Checkbox
                  color="primary"
                  inputRef={checkbox}
                  checked={check}
                  onChange={(e) => checkOnChange(e)}
                />
              }
              label={<Box fontSize={14}>아이디 저장</Box>}
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={() => login()}
            >
              로그인
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/lookforpassword" variant="body2">
                  비밀번호 찾기
                </Link>
              </Grid>
              <Grid item>
                <Link href="/register" variant="body2">
                  회원가입
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

export default LoginTest;
