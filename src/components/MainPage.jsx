import React from "react";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";

export default function MainPage() {
  const navigate = useNavigate();
  return (
    <MainPageWrapper>
      준비중입니다
      <button onClick={() => navigate("/app")}>앱으로 이동</button>
      <button onClick={() => navigate("/auth/login")}>로그인으로 이동</button>
      <button onClick={() => navigate("/auth/signup")}>회원가입으로 이동</button>
    </MainPageWrapper>
  );
}

const MainPageWrapper = styled.section`
`
