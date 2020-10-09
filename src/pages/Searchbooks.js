import React, { useState, useRef } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import Pagination from "@material-ui/lab/Pagination";

import { KAKAO_API_URL, KAKAO_API_KEY } from "../constants/config";
import BreadCrumbs from "../components/common/BreadCrumbs";
import Bookprofile from "../components/common/Bookprofile";

const useStyles = makeStyles((theme) => ({
  searchWin: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: "75%",
    height: "40px",
    marginBottom: "15px",
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
      // margin: "20px auto",
      // width: "100%",
    },
  },
}));
const scrollToTop = (ref) => window.scrollTo(0, ref.current.offsetTop);
const Searchbooks = () => {
  const classes = useStyles();
  // 모달 스테이트
  const [modalState, setModalState] = useState({ open: false });
  const onOpenModal = (book) => {
    setModalState({ open: true });
    setCurrentBook(book);
  };
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
  const [result, setResult] = useState({
    loading: false, /// ############ 검토 필요
    itemCount: null,
    itemList: [],
  });
  const onChangeKeyword = (e) => {
    setKeyword(e.target.value);
  };

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const myRef = useRef(null);

  // 검색 AJAX 메서드
  const onSearchBook = (e, query, page) => {
    e.preventDefault();
    setCurrentPage(page);

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
        console.log(data.meta);
        setResult({
          loading: true,
          itemCount: data.meta.pageable_count,
          itemList: data.documents,
        });

        setTotalPage(Math.ceil(data.meta.pageable_count / 8));
        scrollToTop(myRef);
      })
      .catch((err) => {
        console.error(err); // 에러 표시
        setResult({
          loading: false,
          itemCount: 0,
        });
        if (err.response.status == "404") {
          alert("검색하신 책이 존재하지 않습니다.");
        }
      });
  };

  const displayList = result.itemList.map((item, index) => (
    <li
      key={index}
      className="list-group-item d-flex align-items-center"
      onClick={() => onOpenModal(item)}
    >
      <div className="media">
        <img src={item.thumbnail} />
        <div className="media-body ml-2">
          <h5 className="font-size-sm mb-0">{item.title}</h5>
          <span className="small text-secondary">
            {item.authors.join(", ") + " 저"}
          </span>
          <div>
            <span className="badge badge-info"></span>
          </div>
        </div>
      </div>
    </li>
  ));

  return (
    <div ref={myRef}>
      <BreadCrumbs breads={["책 검색"]} />
      {/* <div className="d-flex align-items-center collapse transition-none show blog-toolbar"> */}

      {/* 검색창 구역 */}
      <Paper component="form" className={classes.searchWin}>
        <InputBase
          className={classes.input}
          placeholder="제목 / 저자명 / 출판사"
          // inputProps={{ "aria-label": "search google maps" }}
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

      <ul className="list-group list-group-example">
        {result.itemCount !== 0 ? (
          displayList
        ) : (
          <li className="list-group-item d-flex align-items-center">
            검색하신 책이 존재하지 않습니다.
          </li>
        )}
      </ul>
      <Bookprofile
        open={modalState.open}
        setModalState={setModalState}
        currentBook={currentBook}
      />
      {result.loading ? (
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
      ) : null}
    </div>
  );
};

export default Searchbooks;
