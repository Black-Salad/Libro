import React from "react";
import { Plus, Search, ChevronLeft } from "react-feather";
import { Link } from "react-router-dom";
import BreadCrumbs from "../components/common/BreadCrumbs";
import ViewnoteDetailCom from "../components/common/ViewnoteDetail";

const ViewnoteDetail = () => {
  return (
    <>
      <BreadCrumbs breads={["내 독서록"]} />

      {/* note contents */}
      <ViewnoteDetailCom />
    </>
  );
};

export default ViewnoteDetail;
