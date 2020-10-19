import React, { useState, useRef } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import Pagination from "@material-ui/lab/Pagination";
import Layout from "../components/Layout";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";

import {
  KAKAO_API_URL,
  KAKAO_API_KEY,
  LIBRO_API_URL,
} from "../constants/config";
import BreadCrumbs from "../components/common/BreadCrumbs";
import Bookprofile from "../components/common/Bookprofile";
import { Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(1),
    cursor: "pointer",
  },
  searchWin: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    marginBottom: "30px",
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  paging: {
    "& > *": {
      marginTop: theme.spacing(2),
    },
  },
  bImage: {
    width: "100%",
    border: "1px solid lightgrey",
    boxShadow: "2px 2px 4px #999",
    maxWidth: "120px",
  },
  // bTitle: {
  //   marginTop: 2
  // },
  contents: {
    fontSize: "10px",
    marginTop: 7,
    lineHeight: 1.2,
    overflow: "hidden",
    maxHeight: "6em",
    textAligh: "left",
    // wordWrap: "break-word",
    display: "-webkit-box",
    WebkitLineClamp: 3,
    webkitBoxOrient: "vertical",
  },
}));
// const scrollToTop = (ref) => window.scrollTo(0, ref.current.offsetTop);
const Searchbooks = () => {
  const classes = useStyles();
  // 모달 스테이트
  const [modalState, setModalState] = useState(false);
  const onOpenModal = (book) => {
    setModalState(true);
    setCurrentBook(book);
  };
  const [changed, setChanged] = useState(false);
  // 현재 선택한 책 정보 저장하는 스테이트
  const [currentBook, setCurrentBook] = useState({
    idx: 0,
    kind: "",
    title: "",
    authors: [""],
    isbn: "",
    thumbnail: "",
  });

  // 검색 키워드 스테이트 정의 및 초기값 세팅
  const [keyword, setKeyword] = useState("");
  // 검색 결과 저장하는 스테이트
  const [result, setResult] = useState([]);
  const onChangeKeyword = (e) => {
    setKeyword(e.target.value);
  };

  // Pagination
  const [currentPage, setCurrentPage] = useState(0);
  const [isEnd, setIsEnd] = useState(true);
  const myRef = useRef(null);

  // 검색 AJAX 메서드
  const onSearchBook = (e, query, page) => {
    e.preventDefault();
    setCurrentPage(page);
    console.log("page", currentPage);

    if (page == 1) {
      setResult([]);
    }

    if (query === "") {
      alert("검색어를 입력하세요");
      return false;
    }
    const url = `${KAKAO_API_URL}/v3/search/book`;
    axios
      .get(url, {
        headers: {
          Authorization: `KakaoAK ${KAKAO_API_KEY}`,
        },
        params: {
          query: `${query}`,
          page: page,
          size: 8,
        },
        timeout: 3000,
      })
      .then(({ data }) => {
        if (page == 1) {
          setResult(data.documents);
        } else {
          setResult([...result, ...data.documents]);
        }
        setIsEnd(data.meta.is_end);
        // setTotalPage(Math.ceil(data.meta.pageable_count / 8)); // size = 8
        // scrollToTop(myRef);
      })
      .catch((err) => {
        console.error(err);
        setResult([]);
        setIsEnd(true);
        if (err.response.status == "404") {
          alert("검색하신 책이 존재하지 않습니다.");
        }
      });
  };

  // const onClickMore =(e)=> {
  //   // setPage(page+1);
  //   onSearchBook(e, keyword, page+1);

  // };
  const displayList = result.map((item, index) => (
    <Paper
      className={classes.paper}
      key={index}
      onClick={() => onOpenModal(item)}
    >
      <div className="media">
        <div className="col-3 col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-1">
          <img
            className={classes.bImage}
            alt=""
            src={
              item.thumbnail == ""
                ? LIBRO_API_URL + "/img/unnamed.png"
                : item.thumbnail
            }
          />
        </div>
        <div
          className={`${classes.bTitle} media-body ml-2 col-9 col-xs-10 col-sm-10 col-md-10 col-lg-10 col-xl-11`}
        >
          <h5 className="font-size-sm mb-0 text-secondary">
            <b>{item.title}</b>
          </h5>
          <span className="small text-secondary">
            {item.authors.join(", ") + " / " + item.publisher}
          </span>
          <div className={`small text-secondary ${classes.contents}`}>
            {/* {item.contents} */}
            {item.contents !== "" ? item.contents + ".." : null}
          </div>
        </div>
      </div>

      {/* </li> */}
    </Paper>
  ));

  return (
    <Layout>
      <div ref={myRef}>
        <BreadCrumbs breads={["책 검색"]} />
        {/* 검색창 구역 */}
        <Paper component="form" className={classes.searchWin}>
          <InputBase
            className={classes.input}
            placeholder="제목 / 저자명 / 출판사"
            name="keyword"
            value={keyword}
            onChange={onChangeKeyword}
          />
          <IconButton
            type="submit"
            className={classes.iconButton}
            aria-label="search"
            onClick={(e) => onSearchBook(e, keyword, 1)}
          >
            <SearchIcon />
          </IconButton>
        </Paper>

        {result.length == 0 && currentPage != 0 ? (
          <Paper className={classes.paper}>
            검색하신 책이 존재하지 않습니다.
          </Paper>
        ) : (
          displayList
        )}
        <Bookprofile
          open={modalState}
          setModalState={setModalState}
          currentBook={currentBook}
          setChanged={setChanged}
          changed={changed}
        />
        {/* {result.loading && result.itemCount !== 0 ? (
          <div className={classes.paging}>
            <Pagination
              count={totalPage}
              page={currentPage}
              size="small"
              shape="rounded"
              onChange={(event, page) => onSearchBook(event, keyword, page)}
              style={{ textAlign: "center" }}
            />
          </div>
        ) : null} */}
        {!isEnd ? (
          <Button
            fullWidth
            className="text-secondary"
            startIcon={<MoreHorizIcon />}
            onClick={(e) => onSearchBook(e, keyword, currentPage + 1)}
          >
            더보기
          </Button>
        ) : null}
      </div>
    </Layout>
  );
};

export default Searchbooks;
