import React from "react";

const Bookprofile = (props) => {
  //---------------------------- Bookprofile close ----------------------------
  const close = () => {
    var bprofile = document.querySelector("#searchModal");
    bprofile.style.display = "none";
    document.querySelector("#modal-back").innerHTML = "";
  };
  return (
    <>
      <div class="modal" id="searchModal" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-dialog-scrollable" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h6 class="modal-title" id="scrollableModalLabel">
                {/* 여기에 책제목을 넣거나 빈란으로 */}
                {props.BookTitle}
              </h6>
              {/* 팝업창 close */}
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={close}
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div class="inner-main-body">
              <div class="row">
                <div class="col-lg-6 col-md-6 col-sm-6 mb-4">
                  <img
                    src=""
                    style={{
                      maxWidth: "500px",
                      width: "100%",
                      height: "200px",
                    }}
                  />
                </div>
                <div class="col-lg-6 col-md-6 col-sm-6 mb-4">
                  <h5 style={{ fontWeight: 600 }}>
                    {/* 책제목 / 저자  */}
                    {props.BookTitle} /{props.BookWriter}
                  </h5>
                  {/* 책소개  */}
                  {props.BookIntroduction}
                </div>
                <div class="col-lg-12 col-md-12 col-sm-12 mb-2">
                  <div style={{ textAlign: "center" }}>
                    <button type="button" class="btn btn-primary has-icon">
                      책꽂이로 담기
                    </button>
                    &nbsp;&nbsp;
                    <button type="button" class="btn btn-danger has-icon">
                      책꽂이에서 빼기
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="modal-back"></div>
    </>
  );
};

export default Bookprofile;
