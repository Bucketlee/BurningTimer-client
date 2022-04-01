import React, { useState } from "react";
import styled from "@emotion/styled";
import { CheckCircleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import Api from "../../api";
import SignUpPageView from "./SignupPageView";
import { openNotification } from "../antdCustom";

export default function SignupPage() {
  const [username, setUsername] = useState(undefined);
  const [password, setPassword] = useState(undefined);
  const [passwordCheck, setPasswordCheck] = useState(undefined);
  const [email, setEmail] = useState(undefined);

  const navigate = useNavigate();

  const buttons = (
    <div>
      <HeaderButtonWrapper onClick={() => navigate("/")}>Home</HeaderButtonWrapper>
      <HeaderButtonWrapper onClick={() => navigate("/auth/login")}>Login</HeaderButtonWrapper>
    </div>
  );

  async function signupMembership() {
    try {
      if (!username) {
        openNotification("top", "아이디를 입력해 주세요.");
        return;
      } else if (!password) {
        openNotification("top", "비밀번호를 입력해 주세요.");
        return;
      } else if (!passwordCheck) {
        openNotification("top", "비밀번호 확인을 입력해 주세요.");
        return;
      } else if (password !== passwordCheck) {
        openNotification("top", "비밀번호와 비밀번호 확인이 일치하지 않습니다.");
        return;
      } else if (!email) {
        openNotification("top", "이메일을 입력해 주세요.");
        return;
      } else if (!checkEmailValidity()) {
        openNotification("top", "이메일 형식이 올바르지 않습니다.");
        return;
      }

      await Api.auth.signUp(username.toLowerCase(), password, email);
      openNotification("top", "Burning Timer 멤버가 되셨습니다.", `${username}님의 인생에 의미있는 역할을 할 수 있기를 희망합니다.`, <CheckCircleOutlined style={{ color: "#27251F" }} />);
      navigate("/auth/login");
    } catch (err) {
      if (err.response && err.response.data.message === "ID's already exists") {
        openNotification("top", "아이디가 이미 존재합니다.");
      } else if (err.response && err.response.data.message === "Email's already exists") {
        openNotification("top", "해당 이메일로 만든 아이디가 이미 존재합니다.");
      } else if (err.response && err.response.data.message === "Email is invalid") {
        openNotification("top", "이메일 형식이 올바르지 않습니다.");
      } else if (err.response && err.response.status === 500) {
        openNotification("top", "서버에 오류가 있습니다.", "잠시 후 다시 시도해 주세요. 해당 문제가 반복될 경우 고객센터로 문의해 주세요.");
      } else {
        openNotification("top", "서버에 연결되지 않습니다.", "잠시 후 다시 시도해 주세요. 해당 문제가 반복될 경우 고객센터로 문의해 주세요.");
      }
    }
  }

  function checkEmailValidity() {
    const exptext = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
    return exptext.test(email) ? true : false;
  }

  function onKeyPressEnter(e) {
    if (e.key === "Enter") {
      signupMembership();
    }
  }

  return (
    <SignUpPageView
      headerButtons={buttons}
      onUserNameChange={setUsername}
      onPasswordChange={setPassword}
      onPasswordCheckChange={setPasswordCheck}
      onEmailChange={setEmail}
      onKeyPress={onKeyPressEnter}
      onBlurEmail={checkEmailValidity}
      onSubmitForm={signupMembership}
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
