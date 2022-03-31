import React, { useState } from "react";
import PropTypes from "prop-types";
import { message } from "antd";

import MenuView from "./MenuView";

export default function Menu({ onChangeCurrent, current }) {

  function onSelectMenu(name) {
    // menu에 따라 navigate 설정
    onChangeCurrent(name);
  }

  function logout() {
    localStorage.setItem("token", "");
    // 홈으로 이동 navigate
    message.success("로그아웃 되셨습니다.");
  }

  return (
    <MenuView
      current={current}
      onSelect={onSelectMenu}
      onLogout={logout}
    />
  );
}

Menu.propTypes = {
  onChangeCurrent: PropTypes.func,
};
