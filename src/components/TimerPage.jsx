import React, { useCallback, useMemo, useState } from "react";
import styled from "@emotion/styled";

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

  return (
    <TimerPageWrapper>
      <TimerStepsWrapper>
        <TimerSteps
          onChangeCurrent={setCurrent}
          onClickDone={() => alert("완료")}
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
