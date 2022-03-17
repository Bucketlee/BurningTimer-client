import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { Popover } from "antd";
import { UnorderedListOutlined, FieldTimeOutlined, LineChartOutlined, LogoutOutlined } from "@ant-design/icons";

export default function Menu({ onSelect, logout }) {
  const [current, setCurrent] = useState("Label");

  const menu = ["Label", "Timer", "Report"];
  const icons = [
    <UnorderedListOutlined style={current === menu[0] ? ActiveIconStyled : WaitIconStyled} />,
    <FieldTimeOutlined style={current === menu[1] ? ActiveIconStyled : WaitIconStyled} />,
    <LineChartOutlined style={current === menu[2] ? ActiveIconStyled : WaitIconStyled} />
  ];

  function onSelectMenu(name) {
    onSelect(name);
    setCurrent(name);
  }

  const menuList = menu.map((m, i) => {
    return (
      <Popover key={`menu-popover-${i}`} content={<PopoverContentWrapper>{m}</PopoverContentWrapper>} trigger="hover">
        <ButtonWrapper current={current === m} onClick={() => onSelectMenu(m)}>
          {current === m ? <DotWrapper /> : <div />}
          {icons[i]}
        </ButtonWrapper>
      </Popover>
    )
  });

  return (
    <MenuWrapper>
      <div>{menuList}</div>
      <LogoutWarpper>
        <ButtonWrapper onClick={() => logout()}>
          <div></div>
          <LogoutOutlined style={ActiveIconStyled} />
        </ButtonWrapper>
      </LogoutWarpper>
    </MenuWrapper>
  )
}


const MenuWrapper = styled.div`
  background-color: #F2F2F2;
  display: grid;
  grid-template-rows: auto 32px;
  height: 100%;
`

const PopoverContentWrapper = styled.div`
  color: #DA291C;
  font-size: 13px;
`

const ButtonWrapper = styled.button`
  margin-bottom: 20px;
  padding : 0;
  border : none;
  display: grid;
  grid-template-columns: 25px auto;
  background: none;

  .anticon {
    &:hover {
      color: #27251F !important;
    }
  }
`

const DotWrapper = styled.div`
  margin: 12.5px 10px;
  width: 5px;
  height: 5px;
  background-color: #27251F;
  border-radius: 100px;
`

const WaitIconStyled = {
  "color": "#797978",
  "fontSize": "32px",
  "paddingRight": "25px",
}

const ActiveIconStyled = {
  "color": "#27251F",
  "fontSize": "32px",
  "paddingRight": "25px",
}

const LogoutWarpper = styled.div`
  width: 82px;
  font-size: 10px;
`

Menu.propTypes = {
  onSelect: PropTypes.func,
};
