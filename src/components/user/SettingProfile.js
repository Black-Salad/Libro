import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Cookies } from "react-cookie";
import { LIBRO_API_URL } from "../../constants/config";

import Button from "@material-ui/core/Button";

const SettingProfile = () => {
  let history = useHistory();
  const cookies = new Cookies();

  const loginUserId = cookies.get("loginUserId");
  const loginUserEmail = cookies.get("loginUserEmail");

  const apiUrl1 = `${LIBRO_API_URL}/api/user/${loginUserId}/`;
  const [user, setUser] = useState({
    user_img: "",
  });

  useEffect(() => {
    axios
      .get(apiUrl1)
      .then((response) => {
        setUser(response.data);
        console.log(response.data);
      })
      .catch((response) => {
        console.error(response);
        console.log("에러", cookies.get("loginUserId"));
      });
  }, []);

  const userOnChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    console.log(user);
  };

  const imgOnChange = (e) => {
    setUser({ ...user, user_img: e.target.files[0] });
    const formData = new FormData();
    formData.append("user_img", e.target.files[0]);

    var fileName = e.target.value;
    fileName = fileName.slice(fileName.indexOf(".") + 1).toLowerCase();
    if (
      fileName !== "jpg" &&
      fileName !== "png" &&
      fileName !== "gif" &&
      fileName !== "jpeg"
    ) {
      alert("jpg,jpeg,png,gif 파일만 가능합니다.😓");
    } else {
      axios({
        method: "patch",
        url: apiUrl1 + "update/",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      })
        .then((response) => {
          console.log(response.data);
          setUser(response.data);
        })
        .catch((response) => {
          console.error(response);
        });
    }
  };

  const profileUpdate = () => {
    axios
      .patch(apiUrl1, { user_introduction: user.user_introduction })
      .then((response) => {
        cookies.set("loginUserImg", response.data.user_img);
        setUser(response.data);
        alert("프로필변경 완료");
        history.go(0);
      })
      .catch((response) => {
        console.error(response);
      });
  };

  return (
    <div className="tab-pane active" id="profile">
      <h6>프로필</h6>
      <hr />
      <form>
        <div className="form-group">
          <label>email</label>
          <input className="form-control" value={loginUserEmail} readOnly />
          <small id="fullNameHelp" className="form-text text-muted">
            이메일은 변경 불가능합니다.
          </small>
        </div>
        <div className="form-group">
          <label>introduction</label>
          <textarea
            className="form-control autosize"
            placeholder="자신을 소개해 보세요"
            name="user_introduction"
            onChange={(e) => userOnChange(e)}
            defaultValue={user.user_introduction}
          />
        </div>
        <div className="form-group">
          <label>image</label>
          <br />
          <img id="img" width="100" src={user.user_img} alt="" />
          <input
            type="file"
            className="form-control"
            name="user_img"
            accept="imgage/gif,image/jpeg,image/png"
            onChange={(e) => imgOnChange(e)}
          />
        </div>

        <Button
          variant="contained"
          color="primary"
          onClick={() => profileUpdate()}
        >
          저장
        </Button>
      </form>
    </div>
  );
};

export default SettingProfile;
