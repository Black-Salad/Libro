import React from "react";
import Button from "../components/common/Button";
import BreadCrumbs from "../components/common/BreadCrumbs";

const Setting = () => {
  return (
    <div>
      <BreadCrumbs breads={["설정"]} />
      설정
      <Button>버튼</Button>
    </div>
  );
};

export default Setting;
