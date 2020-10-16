import React, { useState, useEffect } from "react";
import axios from "axios";
import { Cookies } from "react-cookie";
import { LIBRO_API_URL } from "../../constants/config";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { LIBRO_API_URL } from "../../constants/config";

const SettingPassword = () => {
  const cookies = new Cookies();
  const loginUserId = cookies.get("loginUserId");

  const [error, setError] = useState({
    user_pw: false,
    user_pw_confirm: false,
  });
  const [user, setUser] = useState({});
  const [newPw, setNewPw] = useState();
  const [pwConfirm, setPwConfirm] = useState("");
  const apiUrl1 = `${LIBRO_API_URL}/api/user/${loginUserId}/`;

  // useEffect
  useEffect(() => {
    axios.get(apiUrl1).then((response) => {
      setUser(response.data);
    });
  }, []);

  // 값이 바뀔 때마다 onchange
  const userPwOnChange = (e) => {
    setUser({ ...user, user_pw: e.target.value });
  };

  const pwConfirmOnChange = (e) => {
    setPwConfirm(e.target.value);
  };

  const pwOnChange = (e) => {
    setNewPw(e.target.value);
  };

  // 정상값 확인
  const onkeyup = (e) => {
    switch (e.target.name) {
      case "user_pw":
        axios.get(apiUrl1).then((response) => {
          if (response.data.user_pw !== user.user_pw)
            setError({ ...error, user_pw: true });
          else setError({ ...error, user_pw: false });
        });
        break;
      case "user_pw_confirm":
        if (newPw !== pwConfirm) setError({ ...error, user_pw_confirm: true });
        else setError({ ...error, user_pw_confirm: false });
        break;
      default:
    }
  };

  // 비밀번호 변경
  const ChangePassword = () => {
    if (user.user_pw.length === 0 || pwConfirm.length === 0) {
      alert("공란을 입력바랍니다.");
      return false;
    }

    if (error.user_pw || error.user_pw_confirm) {
      alert("정확히 입력바랍니다");
      return false;
    }

    axios.patch(apiUrl1, { user_pw: newPw }).then(() => {
      alert("비밀번호 변경 완료, 재로그인 부탁드립니다.");
      cookies.remove("loginUserId");
      cookies.remove("loginUserName");
      cookies.remove("loginUserEmail");
      cookies.remove("loginUserImg");
      window.location = "/login";
    });
  };

  return (
    <div className="tab-pane" id="security">
      <h6>비밀번호</h6>
      <hr />
      <form>
        <div className="form-group">
          <label className="d-block mb-3">Change Password</label>
          <TextField
            variant="outlined"
            size="small"
            type="password"
            className="form-control mb-2"
            label="old password"
            name="user_pw"
            onChange={(e) => userPwOnChange(e)}
            onKeyUp={(e) => onkeyup(e)}
            error={error.user_pw}
            autoComplete="current-password"
          />
          <TextField
            variant="outlined"
            size="small"
            type="password"
            className="form-control mb-2"
            label="New password"
            name="user_pw"
            onChange={(e) => pwOnChange(e)}
            autoComplete="new-password"
          />
          <TextField
            variant="outlined"
            size="small"
            type="password"
            className="form-control"
            label="Confirm new password"
            name="user_pw_confirm"
            onChange={(e) => pwConfirmOnChange(e)}
            onKeyUp={(e) => onkeyup(e)}
            error={error.user_pw_confirm}
            autoComplete="new-password"
          />
        </div>
        <Button
          variant="contained"
          color="primary"
          onClick={() => ChangePassword()}
        >
          변경
        </Button>
      </form>
    </div>
  );
};

export default SettingPassword;
