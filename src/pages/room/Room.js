import React from "react";
import Note from "../../components/note/Note";
import BreadCrumbs from "../../components/common/BreadCrumbs";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout";

const room = () => {
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

      {/* 독서록리스트 */}
      <Note />
    </Layout>
  );
};

export default room;
