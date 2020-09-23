import React from "react";
import Note from "../../components/note/Note";
import BreadCrumbs from "../../components/common/BreadCrumbs";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

const room = (props) => {
  return (
    <Layout>
      <BreadCrumbs breads={[<Link to="/room">Room</Link>]} />
      <div className="card mb-3">
        <div className="card-body">
          <div className="d-flex flex-column align-items-center text-center">
            <img
              src="../../../dist/img/user.svg"
              alt="Admin"
              className="rounded-circle"
              width="150"
            />
            <div className="mt-3">
              <h4>Kenneth Valdez</h4>
              <p className="text-secondary mb-1">Full Stack Developer</p>
              <p className="text-muted font-size-sm">
                Bay Area, San Francisco, CA
              </p>
              <button className="btn btn-primary">Follow</button>
            </div>
          </div>
        </div>
      </div>

      <Link to="#" style={{ float: "right" }}>
        more
        <ArrowForwardIosIcon />
      </Link>
      <section>
        <p className="text-secondary font-size-m">책꽂이</p>
        <p className="text-secondary font-size-sm">등록된 책이 없습니다</p>
      </section>

      <hr />
      <Link to="#" style={{ float: "right" }}>
        more
        <ArrowForwardIosIcon />
      </Link>
      <section>
        <p className="text-secondary font-size-m">독서록</p>

        <Note />
      </section>
    </Layout>
  );
};

export default room;
