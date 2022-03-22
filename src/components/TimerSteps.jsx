import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Steps, Button, message } from "antd";

export default function TimerSteps({ onChangeCurrent, onClickDone }) {
  const [current, setCurrent] = React.useState(0);

  const nextStep = () => {
    setCurrent(current + 1);
    onChangeCurrent(current + 1);
  };

  const firstStep = () => {
    setCurrent(0);
    onChangeCurrent(0);
  };

  const { Step } = Steps;

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

  return (
    <TimerStepsWrapper>
      <Steps current={current} direction="vertical">
        {steps.map(item => (
          <Step key={item.title} title={item.title} description={item.description} />
        ))}
      </Steps>
      <div className="steps-content">{steps[current].content}</div>
      <div className="steps-action">
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => nextStep()}>
            다음
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button
            type="primary"
            onClick={() => {
              message.success("Processing complete!");
              onClickDone();
            }}
          >
            완료
          </Button>
        )}
        {current > 0 && (
          <Button onClick={() => firstStep()}>
            처음으로
          </Button>
        )}
      </div>
    </TimerStepsWrapper>
  );
}

const TimerStepsWrapper = styled.div`
  padding: 0 15px;
  height: 100%;
  display: grid;
  grid-template-rows: 300px auto 50px;

  .ant-steps-item-active > .ant-steps-item-container > .ant-steps-item-icon {
    background-color: #DA291C !important;
    border-color: #DA291C !important;
  }

  .ant-steps-item-finish > .ant-steps-item-container > .ant-steps-item-tail::after {
    background-color: #DA291C !important;
  }

  .ant-steps-item-finish > .ant-steps-item-container > .ant-steps-item-icon {
    border-color: #DA291C !important;
    .ant-steps-icon {
      color: #DA291C !important;
    }
  }

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