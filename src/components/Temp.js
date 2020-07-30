import React from "react";
import axios from "axios";
import { KAKAO_API_URL, KAKAO_API_KEY } from "../constants/config";

const searchBook = (query, sort) => {
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
        size: 8,
      },
      timeout: 3000,
    })
    .then((response) => {
      console.log(response);
    })
    .catch((err) => {
      if (err.response.status == "404") {
        alert("검색하신 책이 존재하지 않습니다.");
      }
    });
};

// url: `${KAKAO_API_URL}`,
// params: {
//     query: "유시민",
//     sort: "recency",
//     size: 6,
//   },

const Temp = () => {
  return (
    <div>
      <button onClick={() => searchBook("유시민", "recency")}>검색</button>
    </div>
  );
};

export default Temp;
