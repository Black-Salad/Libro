import React, { useState } from "react";
import { Search } from "react-feather";
import axios from "axios";
import { KAKAO_API_URL, KAKAO_API_KEY } from "../constants/config";
import BreadCrumbs from "../components/common/BreadCrumbs";
import Bookitem from "../components/common/Bookitem";

const Searchbooks = () => {
  // 임시 데이터입니다.
  const [myBooks, setMyBooks] = useState([
    {
      b_id: 1,
      b_state: "reading",
      b_title: "아가미",
      b_isbn: "1162203390 9791162203392",
      b_img: "/img/book_thumbnail/아가미.jpg",
    },
    {
      b_id: 2,
      b_state: "finished",
      b_title: "여행의이유",
      b_isbn: "8936433695 9788936433697",
      b_img: "/img/book_thumbnail/여행의이유.jpg",
    },
    {
      b_id: 3,
      b_state: "finished",
      b_title: "파과",
      b_isbn: "1162203625 9791162203620",
      b_img: "/img/book_thumbnail/파과.jpg",
    },
    {
      b_id: 4,
      b_state: "interested",
      b_title: "돈만 모으는 여자는 위험하다",
      b_isbn: "8960869031 9788960869035",
      b_img: "/img/book_thumbnail/돈만모으는여자는위험하다.jpg",
    },
    {
      b_id: 5,
      b_state: "interested",
      b_title: "젠더는 해롭다",
      b_isbn: "1190158027 9791190158022",
      b_img: "/img/book_thumbnail/젠더는해롭다.jpg",
    },
    {
      b_id: 6,
      b_state: "finished",
      b_title: "글쓰기 특강",
      b_isbn: "8965133521 9788965133520",
      b_img: "/img/book_thumbnail/글쓰기특강.jpg",
    },
  ]);

  // 검색 키워드 스테이트 정의 및 초기값 세팅
  const [keyword, setKeyword] = useState("");
  // 검색 결과 저장하는 스테이트
  const [result, setResult] = useState({
    loading: false, /// ############ 검토 필요
    itemCount: null,
    itemList: [],
  });

  const onSearchBook = (query, sort) => {
    const url = `${KAKAO_API_URL}/v3/search/book`;
    axios
      .get(url, {
        headers: {
          // "Content-Type": "application/json; charset=utf-8",
          // Host: "dapi.kakao.com",
          Authorization: `KakaoAK ${KAKAO_API_KEY}`,
        },
        params: {
          query: `${query}`,
          sort: `${sort}`,
          //size: 8,
        },
        timeout: 3000,
      })
      .then(({ data }) => {
        console.log(data);
        setResult({
          loading: true,
          itemCount: data.meta.total_count,
          itemList: data.documents,
        });
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

  const onChangeKeyword = (e) => {
    setKeyword(e.target.value);
  };

  const displayList = result.itemList.map((item, index) => (
    <li key={index} className="list-group-item d-flex align-items-center">
      <div className="media">
        <img src={item.thumbnail} />
        <div className="media-body ml-2">
          <h5 className="font-size-sm mb-0">{item.title}</h5>
          <span className="small text-secondary">
            {item.authors.join(", ") + " 저"}
          </span>
          <div>
            {}
            <span className="badge badge-info"></span>
          </div>
        </div>
      </div>
    </li>
  ));

  return (
    <div>
      <BreadCrumbs breads={["책 검색"]} />
      {/* <div className="d-flex align-items-center collapse transition-none show blog-toolbar"> */}

      {/* 검색창 구역 */}
      <div className="col-lg-8 col-md-8 col-sm-8 mb-3">
        <input
          type="text"
          className="form-control"
          name="keyword"
          value={keyword}
          onChange={onChangeKeyword}
          // onKeyPress={onKeyPressFunction}
          placeholder="제목 / 저자명 / 출판사"
        />
        <button
          className="btn btn-light btn-sm btn-icon ml-auto mr-1"
          onClick={() => onSearchBook(keyword, "recency")}
        >
          <Search />
        </button>
      </div>

      <ul className="list-group list-group-example">
        {result.itemCount !== 0 ? (
          displayList
        ) : (
          <li className="list-group-item d-flex align-items-center">
            검색하신 책이 존재하지 않습니다.
          </li>
        )}
      </ul>
      {/* </div> */}
      {/* <Temp /> */}
    </div>
  );
};

export default Searchbooks;
