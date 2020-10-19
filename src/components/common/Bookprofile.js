import React from "react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { Cookies } from "react-cookie";
import BookButtons from "./BookButtons";
import { makeStyles } from "@material-ui/core/styles";
import { LIBRO_API_URL } from "../../constants/config";

const useStyles = makeStyles((theme) => ({
  bImage: {
    width: "100%",
    border: "1px solid lightgrey",
    boxShadow: "2px 2px 4px #999",
    padding: "0px",
    // maxWidth: "120px",
  },
  bTitle: {
    fontSize: "85%",
    fontWeight: 600,
  },
  bAuthor: {
    fontSize: "70%",
    marginBottom: "10px",
  },
  bContent: {
    fontSize: "60%",
    overflow: "auto",
    maxHeight: "150px",
    whiteSpace: "pre-line",
  },
  modalBody: {
    fontSize: "120%",
    padding: 0,
  },
  modalDiv: {
    padding: "0px 10px",
  },
}));

const Bookprofile = (props) => {
  const classes = useStyles();
  const { open, setModalState, currentBook, changed, setChanged } = props;

  const onCloseModal = () => {
    setModalState(false);
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={onCloseModal}
        center
        classNames={{ modal: "modal-content" }}
        styles={{ overlay: { zIndex: 1050 } }}
        showCloseIcon={false}
        blockScroll={false}
      >
        <div className={`${classes.modalBody} inner-main-body`}>
          <div className="media">
            <div
              className={`${classes.modalDiv} col-lg-2 col-md-2 col-sm-2 col-3 mb-1`}
            >
              <img
                className={classes.bImage}
                alt=""
                src={
                  currentBook.thumbnail == ""
                    ? LIBRO_API_URL + "/img/unnamed.png"
                    : currentBook.thumbnail
                }
              />
            </div>
            <div className={`col-lg-10 col-md-10 col-sm-10 col-9 mb-3`}>
              <h6 className={classes.bTitle}>{currentBook.title}</h6>
              <div className={classes.bAuthor}>
                {currentBook.authors.join(", ") +
                  " 저 / " +
                  currentBook.publisher}
              </div>
              {currentBook.contents !== undefined ? (
                <div className={classes.bContent}>
                  {currentBook.contents}
                  <a href={currentBook.url} target="_blank">
                    ...상세보기
                  </a>
                </div>
              ) : null}
            </div>
          </div>
        </div>
        <BookButtons
          currentBook={currentBook}
          setModalState={setModalState}
          setChanged={setChanged}
          changed={changed}
        />
      </Modal>
    </div>
  );
};

export default Bookprofile;
