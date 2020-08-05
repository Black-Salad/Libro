import React from "react";
import BreadCrumbs from "../components/common/BreadCrumbs";
import NoteForm from "../components/common/NoteForm";

const Writenote = () => {
  return (
    <>
      <BreadCrumbs breads={["독서록 쓰기"]} />

      <NoteForm status={"write"} />
    </>
  );
};

export default Writenote;
