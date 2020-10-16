import React from "react";
import BreadCrumbs from "../components/common/BreadCrumbs";
import Layout from "../components/Layout";
import { Cookies } from "react-cookie";
import FollowUser from "../components/user/FollowUser";
import BestNote from "../components/note/BestNote";

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
      <div className="bxslider">
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
      </div>
      <h4 className="mb-3 mt-5" style={bestStyle}>
        베스트 독서록
      </h4>
      <BestNote />
      <hr />
      <h4 className="mb-3 mt-4" style={bestStyle}>
        내가 팔로우한 친구들
      </h4>
      <FollowUser userIDX={cookies.get("loginUserId")} />
    </Layout>
  );
};

export default Navigate;
