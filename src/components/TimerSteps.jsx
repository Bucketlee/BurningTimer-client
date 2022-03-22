import React from "react";
import styled from "@emotion/styled";
import { Steps, Button, message } from "antd";

export default function TimerSteps({ current, onChangeCurrent, onClickDone, steps }) {

  const nextStep = () => {
    onChangeCurrent(current + 1);
  };

  const firstStep = () => {
    onChangeCurrent(0);
  };

  const { Step } = Steps;

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