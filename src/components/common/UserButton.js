import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { LIBRO_API_URL } from "../../constants/config";

const useStyles = makeStyles(() => ({
  profile: {
    width: 30,
    height: 30,
    borderRadius: "50%",
    objectFit: "cover",
  },
}));

const UserButton = (props) => {
  const classes = useStyles();
  const [user, setUser] = useState({});
  useEffect(() => {
    // console.log("userButton", props.userId);
    axios.get(`${LIBRO_API_URL}/api/user/${props.userId}/`).then((response) => {
      setUser(response.data);
    });
  }, [props]);
  return (
    <Link to={`/room/${props.userId}`}>
      <img
        alt=""
        src={user.user_img}
        className={`${classes.profile} rounded-circle mr-2`}
      />
      {user.user_name}
    </Link>
  );
};

export default UserButton;
