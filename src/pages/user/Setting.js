import React from "react";
import BreadCrumbs from "../../components/common/BreadCrumbs";
import Layout from "../../components/Layout";

const Setting = () => {
  return (
    <Layout>
      <BreadCrumbs breads={["설정"]} />
      설정
    </Layout>
  );
};

export default Setting;
