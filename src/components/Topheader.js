import React, { useEffect, useState, useRef } from "react";
import * as Icon from "react-feather";
import { Link, useHistory } from "react-router-dom";
import { Cookies } from "react-cookie";
import axios from "axios";

import HomeIcon from "@material-ui/icons/Home";
import SettingsIcon from "@material-ui/icons/Settings";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import FavoriteIcon from "@material-ui/icons/Favorite";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import QuestionAnswerIcon from "@material-ui/icons/QuestionAnswer";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import Button from "@material-ui/core/Button";

const Topheader = () => {
  let history = useHistory();
  const cookies = new Cookies();
  const loginUserId = cookies.get("loginUserId");
  const apiUrl1 = `http://localhost:8000/api/user/alarm/join/?target_user_id=${loginUserId}&alarm_state=true`;
  const [alarm, setAlarm] = useState([]);
  const [more, setMore] = useState({
    limit: 3,
    show: true,
  });
  const [show, setShow] = useState("");

  // 로그인정보가 없으면 로그인화면으로 이동
  useEffect(() => {
    if (loginUserId == null) {
      alert("로그인정보가 없습니다.");
      window.location = "/login";
    }

    axios.get(apiUrl1).then((response) => {
      setAlarm(response.data);
      setMore({ ...more, show: response.data.length > 3 ? true : false });
      console.log(response);
    });
    window.addEventListener("click", clickBodyEvent);
    return () => {
      window.addEventListener("click", clickBodyEvent);
    };
  }, []);

  // 로그아웃
  const logout = () => {
    cookies.remove("loginUserName");
    cookies.remove("loginUserEmail");
    cookies.remove("loginUserImg");
    cookies.remove("loginUserId");
    window.location = "/login";
  };

  // 알람 시간 나타내기
  const timeForToday = (value) => {
    const today = new Date();
    const timeValue = new Date(value);

    const betweenTime = Math.floor(
      (today.getTime() - timeValue.getTime()) / 1000 / 60
    );
    if (betweenTime < 1) return "방금전";
    if (betweenTime < 60) return `${betweenTime}분전`;

    const betweenTimeHour = Math.floor(betweenTime / 60);
    if (betweenTimeHour < 24) return `${betweenTimeHour}시간전`;

    const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
    if (betweenTimeDay < 365) return `${betweenTimeDay}일전`;

    return `${Math.floor(betweenTimeDay / 365)}년전`;
  };

  // 더보기 버튼
  const moreBtn = () => {
    console.log(alarm.length);
    console.log(more.limit);
    setMore({
      show: alarm.length > more.limit + 3 ? true : false,
      limit: more.limit + 3,
    });
  };

  const showBtn = () => {
    setShow("show");
  };

  const alarmMenu = useRef(null);
  const alarmIcon = useRef(null);
  const clickBodyEvent = (event) => {
    if (
      !alarmMenu.current.contains(event.target) &&
      !alarmIcon.current.contains(event.target)
    ) {
      setShow("");
    }
  };

  return (
    <div className="main-header">
      <Link
        to="#"
        className="nav-link nav-link-faded rounded-circle nav-icon"
        data-toggle="sidebar"
      >
        <Icon.Menu />
      </Link>
      <div className="logo" style={{ marginLeft: "15px" }}>
        <Icon.Feather />
        <span style={{ marginLeft: "7px" }}>Libro</span>
      </div>

      {/* alarm dropdown */}
      <ul className="nav nav-circle ml-auto">
        <li className={`nav-item dropdown nav-notif ${show}`}>
          <Link
            to="#"
            className="nav-link nav-link-faded nav-icon has-badge dropdown-toggle no-caret"
            data-toggle="dropdown"
            data-display="static"
            // onClick={() => showBtn()}
            // ref={alarmIcon}
          >
            <Icon.Bell />
            <span className="badge badge-pill badge-danger">
              {alarm.length > 0 ? alarm.length : null}
            </span>
          </Link>

          <div
            className={`dropdown-menu dropdown-menu-right p-0 ${show}`}
            // ref={alarmMenu}
          >
            <div className="card">
              <div className="card-header bg-dark text-white">
                <Icon.Bell className="mr-2" /> 알람
              </div>

              {alarm.slice(0, more.limit).map((item, index) => {
                return (
                  <React.Fragment key={index}>
                    <div className="card-body p-0 pt-1">
                      <div className="list-group list-group-sm list-group-flush">
                        <Link
                          to="#"
                          className="list-group-item list-group-item-action"
                        >
                          <div className="media">
                            {/* alarm type에 따른 로고 변경 */}
                            {(function () {
                              if (item.alarm_type == 1) {
                                return (
                                  <span className="bg-primary text-white btn-icon rounded-circle">
                                    <PersonAddIcon />
                                  </span>
                                );
                              } else if (item.alarm_type == 2) {
                                return (
                                  <span className="bg-danger text-white btn-icon rounded-circle">
                                    <FavoriteIcon />
                                  </span>
                                );
                              } else {
                                return (
                                  <span className="bg-warning text-white btn-icon rounded-circle">
                                    <QuestionAnswerIcon />
                                  </span>
                                );
                              }
                            })()}
                            <div className="media-body ml-2">
                              <p className="mb-0">
                                {/* alarm type에 따른 메세지 변경 */}
                                {(function () {
                                  if (item.alarm_type == 1) {
                                    return (
                                      <>
                                        <b>{item.user_id.user_name}</b>님이{" "}
                                        당신을 팔로우했습니다.
                                      </>
                                    );
                                  } else if (item.alarm_type == 2) {
                                    return (
                                      <>
                                        <b>{item.user_id.user_name}</b>님이{" "}
                                        <b>'{item.note_id.note_title}'</b>에
                                        좋아요를 눌렀습니다.
                                      </>
                                    );
                                  } else {
                                    return (
                                      <>
                                        <b>{item.user_id.user_name}</b>님이{" "}
                                        <b>'{item.note_id.note_title}'</b>에
                                        댓글을 등록했습니다.
                                      </>
                                    );
                                  }
                                })()}
                              </p>
                              <small className="text-secondary">
                                {timeForToday(item.alarm_date)}
                              </small>
                            </div>
                          </div>
                        </Link>
                      </div>
                    </div>
                  </React.Fragment>
                );
              })}

              <div className="card-footer justify-content-center">
                {/* {more.show ? (
                  <Button
                    fullWidth
                    className="text-secondary"
                    startIcon={<MoreHorizIcon />}
                    onClick={() => moreBtn()}
                  >
                    더보기
                  </Button>
                ) : null} */}
                <Link to="#">more &rsaquo;</Link>
              </div>
            </div>
          </div>
        </li>

        {/* user dropdown */}
        <li className="nav-item dropdown ml-2">
          <Link
            to="#"
            className="nav-link nav-link-faded rounded nav-link-img dropdown-toggle px-2"
            data-toggle="dropdown"
            data-display="static"
          >
            <img
              src={`${cookies.get("loginUserImg")}`}
              alt=""
              className="rounded-circle mr-2"
            />
            <span className="d-none d-sm-block">
              {cookies.get("loginUserName")}
            </span>
          </Link>

          <div className="dropdown-menu dropdown-menu-right pt-0 overflow-hidden">
            <div className="media align-items-center bg-primary text-white px-4 py-3 mb-2">
              <img
                src={`${cookies.get("loginUserImg")}`}
                alt=""
                className="rounded-circle"
                width="50"
                height="50"
              />
              <div className="media-body ml-2 text-nowrap">
                <h6 className="mb-0">{cookies.get("loginUserName")}</h6>
                <span className="text-gray-400 font-size-sm">
                  {cookies.get("loginUserEmail")}
                </span>
              </div>
            </div>
            <Link
              to={`/room/${cookies.get("loginUserId")}`}
              className="dropdown-item has-icon"
            >
              <HomeIcon /> &nbsp; My Room
            </Link>
            <Link to="/setting" className="dropdown-item has-icon">
              <SettingsIcon /> &nbsp; 설정
            </Link>
            <button
              className="dropdown-item has-icon text-danger"
              onClick={() => logout()}
            >
              <ExitToAppIcon /> &nbsp; 로그아웃
            </button>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Topheader;
