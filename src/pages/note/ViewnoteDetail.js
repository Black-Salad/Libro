import React from "react";
import BreadCrumbs from "../../components/common/BreadCrumbs";
import ViewnoteDetailCom from "../../components/note/ViewnoteDetail";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout";

const ViewnoteDetail = ({ match }) => {
  return (
    <Layout>
      <BreadCrumbs
        breads={[<Link to="/viewnotes">내 독서록</Link>, "독서록 상세"]}
      />

      {/* note contents */}
      <ViewnoteDetailCom noteIDX={match.params.noteIDX} />
    </Layout>
  );
};

export default ViewnoteDetail;
