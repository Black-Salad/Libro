import React, { useState } from "react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
// import BookStar from "./BookStar";
import { axios } from "axios";
import { KAKAO_API_URL, KAKAO_API_KEY } from "../../constants/config";

import { Fab } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import StarIcon from "@material-ui/icons/Star";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import CheckIcon from "@material-ui/icons/Check";
import CreateIcon from "@material-ui/icons/Create";

const Bookprofile = (props) => {
  const { open, setModalState, currentBook } = props;

  const onCloseModal = () => {
    setModalState({ open: false });
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={onCloseModal}
        center
        classNames={{ modal: "modal-content" }}
        styles={{ overlay: { zIndex: 2000 } }}
      >
        <div className="inner-main-body" style={{ fontSize: "120%" }}>
          <div className="row">
            <div className="col-lg-3 col-md-3 col-sm-3 col-4 mb-1">
              <img
                src={currentBook.thumbnail}
                style={{
                  maxWidth: "100px",
                  width: "100%",
                  height: "auto",
                  border: "1px solid lightgrey",
                  boxShadow: "1px 1px 1px 1px grey",
                }}
              />
            </div>
            <div className="col-lg-9 col-md-9 col-sm-9 col-8 mb-3">
              <h6 style={{ fontSize: "85%", fontWeight: 600 }}>
                {currentBook.title}
              </h6>
              <div style={{ fontSize: "70%", marginBottom: "10px" }}>
                {currentBook.authors.join(", ") +
                  " 저 / " +
                  currentBook.publisher}
              </div>

              {currentBook.contents !== undefined ? (
                <div
                  style={{
                    fontSize: "60%",
                    textOverflow: "ellipsis",
                    overflow: "auto",
                    maxHeight: "150px",
                  }}
                >
                  {currentBook.contents}
                  <a href={currentBook.url} target="_blank">
                    ...더보기
                  </a>
                </div>
              ) : null}
            </div>
          </div>
        </div>
        <div>
          {/* <BookStar /> */}
          {/* <Fab size="small" color="default" title="관심 책에 추가">
            <StarIcon />
          </Fab> */}
          <Fab size="small" color="primary" title="이 책 읽기">
            <AddIcon />
          </Fab>
          <Fab size="small" color="primary" title="완독했어요">
            <CheckIcon />
          </Fab>
          <Fab size="small" color="secondary" title="책꽂이에서 삭제">
            <RemoveIcon />
          </Fab>
          <Fab size="small" color="default" title="독서록 쓰기">
            <CreateIcon />
          </Fab>
        </div>
      </Modal>
    </div>
  );
};

export default Bookprofile;
