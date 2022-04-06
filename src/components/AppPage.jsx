import React, { useMemo, useEffect } from "react";
import styled from "@emotion/styled";
import { Global, css } from "@emotion/react";
import { useNavigate, useParams } from "react-router-dom";

import Menu from "./Menu";
import TodoPage from "./TodoPage";
import TimerPage from "./TimerPage";
import ReportPage from "./ReportPage";
import NotFound from "./NotFound";
import { checkModal } from "./antdCustom";

export default function AppPage() {
  const { page } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      const ModalInfo = {
        title: "로그인 세션이 만료되었습니다.",
        content: "다시 로그인 해주세요.",
        okText: "로그인하기",
        cancelText: "홈으로 이동",
        onOk: () => navigate("/auth/login"),
        onCancel: () => navigate("/"),
      }
      checkModal(ModalInfo);
    }
  }, [navigate]);

  const contents = useMemo(() => {
    if (page === "label" || page === undefined) {
      return <TodoPage />;
    } else if (page === "timer") {
      return <TimerPage onClickReport={() => navigate("/app/report")} />;
    } else if (page === "report") {
      return <ReportPage />;
    } else {
      return <NotFound />
    }
  }, [page, navigate]);

  return (
    <AppPageWrapper>
      <Global styles={TimePickerPanelStyled} />
      <MenuWrapper>
        <Menu
          current={page === "timer" ? 1 : (page === "report" ? 2 : 0)}
        />
      </MenuWrapper>
      <ContentsWrapper>
        {contents}
      </ContentsWrapper>
    </AppPageWrapper>
  )
}

const TimePickerPanelStyled = css`
  .ant-btn-primary {
    background-color: #DA291C !important;
    border-color: #DA291C !important;
    margin-right: 10px;
  }

  .ant-btn-default:hover {
    border-color: #DA291C !important;
    color: #DA291C !important;
  }
`

const AppPageWrapper = styled.section`
  display: grid;
  grid-template-columns: 82px auto;
  background-color: #F2F2F2;
  height: 100vh;
`

const MenuWrapper = styled.div`
  padding: 30px 0;
  text-align: center;
`

const ContentsWrapper = styled.div`
`
