import React from "react";
import Bookprofile from "../components/common/Bookprofile";
import BreadCrumbs from "../components/common/BreadCrumbs";
import NoteForm from "../components/common/NoteForm";

const Writenote = () => {
  //---------------------------- Bookprofile open ----------------------------
  const onOpen = () => {
    var bprofile = document.querySelector("#searchModal");
    bprofile.style.display = "block";
    document.querySelector("body").classList.add("modal-open");
    document.querySelector("#modal-back").innerHTML =
      '<div class="modal-backdrop fade show"></div>';
  };

  return (
    <>
      <BreadCrumbs breads={["독서록 쓰기"]} />

      <NoteForm status={"write"} />

      <Bookprofile />
    </>
  );
};

export default Writenote;
