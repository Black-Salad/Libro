import React, { useState, useRef } from "react";
import axios from "axios";
import { LIBRO_API_URL } from "../../constants/config";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
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
  const apiUrl = `${LIBRO_API_URL}/api/user/`;

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
  const onkeyup = () => {
    if (!isEmail(email)) setError(true);
    else setError(false);
  };

  // 비밀번호 랜덤값 만들기
  const newPW = () => {
    var newPassword;
    var randomValue = "abcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 1; i <= 8; i++) {
      var randomPoint = Math.round(Math.random() * 34 + 1);
      var Pwdchar = randomValue.charAt(randomPoint);
      if (i === 1) {
        newPassword = Pwdchar;
      } else {
        newPassword += Pwdchar;
      }
    }
    return newPassword;
  };

  // 비밀번호 이메일로 보내기
  const passwordFind = () => {
    const passwordHash = require("password-hash");
    const newPassWord = newPW();
    const hashedPassword = passwordHash.generate(newPassWord);

    axios
      .get(apiUrl + `?user_email=${encodeURIComponent(email)}`)
      .then((response) => {
        if (error) {
          alert("이메일 형식을 확인해 주시길 바랍니다.");
        } else if (response.data.length === 0) {
          alert("가입 이력이 없는 계정입니다.");
        } else if (response.data.user_state === false) {
          alert("탈퇴 계정입니다.");
        } else {
          axios
            .patch(apiUrl + `${response.data[0].user_id}/`, {
              user_pw: hashedPassword,
            })
            .then((response) => {
              console.log(response.data);
              axios
                .post(
                  apiUrl +
                    `password/?user_email=${encodeURIComponent(
                      response.data.user_email
                    )}&user_pw=${encodeURIComponent(newPassWord)}`
                )
                .then((response) => {
                  console.log(response.data);
                  alert(
                    "임시 비밀번호가 발급되었습니다. 이메일을 확인해주세요 😊"
                  );
                });
            })
            .catch((response) => {
              console.log(response);
            });
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
              label="Email Address"
              autoFocus
              onChange={(e) => OnChange(e)}
              onKeyUp={() => onkeyup()}
              error={error}
              helperText={error ? "이메일을 확인해주시길 바랍니다." : ""}
            />
            <Box fontSize={11}>
              임시 비밀번호를 발급하고자 하는 계정의 이메일을 입력해 주세요.
            </Box>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={() => passwordFind()}
            >
              임시 비밀번호 발급받기
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
