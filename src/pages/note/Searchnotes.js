import React from "react";
import NoteSearch from "../../components/note/NoteSearch";
import BreadCrumbs from "../../components/common/BreadCrumbs";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout";

const Searchnotes = ({ match }) => {
  return (
    <Layout>
      <BreadCrumbs breads={[<Link to="/searchnotes/all">독서록 탐색</Link>]} />

      {/* 독서록리스트 */}
      <NoteSearch bookISBN={match.params.bookISBN} />
    </Layout>
  );
};

export default Searchnotes;
