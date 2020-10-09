import React from "react";
import BreadCrumbs from "../components/common/BreadCrumbs";
import Layout from "../components/Layout";

const Navigate = () => {
  return (
    <Layout>
      <BreadCrumbs breads={["둘러보기"]} />
      둘러보기
    </Layout>
  );
};

export default Navigate;
