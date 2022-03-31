import React from "react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";

const SectionWrapper = styled.section`
  height: 100vh;
  width: 100vw;
  display: table-cell;
  vertical-align: middle;
  text-align: center;
  font-size: 30px;
  font-weight: 800;
`

const ButtonWrapper = styled.button`
  margin-top: 20px;
  width: 200px;
  height: 60px;
  font-size: 24px;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  color: #FFFFFF;
  background-color: #DA291C;
`

export default function NotFound() {
  return (
    <SectionWrapper>
      <h1>페이지를 찾을 수 없습니다.</h1>
      <Link to="/">
        <ButtonWrapper type="button">홈으로 돌아가기</ButtonWrapper>
      </Link>
    </SectionWrapper>
  );
}
