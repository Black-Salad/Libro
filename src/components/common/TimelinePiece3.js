import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import UserButton from "./UserButton";

const convDateStr = (dateStr) => {
  var y = dateStr.substr(0, 4);
  var m = dateStr.substr(5, 2);
  var d = dateStr.substr(8, 2);
  return y + "년 " + m + "월 " + d + "일";
};
const timeForToday = (value) => {
  const today = new Date();
  const timeValue = new Date(value);

  const betweenTime = Math.floor(
    (today.getTime() - timeValue.getTime()) / 1000 / 60
  );
  if (betweenTime < 1) return "방금전";
  if (betweenTime < 60) return `${betweenTime}분 전`;

  const betweenTimeHour = Math.floor(betweenTime / 60);
  if (betweenTimeHour < 24) return `${betweenTimeHour}시간 전`;

  const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
  if (betweenTimeDay < 365) return `${betweenTimeDay}일 전`;

  return `${Math.floor(betweenTimeDay / 365)}년 전`;
};
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    color: "#585858",
    fontSize: "90%",
  },
  image: {
    width: "100%",
    border: "1px solid lightgrey",
    boxShadow: "2px 2px 4px #999",
    cursor: "pointer",
  },
  btitle: {
    width: "100%",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  topic: {
    padding: 0,
    marginBottom: 15,
  },
  tDate: {
    fontSize: 12,
    color: "#999",
    marginLeft: 10,
  },
}));
const TimelinePiece3 = ({ timeline, onOpenModal }) => {
  const classes = useStyles();
  return (
    <Paper className={classes.paper}>
      <div className={`${classes.topic} col-12`}>
        <UserButton
          img={timeline.user_id.user_img}
          name={timeline.user_id.user_name}
          userId={timeline.user_id.user_id}
        />
        님이{" "}
        <b
          className={classes.btitle}
          onClick={() => onOpenModal(timeline.star_id.book_id)}
        >
          {timeline.star_id.book_id.book_title}
        </b>{" "}
        책에 관심을 표시했습니다.⭐
        <span className={classes.tDate}>
          {timeForToday(timeline.tl_add_date)}
        </span>
      </div>
    </Paper>
  );
};

export default TimelinePiece3;
