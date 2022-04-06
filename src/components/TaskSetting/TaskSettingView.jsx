import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { Global, css } from "@emotion/react";
import { Steps } from "antd";

export default function TaskSettingView({ current, steps }) {
  const { Step } = Steps;

  return (
    <TaskSettingViewWrapper>
      <Global styles={TimePickerPanelStyled} />
      <Steps progressDot current={current} direction="vertical" style={{ gridArea: "step"}}>
        {steps.map(item => (
          <Step key={`step-${item.title}`} title={item.title} description={item.description} />
        ))}
      </Steps>
      {steps.map(step => step.content)}
    </TaskSettingViewWrapper>
  );
}

const TimePickerPanelStyled = css`
  .ant-picker-panel {
    width: 300px !important;

    .ant-picker-time-panel-cell-inner {
      padding: 0 !important;
      text-align: center !important;
    }
  }

  .ant-picker-now-btn {
    color: #DA291C !important;
  }

  .ant-btn-primary {
    background-color: #DA291C !important;
    border-color: #DA291C !important;
    color: #FFFFFF !important;
  }
`

const TaskSettingViewWrapper = styled.div`
  display: grid;
  grid-template-columns: 200px auto;
  grid-template-rows: 100px 100px 100px;
  grid-template-areas:
    "step category"
    "step label"
    "step time"
  ;

  .ant-steps-item-finish {
    .ant-steps-icon-dot {
      background-color: #DA291C !important;
    }

    .ant-steps-item-tail::after {
      background-color: #DA291C !important;
    }
  }

  .ant-steps-item-active {
    .ant-steps-icon-dot {
      background-color: #DA291C !important;
    }
  }
`

TaskSettingView.propTypes = {
  onSelectCategory: PropTypes.func,
  onSelectLabel: PropTypes.func,
  onTimeChange: PropTypes.func,
};
