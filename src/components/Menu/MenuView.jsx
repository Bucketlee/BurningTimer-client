import React from "react";
import styled from "@emotion/styled";
import { LogoutOutlined } from "@ant-design/icons";

export default function MenuView({ menu, onClickLogo, onLogout }) {
  return (
    <MenuWrapper>
      <LogoWrapper className="logo" onClick={() => onClickLogo()}>
        <LogoImg alt="logo" src={"/image/logo-icon.png"}></LogoImg>
      </LogoWrapper>
      <ListWrapper>{menu}</ListWrapper>
      <LogoutWarpper onClick={() => onLogout()}>
        <LogoutOutlined style={LogoutStyled} />
        <LogoutDescription>로그아웃</LogoutDescription>
      </LogoutWarpper>
    </MenuWrapper>
  );
}

const MenuWrapper = styled.div`
  background-color: #F2F2F2;
  display: grid;
  grid-template-rows: 80px auto 50px;
  height: 100%;
`

const LogoWrapper = styled.button`
  border: none;
  background: none;
  padding: 0;
  width: 45px;
  height: 45px;
  margin: 0 auto;
`

const LogoImg = styled.img`
  height: 45px;
`

const ListWrapper = styled.div`
  background-color: #F2F2F2;
`

const LogoutWarpper = styled.button`
  border: none;
  background: none;
`

const LogoutStyled = {
  "color": "#27251F",
  "fontSize": "32px",
}

const LogoutDescription = styled.div`
  margin-top: 5px;
  font-size: 10px;
`
