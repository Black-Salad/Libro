import React from "react";
import Bookprofile from "../components/common/Bookprofile";
import BreadCrumbs from "../components/common/BreadCrumbs";
import NoteForm from "../components/common/NoteForm";

const Modifynote = ({ match }) => {
  return (
    <>
      <BreadCrumbs breads={["독서록 쓰기"]} />

      <NoteForm status={"modify"} idx={match.params.idx} />

      <Bookprofile />
    </>
  );
};

export default Modifynote;
