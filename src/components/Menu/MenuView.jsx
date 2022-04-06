import React from "react";
import styled from "@emotion/styled";
import { LogoutOutlined, RocketOutlined } from "@ant-design/icons";

export default function MenuView({ menu, onClickLogo, onClickProposal, onLogout }) {
  return (
    <MenuWrapper>
      <LogoWrapper className="logo" onClick={() => onClickLogo()}>
        <LogoImg alt="logo" src={"/image/logo-icon.png"}></LogoImg>
      </LogoWrapper>
      <ListWrapper>{menu}</ListWrapper>
      <DefalutMenuWarpper onClick={() => onClickProposal()}>
        <RocketOutlined style={IconStyled} />
        <TextWrapper>제안하기</TextWrapper>
      </DefalutMenuWarpper>
      <DefalutMenuWarpper onClick={() => onLogout()}>
        <LogoutOutlined style={IconStyled} />
        <TextWrapper>로그아웃</TextWrapper>
      </DefalutMenuWarpper>
    </MenuWrapper>
  );
}

const MenuWrapper = styled.div`
  background-color: #F2F2F2;
  display: grid;
  grid-template-rows: 80px auto 80px 50px;
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

const DefalutMenuWarpper = styled.button`
  margin-top: 5px;
  border: none;
  background: none;
`

const IconStyled = {
  "color": "#27251F",
  "fontSize": "32px",
}

const TextWrapper = styled.div`
  margin-top: 5px;
  font-size: 10px;
`
