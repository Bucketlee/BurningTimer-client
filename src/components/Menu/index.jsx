import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { Popover, message } from "antd";
import { UnorderedListOutlined, FieldTimeOutlined, LineChartOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import MenuView from "./MenuView";

export default function Menu({ current }) {
  const navigate = useNavigate();

  function onSelectMenu(name) {
    if (name === "Label") {
      navigate("/app/label");
    } else if (name === "Timer") {
      navigate("/app/timer");
    } else if (name === "Report") {
      navigate("/app/report");
    }
  }

  function logout() {
    localStorage.setItem("token", "");
    message.success("로그아웃 되셨습니다.");
    navigate("/");
  }

  const menu = ["Label", "Timer", "Report"];
  const icons = [
    <UnorderedListOutlined style={current === 0 ? ActiveIconStyled : WaitIconStyled} />,
    <FieldTimeOutlined style={current === 1 ? ActiveIconStyled : WaitIconStyled} />,
    <LineChartOutlined style={current === 2 ? ActiveIconStyled : WaitIconStyled} />
  ];
  const list = menu.map((m, i) => {
    return (
      <Popover key={`menu-popover-${i}`} content={<PopoverContentWrapper>{m}</PopoverContentWrapper>} trigger="hover">
        <ButtonWrapper current={current === i} onClick={() => onSelectMenu(m)}>
          {current === i ? <DotWrapper /> : <div />}
          {icons[i]}
        </ButtonWrapper>
      </Popover>
    )
  });

  return (
    <MenuView
      menu={list}
      onClickLogo={() => navigate("/")}
      onLogout={logout}
    />
  );
}

const WaitIconStyled = {
  "color": "#797978",
  "fontSize": "32px",
}

const ActiveIconStyled = {
  "color": "#27251F",
  "fontSize": "32px",
}

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


Menu.propTypes = {
  onChangeCurrent: PropTypes.func,
};
