import React from "react";
import styled from "@emotion/styled";

export default function Header() {
  return (
      <HeaderWrapper>
        <LogoWrapper className="logo">
          <LogoImg alt="logo" src={"/image/logo.png"}></LogoImg>
        </LogoWrapper>
      </HeaderWrapper>
  );
}

const HeaderWrapper = styled.header`
  width: 100%;
  height: 45px;
  background-color: #DA291C;
  line-height: 45px;
  display: flex;
  justify-content: space-between;
`

const LogoWrapper = styled.div`
  margin-left: 10px;
  width: 180px;
  display: flex;
  align-items: center;
`

const LogoImg = styled.img`
  height: 35px;
`
