import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import BreadCrumbs from "../components/common/BreadCrumbs";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import { Cookies } from "react-cookie";
import Bookprofile from "../components/common/Bookprofile";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  content: {
    margin: theme.spacing(1),
  },
  image: {
    width: "100%",
  },
  profile: {
    width: "40px",
  },
  btitle: {
    "&:hover": {
      textDecoration: "underline",
    },
  },
}));

const Timeline = () => {
  const cookies = new Cookies();
  const LoginUser = cookies.get("loginUserId");
  const classes = useStyles();
  // 타임라인 스테이트
  const [timelineList, setTimelineList] = useState([]);
  // 모달 스테이트
  const [modalState, setModalState] = useState({ open: false });
  // 현재 선택한 책 정보 저장하는 스테이트 (책 상세 모달용)
  const [currentBook, setCurrentBook] = useState({
    idx: 0,
    kind: "",
    title: "",
    authors: [""],
    isbn: "",
    thumbnail: "",
    publisher: "",
    contents: "",
    url: "",
  });
  // 모달 팝업 오픈 이벤트
  const onOpenModal = (book) => {
    setModalState({ open: true });
    setCurrentBook({
      idx: book.book_id,
      title: book.book_title,
      authors: book.book_author.split(","),
      isbn: book.book_isbn,
      thumbnail: book.book_img,
      publisher: book.book_publisher,
      contents: book.book_desc,
      url: book.book_url,
    });
    console.log(currentBook);
  };

  useEffect(() => {
    const apiUrl = `http://localhost:8000/api/timeline/join/?user=${LoginUser}`;

    axios
      .get(apiUrl)
      .then((response) => {
        console.log(response.data);
        setTimelineList(response.data);
      })
      .catch((response) => {
        console.error(response);
      });
  }, [LoginUser]);
  return (
    <Layout>
      <BreadCrumbs breads={[<Link to="/timeline">타임라인</Link>]} />
      <Grid container spacing={3}>
        <Grid item xs={12}>
          {timelineList.map((timeline, index) => {
            const userProfile = (
              <Link to={`/room/${timeline.user_id.user_id}`}>
                <img
                  alt=""
                  src={timeline.user_id.user_img}
                  className={`${classes.profile} rounded-circle mr-2`}
                />
                {timeline.user_id.user_name}
              </Link>
            );
            switch (timeline.tl_kind) {
              case "1":
                return (
                  <Paper className={classes.paper} key={index}>
                    <p>
                      {userProfile}
                      님이{" "}
                      <b
                        className={classes.btitle}
                        onClick={() => onOpenModal(timeline.shelf_id.book_id)}
                      >
                        {timeline.shelf_id.book_id.book_title}
                      </b>{" "}
                      책을 책꽂이에 담았습니다.📚
                    </p>
                    <Grid className={classes.content} container spacing={3}>
                      <Grid item xs={2}>
                        <img
                          alt=""
                          className={classes.image}
                          src={timeline.shelf_id.book_id.book_img}
                          onClick={() => onOpenModal(timeline.shelf_id.book_id)}
                        />
                      </Grid>
                      <Grid item xs={10}>
                        {timeline.shelf_id.start_date}부터 읽는 중 🏃‍♀️
                      </Grid>
                    </Grid>
                  </Paper>
                );
              case "2":
                return (
                  <Paper className={classes.paper} key={index}>
                    <p>
                      {userProfile}님이{" "}
                      <b
                        className={classes.btitle}
                        onClick={() => onOpenModal(timeline.shelf_id.book_id)}
                      >
                        {timeline.shelf_id.book_id.book_title}
                      </b>{" "}
                      책을 완독했습니다! 👏👏👏
                    </p>
                    <Grid className={classes.content} container spacing={3}>
                      <Grid item xs={2}>
                        <img
                          className={classes.image}
                          src={timeline.shelf_id.book_id.book_img}
                          onClick={() => onOpenModal(timeline.shelf_id.book_id)}
                        />
                      </Grid>
                      <Grid item xs={10}>
                        {timeline.shelf_id.start_date} ~{" "}
                        {timeline.shelf_id.end_date} 완독 👍
                      </Grid>
                    </Grid>
                  </Paper>
                );
              case "3":
                return (
                  <Paper className={classes.paper} key={index}>
                    <p>
                      {userProfile}님이{" "}
                      <b
                        className={classes.btitle}
                        onClick={() => onOpenModal(timeline.star_id.book_id)}
                      >
                        {timeline.star_id.book_id.book_title}
                      </b>{" "}
                      책에 관심을 표시했습니다.💕
                    </p>
                    <Grid className={classes.content} container spacing={3}>
                      <Grid item xs={2}>
                        <img
                          alt=""
                          className={classes.image}
                          src={timeline.star_id.book_id.book_img}
                          onClick={() => onOpenModal(timeline.star_id.book_id)}
                        />
                      </Grid>
                    </Grid>
                  </Paper>
                );
              case "4":
                return (
                  <Paper className={classes.paper} key={index}>
                    <p>
                      {userProfile}님이{" "}
                      <b
                      // className={classes.btitle}
                      // onClick={() => onOpenModal(timeline.shelf_id.book_id)}
                      >
                        {timeline.note_id.book_title}
                      </b>
                      를 읽고 독서록을 등록했습니다.✍
                    </p>
                    <Grid className={classes.content} container spacing={3}>
                      <Grid item xs={2}>
                        <img
                          className={classes.image}
                          src={timeline.note_id.book_img}
                          // onClick={() => onOpenModal(timeline.star_id.book_id)}
                        />
                      </Grid>
                      <Grid item xs={10}>
                        <b>
                          <Link
                            to={`/viewnotedetail/${timeline.note_id.note_id}`}
                          >
                            {timeline.note_id.note_title}
                          </Link>{" "}
                        </b>
                        <p>{timeline.note_id.note_contents}</p>
                      </Grid>
                    </Grid>
                  </Paper>
                );
              case "5": // 독서록 좋아요
              case "6": // 독서록 댓글 등록
              case "7": // 팔로우
                return (
                  <Paper className={classes.paper} key={index}>
                    <p>{userProfile}님이 </p>
                  </Paper>
                );
              default:
                break;
            }
          })}

          <Paper className={classes.paper}>
            jade님이 test1님을 팔로우합니다.
          </Paper>
        </Grid>
      </Grid>
      <Bookprofile
        open={modalState.open}
        setModalState={setModalState}
        currentBook={currentBook}
      />
    </Layout>
  );
};

export default Timeline;
