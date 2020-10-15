import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  profile: {
    width: 30,
    height: 30,
    borderRadius: "50%",
    objectFit: "cover",
  },
}));

const UserButton = ({ img, name, userId }) => {
  const classes = useStyles();
  return (
    <Link to={`/room/${userId}`}>
      <img
        alt=""
        src={img}
        className={`${classes.profile} rounded-circle mr-2`}
      />
      {name}
    </Link>
  );
};

export default UserButton;
