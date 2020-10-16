import React, { useState } from "react";
import axios from "axios";
import { Cookies } from "react-cookie";
import { useHistory } from "react-router-dom";
import { LIBRO_API_URL } from "../../constants/config";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

const Account = () => {
  let history = useHistory();
  const cookies = new Cookies();
  const loginUserId = cookies.get("loginUserId");
  const loginUserName = cookies.get("loginUserName");
  const [userName, setUserName] = useState();
  const [error, setError] = useState(false);
  const apiUrl1 = `${LIBRO_API_URL}/api/user/`;
  const apiUrl2 = `${LIBRO_API_URL}/api/note/`;

  const userOnChange = (e) => {
    setUserName(e.target.value);
  };

  const onkeyup = () => {
    axios.get(apiUrl1 + `?user_name=${userName}`).then((response) => {
      console.log(response.data);
      if (response.data.length !== 0) {
        if (loginUserName === response.data[0].user_name) setError(false);
        else setError(true);
      } else {
        if (userName.length <= 1) setError(true);
        else setError(false);
      }
    });
  };

  const changeUserName = () => {
    axios
      .patch(apiUrl1 + `${loginUserId}/`, { user_name: userName })
      .then((response) => {
        alert("변경완료");
        cookies.set("loginUserName", userName);
        history.go(0);
      });
  };

  const deleteUser = () => {
    if (window.confirm("정말로 탈퇴하시겠습니까?")) {
      axios
        .patch(apiUrl1 + `${loginUserId}/`, { user_state: false })
        .then(() => {
          axios.get(apiUrl2 + `?user_id=${loginUserId}`).then((response) => {
            update(response.data);
          });
        });
    }
  };

  const update = (notes) => {
    var num = 0;
    console.log(notes);
    for (var i = 0; i < notes.length; i++) {
      console.log(i);
      axios.patch(apiUrl2 + `${notes[i].note_id}/`, {
        note_private: false,
      });
      num++;
    }
    if (notes.length === 0 || num === notes.length) {
      alert("탈퇴완료");
      cookies.remove("loginUserId");
      cookies.remove("loginUserName");
      cookies.remove("loginUserEmail");
      cookies.remove("loginUserImg");
      window.location = "/login";
    }
  };
  return (
    <div className="tab-pane" id="account">
      <h6>계정</h6>
      <hr />
      <form>
        <div className="form-group">
          <label>Username</label>
          <TextField
            variant="outlined"
            size="small"
            className="form-control mb-4"
            placeholder="Enter your username"
            name="user_name"
            defaultValue={loginUserName}
            onChange={(e) => userOnChange(e)}
            onKeyUp={() => onkeyup()}
            error={error}
            helperText={
              error ? "최소 2글자 이상 또는 사용 중인 이름입니다." : ""
            }
          />

          <Button
            variant="contained"
            color="primary"
            onClick={() => changeUserName()}
          >
            이름 변경
          </Button>
          <small className="form-text text-muted mb-2">
            계정 이름을 변경한 후 이전 계정 이름은 다른 유저가 사용할 수
            있습니다.
          </small>
        </div>
        <hr />

        <div className="form-group">
          <Button
            variant="contained"
            color="secondary"
            onClick={() => deleteUser()}
          >
            계정 탈퇴
          </Button>
          <small className="d-block text-danger">
            탈퇴 시 리브로 사용이 불가합니다.
          </small>
        </div>
      </form>
    </div>
  );
};

export default Account;
