import React from "react";
import BreadCrumbs from "../../components/common/BreadCrumbs";
import NoteDetail from "../../components/note/NoteDetail";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout";

const ViewnoteDetail = ({ match }) => {
  return (
    <Layout>
      <BreadCrumbs
        breads={[<Link to="/viewnotes">내 독서록</Link>, "독서록 상세"]}
      />

      {/* note contents */}
      <NoteDetail noteIDX={match.params.noteIDX} />
    </Layout>
  );
};

export default ViewnoteDetail;
