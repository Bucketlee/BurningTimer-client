import React, { useCallback, useMemo, useState } from "react";
import styled from "@emotion/styled";
import { Global, css } from "@emotion/react";
import { notification, Modal, List } from "antd";
import { ExclamationCircleOutlined, CheckCircleOutlined } from "@ant-design/icons";

import Api from "../api";
import Task from "../models/task";
import TimerSteps from "./TimerSteps";
import TaskSetting from "./TaskSetting";
import TimerDisplay from "./TimerDisplay";
import Result from "./Result";

export default function TimerPage({ onClickReport }) {
  const [current, setCurrent] = useState(0);

  const newTask = useMemo(() => {
    return new Task();
  }, []);

  const saveTask = useCallback(async () => {
    const data = await Api.task.createNewTask(newTask);
    data ? openNotification("top", "Task를 저장했습니다", "Report에서 자세하게 확인할 수 있습니다", <CheckCircleOutlined />) : openNotification("top", "Task를 저장하지 못했습니다", "잠시 후 다시 시도해주세요");
    return data;
  }, [newTask]);

  const setNewTaskValue = useCallback((key, value) => {
    if (key === "categoryId" && (newTask.labelId || newTask.goalTime)) {
      newTask.labelId = undefined;
      newTask.goalTime = undefined;
    }

    newTask[key] = value;
  }, [newTask]);

  const resetNewTaskValueValue = useCallback(() => {
    newTask.categoryId = undefined;
    newTask.userId = undefined;
    newTask.labelId = undefined;
    newTask.startTimestamp = undefined;
    newTask.endTimestamp = undefined;
    newTask.pauseAndRestarts = [];
    newTask.goalTime = undefined;
    newTask.playTime = undefined;
    newTask.memo = undefined;
    newTask.distraction = undefined;
    newTask.createdAt = undefined;
    newTask.updatedAt = undefined;
  }, [newTask]);

  const contents = useMemo(() => {
    if (current === 0) {
      return (
        <TaskSetting
          onSelectCategory={(category) => setNewTaskValue("categoryId", category._id)}
          onSelectLabel={(label) => setNewTaskValue("labelId", label._id)}
          onTimeChange={(s) => setNewTaskValue("goalTime", s)}
        />
      );
    } else if (current === 1) {
      return (
        <TimerDisplay
          onTimerStart={() => !newTask.startTimestamp ? setNewTaskValue("startTimestamp", new Date()) : setNewTaskValue("pauseAndRestarts", [ ...newTask.pauseAndRestarts, new Date()])}
          onTimerPause={(ms) => {
            setNewTaskValue("playTime", ms);
            const clickDate = new Date();
            setNewTaskValue("pauseAndRestarts", [ ...newTask.pauseAndRestarts, clickDate ]);
            setNewTaskValue("endTimestamp", clickDate);
          }}
          onTimerStop={async (ms) => {
            setNewTaskValue("playTime", ms);
            const clickDate = new Date();
            setNewTaskValue("pauseAndRestarts", [ ...newTask.pauseAndRestarts, clickDate ]);
            setNewTaskValue("endTimestamp", clickDate);

            await saveTask();
            setCurrent(2);
          }}
          onSaveMemo={(data) => setNewTaskValue("memo", data)}
          onSaveDistraction={(data) => setNewTaskValue("distraction", data)}
        />
      );
    } else {
      const percent = Math.round(newTask.playTime/newTask.goalTime*100);
      const dataSource = [
        `목표 시간은 [ ${Task.msToTime(newTask.goalTime)} ]입니다.`,
        `실제 시간은 [ ${Task.msToTime(newTask.playTime)} ]입니다.`,
      ];
      const taskResultContent = (
          <List
            bordered
            dataSource={dataSource}
            renderItem={item => (
              <List.Item>
                {item}
              </List.Item>
            )}
          />
      )
      return (
        <ResultWrapper>
          <Result
            percent={percent}
            title={"버닝이 종료되었습니다!"}
            content={taskResultContent}
            footer={"충분히 집중하셨다면, 잠시 쉬어가는건 어떨까요?"}
            okButtonText={"새 타이머"}
            onClickOkButton={() => {
              resetNewTaskValueValue();
              setCurrent(0);
            }}
            cancelButtonText={"리포트"}
            onClickCancelButton={onClickReport}
          />
        </ResultWrapper>
      );
    }
  }, [current, newTask, setNewTaskValue, saveTask, onClickReport, resetNewTaskValueValue]);

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


  function correctTaskSetting() {
    if (!newTask.categoryId) {
      openNotification("top", "카테고리가 비어있습니다", "Category 탭을 눌러 선택해주세요.");
      return false;
    }

    if (!newTask.labelId) {
      openNotification("top", "라벨이 비어있습니다", "Label 탭을 눌러 선택해주세요.");
      return false;
    }

    if (!newTask.goalTime) {
      openNotification("top", "목표 시간이 비어있습니다", "Goal Time 탭을 눌러 선택해주세요.");
      return false;
    }

    return true;
  }

  function openNotification(placement, title, text, icon, duration) {
    return notification.info({
      message: title,
      description: text,
      placement,
      icon: icon ? icon : <ExclamationCircleOutlined />,
      duration: duration ? duration : 100,
    });
  };

  function checkBeforeBackToFirst() {
    if (current === 1 && newTask.startTimestamp) {
      Modal.confirm({
        title: "아직 Task를 저장하지 않았습니다.",
        icon: <ExclamationCircleOutlined />,
        content: "Task를 저장하시려면 타이머의 STOP 버튼을 눌러 종료해 주세요.",
        okText: "돌아가기",
        cancelText: "저장안함",
        onCancel: () => {
          resetNewTaskValueValue();
          setCurrent(0);
        },
      });
      return;
    }

    resetNewTaskValueValue();
    setCurrent(0);
  }

  return (
    <TimerPageWrapper>
      <Global styles={notificationStyled} />
      <TimerStepsWrapper>
        <TimerSteps
          current={current}
          onClickNextStep={
            current === 0 ? ((c) => {
              const isCorrect = correctTaskSetting();
              if (isCorrect) setCurrent(c);
            }) : async (c) => {
              if (!newTask.startTimestamp) {
                return openNotification("top", "타이머를 시작하지 않았습니다.", "START를 눌러 타이머를 시작해주세요.");
              }

              if (newTask.startTimestamp && newTask.pauseAndRestarts.length%2 === 0) {
                return openNotification("top", "타이머가 진행중입니다", "타이머를 STOP 해주세요");
              }

              await saveTask();
              setCurrent(c);
            }
          }
          onClickFirstStep={() => {
            checkBeforeBackToFirst();
          }}
          onClickReport={onClickReport}
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
  .ant-notification-notice-icon {
    color: #DA291C !important;
  }
`

const ResultWrapper = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 100px;
`