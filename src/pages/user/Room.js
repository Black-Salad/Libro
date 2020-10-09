import React from "react";
import Layout from "../../components/Layout";
import BreadCrumbs from "../../components/common/BreadCrumbs";
import Note from "../../components/note/Note";
import RoomProfile from "../../components/user/RoomProfile";
import { Link } from "react-router-dom";

const Room = ({ match }) => {
  return (
    <Layout>
      <BreadCrumbs
        breads={[<Link to={`/room/${match.params.userIDX}`}>Room</Link>]}
      />

      <RoomProfile userIDX={match.params.userIDX} />

      <section>
        <p className="font-size-m">책꽂이</p>
        <p className="text-secondary font-size-sm">등록된 책이 없습니다</p>
      </section>

      <hr />

      <section>
        <p className="font-size-m">독서록</p>
        <Note userIDX={match.params.userIDX} />
      </section>
    </Layout>
  );
};

export default Room;
