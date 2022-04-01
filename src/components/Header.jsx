import React from "react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";

export default function Header() {
  return (
      <HeaderWrapper>
        <LogoWrapper className="logo">
          <Link to="/">
            <LogoImg alt="logo" src={"/image/logo.png"}></LogoImg>
          </Link>
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
