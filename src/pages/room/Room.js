import React from "react";
import Note from "../../components/note/Note";
import BreadCrumbs from "../../components/common/BreadCrumbs";
import { Link } from "react-router-dom";

const room = () => {
  return (
    <>
      <BreadCrumbs breads={[<Link to="/room">Room</Link>]} />
      <div class="card">
        <div class="card-body">
          <div class="d-flex flex-column align-items-center text-center">
            <img
              src="../../../dist/img/user.svg"
              alt="Admin"
              class="rounded-circle"
              width="150"
            />
            <div class="mt-3">
              <h4>Kenneth Valdez</h4>
              <p class="text-secondary mb-1">Full Stack Developer</p>
              <p class="text-muted font-size-sm">Bay Area, San Francisco, CA</p>
              <button class="btn btn-primary">Follow</button>
              <button class="btn btn-outline-primary">Message</button>
            </div>
          </div>
        </div>
      </div>

      {/* 독서록리스트 */}
      <Note />
    </>
  );
};

export default room;
