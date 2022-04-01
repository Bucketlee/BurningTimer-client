import React, { useMemo } from "react";
import styled from "@emotion/styled";
import { useNavigate, useParams } from "react-router-dom";

import Menu from "./Menu";
import TodoPage from "./TodoPage";
import TimerPage from "./TimerPage";
import ReportPage from "./ReportPage";
import NotFound from "./NotFound";

export default function AppPage() {
  const { page } = useParams();
  const navigate = useNavigate();

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
