import React from "react";
import BreadCrumbs from "../../components/common/BreadCrumbs";
import NoteForm from "../../components/note/NoteForm";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout";
import queryString from "query-string";

const Writenote = ({ location }) => {
  const query = queryString.parse(location.search);
  const { bookIdx } = query;
  return (
    <Layout>
      <BreadCrumbs
        breads={[
          // <Link to="/viewnotes">내 독서록</Link>,
          <Link to="/writenote">독서록 쓰기</Link>,
        ]}
      />
      <NoteForm status={"write"} bookIdx={bookIdx} />
    </Layout>
  );
};

export default Writenote;
