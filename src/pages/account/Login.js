import React from "react";
// import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import Backdrop from "@material-ui/core/Backdrop";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

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

  const theme = createMuiTheme({
    palette: {
      background: {
        default: "#1A2038",
      },
    },
  });

  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs" className={classes.main}>
        {/* 배경색 바꾸고 싶으면 주석 풀고 default 변경 */}
        {/* <CssBaseline /> */}
        {/* <Backdrop className={classes.backdrop} /> */}
        <Box className={classes.paper} boxShadow={3}>
          <Typography component="h1" variant="h5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path>
              <line x1="16" y1="8" x2="2" y2="22"></line>
              <line x1="17.5" y1="15" x2="9" y2="15"></line>
            </svg>
            Libro
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label={<Box fontSize={14}>아이디 저장</Box>}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              로그인
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
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
    </ThemeProvider>
  );
};

export default LoginTest;
