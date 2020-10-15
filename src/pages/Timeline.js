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
import UserButton from "../components/common/UserButton";
import TimelinePiece1 from "../components/common/TimelinePiece1";
import TimelinePiece2 from "../components/common/TimelinePiece2";
import TimelinePiece3 from "../components/common/TimelinePiece3";
import TimelinePiece4 from "../components/common/TimelinePiece4";
import TimelinePiece5 from "../components/common/TimelinePiece5";
import TimelinePiece6 from "../components/common/TimelinePiece6";
import TimelinePiece7 from "../components/common/TimelinePiece7";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    color: "#585858",
  },
  content: {
    margin: theme.spacing(1),
  },
  image: {
    width: "100%",
  },
  btitle: {
    "&:hover": {
      textDecoration: "underline",
    },
  },
  topic: {
    padding: 0,
    marginBottom: 15,
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
            switch (timeline.tl_kind) {
              case "1": // 책꽂이 담음
                return (
                  <TimelinePiece1
                    timeline={timeline}
                    onOpenModal={onOpenModal}
                    key={index}
                  />
                );
              case "2": // 완독
                return (
                  <TimelinePiece2
                    timeline={timeline}
                    onOpenModal={onOpenModal}
                    key={index}
                  />
                );
              case "3": // 관심
                return (
                  <TimelinePiece3
                    timeline={timeline}
                    onOpenModal={onOpenModal}
                    key={index}
                  />
                );
              case "4": // 독서록 등록
                return (
                  <TimelinePiece4
                    timeline={timeline}
                    onOpenModal={onOpenModal}
                    key={index}
                  />
                );
              case "5": // 독서록 좋아요
                return <TimelinePiece5 timeline={timeline} key={index} />;
              case "6": // 독서록 댓글 등록
                return <TimelinePiece6 timeline={timeline} key={index} />;
              case "7": // 팔로우
                return <TimelinePiece7 timeline={timeline} key={index} />;
              default:
                break;
            }
          })}
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
