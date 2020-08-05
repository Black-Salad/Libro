import React from "react";
import BreadCrumbs from "../components/common/BreadCrumbs";
import NoteForm from "../components/common/NoteForm";
import { Link } from "react-router-dom";

const Writenote = () => {
  return (
    <>
      <BreadCrumbs
        breads={[
          <Link to="/viewnotes">내 독서록</Link>,
          <Link to="/wirtenote">독서록 쓰기</Link>,
        ]}
      />
      <NoteForm status={"write"} />
    </>
  );
};

export default Writenote;
