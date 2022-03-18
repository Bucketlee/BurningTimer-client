import React from "react";
import styled from "@emotion/styled";
import { Popover } from "antd";
import { UnorderedListOutlined, FieldTimeOutlined, LineChartOutlined, LogoutOutlined } from "@ant-design/icons";

export default function MenuView({ current, onSelect, onLogout }) {
  const menu = ["Label", "Timer", "Report"];
  const icons = [
    <UnorderedListOutlined style={current === menu[0] ? ActiveIconStyled : WaitIconStyled} />,
    <FieldTimeOutlined style={current === menu[1] ? ActiveIconStyled : WaitIconStyled} />,
    <LineChartOutlined style={current === menu[2] ? ActiveIconStyled : WaitIconStyled} />
  ];

  const list = menu.map((m, i) => {
    return (
      <Popover key={`menu-popover-${i}`} content={<PopoverContentWrapper>{m}</PopoverContentWrapper>} trigger="hover">
        <ButtonWrapper current={current === m} onClick={() => onSelect(m)}>
          {current === m ? <DotWrapper /> : <div />}
          {icons[i]}
        </ButtonWrapper>
      </Popover>
    )
  });

  return (
    <MenuWrapper>
      <LogoWrapper className="logo" onClick={() => console.log("home으로 연결")}>
        <LogoImg alt="logo" src={"/image/logo-icon.png"}></LogoImg>
      </LogoWrapper>
      <ListWrapper>{list}</ListWrapper>
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

const PopoverContentWrapper = styled.div`
  color: #DA291C;
  font-size: 13px;
`

const ButtonWrapper = styled.button`
  width: 100%;
  margin-bottom: 20px;
  padding : 0;
  border : none;
  display: grid;
  grid-template-columns: 25px 32px auto;
  background: none;

  .anticon {
    &:hover {
      color: #27251F !important;
    }
  }
`

const DotWrapper = styled.div`
  margin: auto;
  width: 5px;
  height: 5px;
  background-color: #27251F;
  border-radius: 100px;
`

const WaitIconStyled = {
  "color": "#797978",
  "fontSize": "32px",
}

const ActiveIconStyled = {
  "color": "#27251F",
  "fontSize": "32px",
}

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
