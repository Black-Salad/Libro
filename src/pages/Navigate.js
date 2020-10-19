import React from "react";
import BreadCrumbs from "../components/common/BreadCrumbs";
import Layout from "../components/Layout";
import { Cookies } from "react-cookie";
import FollowUser from "../components/user/FollowUser";
import BestNote from "../components/note/BestNote";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import BestBooks from "../components/common/BestBooks";
import FollowRecommend from "../components/user/FollowRecommend";
const Navigate = () => {
  const divStyle = {
    width: "100%",
    maxHeight: "300px",
    overflow: "hidden",
  };
  const imgStyle = {
    height: "100%",
    margin: "auto",
  };
  const bestStyle = {
    fontWeight: 900,
    textAlign: "center",
  };

  const cookies = new Cookies();

  return (
    <Layout>
      <BreadCrumbs breads={["둘러보기"]} />
      <Carousel showArrows={false} showThumbs={false}>
        <div style={divStyle}>
          <img src="/img/ad1.jpg" alt="" style={imgStyle} />
        </div>
        <div style={divStyle}>
          <img src="/img/ad2.jpg" alt="" style={imgStyle} />
        </div>
        <div style={divStyle}>
          <img src="/img/ad3.jpg" alt="" style={imgStyle} />
        </div>
        <div style={divStyle}>
          <img src="/img/ad4.jpg" alt="" style={imgStyle} />
        </div>
      </Carousel>
      <hr />
      <h5 className="mb-4 mt-4 text-secondary" style={bestStyle}>
        최근 4주 인기 책 📚
      </h5>
      <BestBooks />
      <hr />
      <h5 className="mb-4 mt-4 text-secondary" style={bestStyle}>
        베스트 독서록 ✍
      </h5>
      <BestNote />
      <hr />
      <h5 className="mb-4 mt-4 text-secondary" style={bestStyle}>
        리브로어들을 팔로우해보세요 👬
      </h5>
      <FollowRecommend />
      {/* <FollowUser userIDX={cookies.get("loginUserId")} /> */}
    </Layout>
  );
};

export default Navigate;
