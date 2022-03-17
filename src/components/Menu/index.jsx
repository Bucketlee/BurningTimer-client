import React, { useState } from "react";
import { message } from "antd";

import MenuView from "./MenuView";

export default function Menu() {
  const [current, setCurrent] = useState("Label");

  function onSelectMenu(name) {
    // menu에 따라 navigate 설정
    setCurrent(name);
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
