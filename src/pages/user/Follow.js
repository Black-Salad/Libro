import React from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout";
import BreadCrumbs from "../../components/common/BreadCrumbs";
import FollowUser from "../../components/user/FollowUser";

const Follow = ({ match }) => {
  return (
    <Layout>
      <BreadCrumbs
        breads={[<Link to={`/Follow/${match.params.userIDX}`}>Following</Link>]}
      />
      <FollowUser userIDX={match.params.userIDX} />
    </Layout>
  );
};

export default Follow;
