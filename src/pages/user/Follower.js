import React from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout";
import BreadCrumbs from "../../components/common/BreadCrumbs";
import FollowerUser from "../../components/user/FollowerUser";

const Follower = ({ match }) => {
  return (
    <Layout>
      <BreadCrumbs
        breads={[<Link to={`/follow/${match.params.userIDX}`}>Follower</Link>]}
      />

      <FollowerUser userIDX={match.params.userIDX} />
    </Layout>
  );
};

export default Follower;
