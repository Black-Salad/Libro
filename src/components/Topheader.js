import React, { useEffect, useState } from "react";
import * as Icon from "react-feather";
import { Link, useHistory } from "react-router-dom";
import { Cookies } from "react-cookie";
import axios from "axios";
import { LIBRO_API_URL } from "./../constants/config";

import HomeIcon from "@material-ui/icons/Home";
import SettingsIcon from "@material-ui/icons/Settings";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import FavoriteIcon from "@material-ui/icons/Favorite";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import QuestionAnswerIcon from "@material-ui/icons/QuestionAnswer";

const Topheader = () => {
  let history = useHistory();
  const cookies = new Cookies();
  const loginUserId = cookies.get("loginUserId");
  const apiUrl = `${LIBRO_API_URL}/api/user/alarm/`;
  const [alarm, setAlarm] = useState([]);
  const [alarmCnt, setAlarmCnt] = useState();
  const [cnt, setCnt] = useState(0);
  const [show, setShow] = useState("");

  // 로그인정보가 없으면 로그인화면으로 이동
  useEffect(() => {
    if (loginUserId == null) {
      alert("로그인정보가 없습니다.");
      window.location = "/login";
    }

    axios
      .get(apiUrl + `join/?target_user_id=${loginUserId}`)
      .then((response) => {
        setAlarm(response.data);
        console.log(response);
      });

    axios
      .get(apiUrl + `join/?target_user_id=${loginUserId}&alarm_state=true`)
      .then((response) => {
        setAlarmCnt(response.data.length);
        console.log("cnt", response.data.length);
      });
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

  const showBtn = () => {
    setCnt(cnt + 1);
    if (cnt % 2 === 0) {
      setShow("");
    } else {
      setShow("show");
    }
  };

  // 알람 클릭시 좋아요,댓글은 해당 독서록으로, 팔로우는 룸 이동
  const viewAlarm = (alarmIDX, alarmType, noteIDX, userIDX) => {
    if (alarmType !== 1) {
      axios
        .patch(apiUrl + `${alarmIDX}/`, { alarm_state: false })
        .then((response) => {
          console.log("response", response);
          history.push(`/viewnotedetail/${noteIDX.note_id}`);
        });
    } else {
      axios
        .patch(apiUrl + `${alarmIDX}/`, { alarm_state: false })
        .then((response) => {
          history.push(`/room/${userIDX}`);
        });
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

      {/* 알람 */}
      <ul className="nav nav-circle ml-auto">
        <li className={`nav-item dropdown nav-notif ${show}`}>
          <Link
            to="#"
            className="nav-link nav-link-faded nav-icon has-badge dropdown-toggle no-caret "
            // data-toggle="dropdown"
            // data-display="static"
            onClick={() => showBtn()}
          >
            <Icon.Bell />
            <span className="badge badge-pill badge-danger">
              {alarmCnt > 0 ? alarmCnt : null}
            </span>
          </Link>

          <div className={`dropdown-menu dropdown-menu-right p-0 ${show}`}>
            <div className="card-header bg-dark text-white">
              <Icon.Bell className="mr-2" /> 알람
            </div>
            <div style={{ maxHeight: "350px", overflowY: "auto" }}>
              {alarm.map((item, index) => {
                return (
                  <React.Fragment key={index}>
                    <div className="card-body p-0 pt-1">
                      <div className="list-group list-group-sm list-group-flush">
                        <div
                          onClick={() =>
                            viewAlarm(
                              item.alarm_id,
                              item.alarm_type,
                              item.note_id,
                              item.user_id.user_id
                            )
                          }
                          className="list-group-item list-group-item-action"
                          style={{
                            cursor: "pointer",
                            backgroundColor:
                              item.alarm_state === true ? "#edf2f7" : null,
                          }}
                        >
                          <div className="media">
                            {/* alarm type에 따른 로고 변경 */}
                            {(function () {
                              if (item.alarm_type === 1) {
                                return (
                                  <span className="bg-primary text-white btn-icon rounded-circle">
                                    <PersonAddIcon />
                                  </span>
                                );
                              } else if (item.alarm_type === 2) {
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
                                  if (item.alarm_type === 1) {
                                    return (
                                      <>
                                        <b>{item.user_id.user_name}</b>님이{" "}
                                        당신을 팔로우했습니다.
                                      </>
                                    );
                                  } else if (item.alarm_type === 2) {
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
                        </div>
                      </div>
                    </div>
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        </li>

        {/* 회원 프로필 */}
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
              style={{
                objectFit: "cover",
              }}
            />
            <span className="d-none d-sm-block">
              {cookies.get("loginUserName")}
            </span>
          </Link>

          {/* 회원 드롭다운 */}
          <div className="dropdown-menu dropdown-menu-right pt-0 overflow-hidden">
            <div className="media align-items-center bg-dark text-white px-4 py-3 mb-2">
              <img
                src={`${cookies.get("loginUserImg")}`}
                alt=""
                className="rounded-circle"
                width="50"
                height="50"
                style={{ objectFit: "cover" }}
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
