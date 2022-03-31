import React, { useMemo, useState } from "react";
import styled from "@emotion/styled";

import Menu from "./Menu";
import TodoPage from "./TodoPage";
import TimerPage from "./TimerPage";
import ReportPage from "./ReportPage";

export default function AppPage() {
  const [pageName, setPageName] = useState("Label");

  const contents = useMemo(() => {
    if (pageName === "Label") {
      return <TodoPage />;
    } else if (pageName === "Timer") {
      return <TimerPage onClickReport={() => setPageName("Report")} />;
    } else if (pageName === "Report") {
      return <ReportPage />;
    }
  }, [pageName]);

  return (
    <AppPageWrapper>
      <MenuWrapper>
        <Menu
          onChangeCurrent={setPageName}
          current={pageName}
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
  height: 100%;
`

const MenuWrapper = styled.div`
  padding: 30px 0;
  text-align: center;
`

const ContentsWrapper = styled.div`
`
