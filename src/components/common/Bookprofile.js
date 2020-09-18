import React, { useState } from "react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { axios } from "axios";
import { KAKAO_API_URL, KAKAO_API_KEY } from "../../constants/config";

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
        <div className="col-lg-12 col-md-12 col-sm-12 mb-2">
          <div style={{ textAlign: "center" }}>
            <button
              type="button"
              className="btn btn-primary has-icon"
              style={{ margin: "5px" }}
            >
              책꽂이로 담기
            </button>
            &nbsp;&nbsp;
            <button
              type="button"
              className="btn btn-danger has-icon"
              style={{ margin: "5px" }}
            >
              책꽂이에서 빼기
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Bookprofile;
