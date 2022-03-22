import React, { useCallback, useMemo, useState } from "react";
import styled from "@emotion/styled";
import { Global, css } from "@emotion/react";
import { notification } from "antd";

import TimerSteps from "./TimerSteps";
import TaskSetting from "./TaskSetting";
import TimerDisplay from "./TimerDisplay";
import Task from "../models/task";

export default function TimerPage({ }) {
  const [current, setCurrent] = useState(0);

  const newTask = useMemo(() => {
    return new Task();
  }, []);
  console.log("newTask", newTask);

  const setNewTask = useCallback((key, value) => {
    if (newTask.pauseAndRestarts === undefined) {
      newTask.pauseAndRestarts = [];
    }

    if (key === "categoryId" && (newTask.labelId || newTask.goalTime)) {
      newTask.labelId = undefined;
      newTask.goalTime = undefined;
    }

    newTask[key] = value;
    localStorage.setItem("task", newTask);
  }, [newTask]);

  const contents = useMemo(() => {
    if (current === 0) {
      return (
        <TaskSetting
          onSelectCategory={(category) => setNewTask("categoryId", category._id)}
          onSelectLabel={(label) => setNewTask("labelId", label._id)}
          onTimeChange={(s) => setNewTask("goalTime", s)}
        />
      );
    } else if (current === 1) {
      return (
        <TimerDisplay
          onTimerStart={() => !newTask.startTimestamp ? setNewTask("startTimestamp", new Date()) : setNewTask("pauseAndRestarts", [ ...newTask.pauseAndRestarts, new Date()])}
          onTimerPause={() => setNewTask("pauseAndRestarts", [ ...newTask.pauseAndRestarts, new Date() ])}
          onTimerStop={() => setNewTask("endTimestamp", new Date())}
          onSaveMemo={(data) => setNewTask("memo", data)}
          onSaveDistraction={(data) => setNewTask("distraction", data)}
        />
      );
    } else {
      // Done Page 제작 필요
      return "Done Page"
    }
  }, [current, newTask, setNewTask]);

  const steps = [
    {
      title: "라벨 설정",
      description: "진행 작업을 설정합니다",
    },
    {
      title: "버닝 타임",
      description: "작업에 몰입합니다",
    },
    {
      title: "완료 기록",
      description: "완료 기록을 보여줍니다",
    }
  ];

  function checkTaskSetting() {
    if (!newTask.categoryId) {
      return openNotification("top", "카테고리가 비어있습니다", "Category 탭을 눌러 선택해주세요.");
    }

    if (!newTask.labelId) {
      return openNotification("top", "라벨이 비어있습니다", "Label 탭을 눌러 선택해주세요.");
    }

    if (!newTask.goalTime) {
      return openNotification("top", "목표 시간이 비어있습니다", "Goal Time 탭을 눌러 선택해주세요.");
    }

    setCurrent(c => c + 1);
  }

  function openNotification(placement, title, text) {
    return notification.info({
      message: title,
      description: text,
      placement,
      duration: 10000,
    });
  };

  return (
    <TimerPageWrapper>
      <Global styles={notificationStyled} />
      <TimerStepsWrapper>
        <TimerSteps
          current={current}
          onChangeCurrent={current === 0 ? checkTaskSetting : setCurrent}
          onClickDone={() => alert("완료")}
          steps={steps}
        />
      </TimerStepsWrapper>
      <ContentsWrapper>
        {contents}
      </ContentsWrapper>
    </TimerPageWrapper>
  )
}

const TimerPageWrapper = styled.section`
  font-family: sans-serif !important;
  display: grid;
  grid-template-columns: 220px auto;
  background-color: #F2F2F2;
  height: 100%;
`

const TimerStepsWrapper = styled.div`
  padding: 30px 0;
  border-left: 1px solid rgba(0,0,0,.08);
`

const ContentsWrapper = styled.div`
  background-color: #FFFFFF;
  padding: 25px;
  max-height: 100vh;
  overflow: scroll;
`

const notificationStyled = css`
  .ant-notification-notice-icon-info {
    color: #DA291C !important;
  }
`
