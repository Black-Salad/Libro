import React from "react";
import BreadCrumbs from "../components/common/BreadCrumbs";
import ViewnoteDetailCom from "../components/common/ViewnoteDetail";

const ViewnoteDetail = ({ match }) => {
  return (
    <>
      <BreadCrumbs breads={["내 독서록"]} />

      {/* note contents */}
      <ViewnoteDetailCom idx={match.params.idx} />
    </>
  );
};

export default ViewnoteDetail;
