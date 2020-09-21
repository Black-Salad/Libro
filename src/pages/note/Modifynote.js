import React from "react";
import BreadCrumbs from "../../components/common/BreadCrumbs";
import NoteForm from "../../components/note/NoteForm";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout";

const Modifynote = ({ match }) => {
  return (
    <Layout>
      <BreadCrumbs
        breads={[<Link to="/viewnotes">내 독서록</Link>, "독서록 수정"]}
      />

      <NoteForm status={"modify"} noteIDX={match.params.noteIDX} />
    </Layout>
  );
};

export default Modifynote;
