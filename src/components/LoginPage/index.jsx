import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { CheckCircleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import Api from "../../api";
import LoginPageView from "./LoginPageView";
import { openNotification } from "../antdCustom";

export default function LoginPage() {
  const [username, setUsername] = useState(undefined);
  const [password, setPassword] = useState(undefined);

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/app");
    }
  }, [navigate]);

  const button = (
    <HeaderButtonWrapper onClick={() => navigate("/")}>Home</HeaderButtonWrapper>
  );

  async function login() {
    try {
      if (!username) {
        openNotification("top", "아이디를 입력해 주세요.");
        return;
      } else if (!password) {
        openNotification("top", "비밀번호를 입력해 주세요.");
        return;
      }
      await Api.auth.login(username.toLowerCase(), password);
      openNotification("top", "로그인 되셨습니다.", "", <CheckCircleOutlined style={{ color: "#27251F" }} />);
      navigate("/app");
    } catch (err) {
      if (err.response && err.response.data.message === "Please, Check your ID") {
        openNotification("top", "아이디가 존재하지 않습니다.");
      } else if (err.response && err.response.data.message === "Please, Check your password") {
        openNotification("top", "비밀번호가 올바르지 않습니다.");
      } else {
        openNotification("top", "서버에 연결되지 않습니다.", "잠시 후 다시 시도해 주세요. 해당 문제가 반복될 경우 고객센터로 문의해 주세요.");
      }
    }
  }

  function onKeyPressEnter(e) {
    if (e.key === "Enter") {
      login();
    }
  }

  async function loginWithSocial(info) {
    try {
      await Api.auth.login(info.socialId.toLowerCase(), info.socialId);
      openNotification("top", "로그인 되셨습니다.", "", <CheckCircleOutlined style={{ color: "#27251F" }} />);
      navigate("/app");
    } catch (err) {
      if (err.response && err.response.status === 401) {
        await Api.auth.signUp(info.socialId.toLowerCase(), info.socialId.toLowerCase(), info.email);
        loginWithSocial(info);
      } else if (err.response && err.response.status === 500) {
        openNotification("top", "서버에 오류가 있습니다.", "잠시 후 다시 시도해 주세요. 해당 문제가 반복될 경우 고객센터로 문의해 주세요.");
      } else {
        openNotification("top", "서버에 연결되지 않습니다.", "잠시 후 다시 시도해 주세요. 해당 문제가 반복될 경우 고객센터로 문의해 주세요.");
      }
    }
  }

  return (
    <LoginPageView
      headerButtons={button}
      onUserNameChange={setUsername}
      onPasswordChange={setPassword}
      onKeyPress={onKeyPressEnter}
      onSubmitForm={login}
      onClickSignup={() => navigate("/auth/signup")}
      onClickFindId={() => {openNotification("top", "준비중인 기능입니다.")}}
      onClickFindPassword={() => {openNotification("top", "준비중인 기능입니다.")}}
      onSocialLogin={loginWithSocial}
    />
  );
}

const HeaderButtonWrapper = styled.button`
  background: none;
  border: none;
  margin-right: 10px;
  color: #FFFFFF;
  font-size: 15px;
  font-Weight: 600;
`
