import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import UserButton from "./UserButton";
import { Link } from "react-router-dom";

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
  noteContent: {
    marginTop: 6,
    fontSize: 12,
    lineHeight: 1.3,
    overflow: "hidden",
    maxHeight: "5.2em",
    textAligh: "left",
    // wordWrap: "break-word",
    display: "-webkit-box",
    WebkitLineClamp: 3,
    webkitBoxOrient: "vertical",
  },
}));
const TimelinePiece4 = ({ timeline, onOpenModal }) => {
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
          onClick={() => onOpenModal(timeline.note_id.book_id)}
        >
          {timeline.note_id.book_title}
        </b>
        를 읽고{" "}
        <Link to={`/viewnotedetail/${timeline.note_id.note_id}`}>
          <u>독서록</u>
        </Link>
        을 등록했습니다.✍
        <span className={classes.tDate}>
          {timeForToday(timeline.tl_add_date)}
        </span>
      </div>
      <div className={`media`}>
        <div className="col-3 col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-1">
          <img
            alt=""
            className={classes.image}
            src={timeline.note_id.book_img}
            onClick={() => onOpenModal(timeline.note_id.book_id)}
          />
        </div>
        <div
          className={`col-9 col-xs-10 col-sm-10 col-md-10 col-lg-10 col-xl-11`}
        >
          <b>
            <Link to={`/viewnotedetail/${timeline.note_id.note_id}`}>
              {timeline.note_id.note_title}
            </Link>{" "}
          </b>
          <p className={classes.noteContent}>
            {timeline.note_id.note_contents}
          </p>
        </div>
      </div>
    </Paper>
  );
};

export default TimelinePiece4;
