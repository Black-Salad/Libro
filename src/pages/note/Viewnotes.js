import React from "react";
import NoteMine from "../../components/note/NoteMine";
import BreadCrumbs from "../../components/common/BreadCrumbs";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout";

const Viewnotes = () => {
  return (
    <Layout>
      <BreadCrumbs breads={[<Link to="/viewnotes">내 독서록</Link>]} />

      {/* 독서록리스트 */}
      <NoteMine />
    </Layout>
  );
};

export default Viewnotes;
