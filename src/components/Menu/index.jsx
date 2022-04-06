import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { Popover, message } from "antd";
import { UnorderedListOutlined, FieldTimeOutlined, LineChartOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import MenuView from "./MenuView";
import { checkModal, openInfoModal } from "../antdCustom";
import TabsBoard from "../TabsBoard";
import ProposalForm from "../ProposalForm";
import CardList from "../CardList";

export default function Menu({ current }) {
  const navigate = useNavigate();

  function onSelectMenu(c) {
    if (current === c) {
      return;
    }

    if (current === 1) {
      const ModalInfo = {
        icon: undefined,
        title: "Task 정보를 잃을 수 있습니다.",
        content: "이동하기 전에 Task를 저장하시려면 타이머의 STOP 버튼을 눌러 종료해 주세요.",
        okText: "돌아가기",
        cancelText: "저장안함",
        onOk: () => {},
        onCancel: () => {
          if (c === 0) {
            navigate("/app/label");
          } else if (c === 2) {
            navigate("/app/report");
          }
        },
      }
      checkModal(ModalInfo);
    } else {
      if (c === 0) {
        navigate("/app/label");
      } else if (c === 1) {
        navigate("/app/timer");
      } else if (c === 2) {
        navigate("/app/report");
      }
    }
  }

  function openProposalModal() {
    const tabs = [
      {
        title: "제안하기",
        content: <ProposalForm />,
      },
      {
        title: "반영예정",
        content: <CardList />,
      },
      {
        title: "반영완료",
        content: <div></div>,
      },
    ]

    const info = {
      icon: <></>,
      title: "자유롭게 보내주세요. 꼼꼼히 읽어볼게요.",
      content: (
        <TabsBoard
          tabs={tabs}
        />
      ),
    }

    openInfoModal(info.icon, info.title, info.content);
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
        <ButtonWrapper current={current === i} onClick={() => onSelectMenu(i)}>
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
      onClickProposal={() => openProposalModal()}
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
