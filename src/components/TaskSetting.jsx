import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { Global, css } from "@emotion/react";
import { Steps, Menu, Dropdown, TimePicker } from "antd";
import { DownOutlined } from "@ant-design/icons";
import moment from "moment";

import Api from "../api";
import Category from "../models/category";
import Label from "../models/label";
import Task from "../models/task";


export default function TaskSetting({ onSelectCategory, onSelectLabel, onTimeChange }) {
  const [category, setCategory] = useState(undefined);
  const [label, setLabel] = useState(undefined);
  const [goalTime, setGoalTime] = useState(undefined);
  const [current, setCurrent] = useState(1);

  const [categories, setCategories] = useState([]);
  const [labels, setLabels] = useState([]);

  const { Step } = Steps;

  const steps = [
    {
      title: "Category",
      description: "카테고리를 선택해주세요",
      content: (
        <ContentWrapper grid={"category"}>
          <Dropdown overlay={makeDropdown(categories, onClickCategory)} trigger={["click"]}>
            <StepButtonWrapper className="ant-dropdown-link" onClick={e => e.preventDefault()}>
              <ButtonContentWrapper>
                <div>{!category ? "카테고리" : category.name}</div>
                <div><DownOutlined /></div>
              </ButtonContentWrapper>
            </StepButtonWrapper>
          </Dropdown>
        </ContentWrapper>
      ),
    },
    {
      title: "Label",
      description: "라벨을 선택해주세요",
      content: (
        <ContentWrapper grid={"label"}>
          <Dropdown overlay={makeDropdown(labels, onClickLabel)} trigger={["click"]}>
            <StepButtonWrapper className="ant-dropdown-link" onClick={e => e.preventDefault()}>
              <ButtonContentWrapper>
                <div>{!label ? "라벨" : label.name}</div>
                <div><DownOutlined /></div>
              </ButtonContentWrapper>
            </StepButtonWrapper>
          </Dropdown>
        </ContentWrapper>
      ),
    },
    {
      title: "Goal Time",
      description: "목표 시간을 선택해주세요",
      content: (
        <ContentWrapper grid={"time"}>
          <TimePicker
            defaultValue={!goalTime ? moment("00:00:00", "HH:mm:ss") : moment(Task.msToTime(goalTime), "HH:mm:ss")}
            onChange={(moment, timeString) => {
              const ms = Task.timeToMs(timeString);
              setGoalTime(moment);
              onTimeChange(ms);
            }}
            style={TimePickerStyled}
          />
        </ContentWrapper>
      ),
    },
  ];

  const getCategories = useCallback(async () => {
    try {
      const data = await Api.category.getAllCategories();
      const ActivedCateogries = Category.getActiveCategories(data);
      const sortedCategories = Category.sortCategoriesByPriority(ActivedCateogries);

      if (sortedCategories) {
        setCategories(sortedCategories);
      }
    } catch(err) {
      // 오류 컨트롤 필요
    }
  }, []);

  const getLabels = useCallback(async () => {
    try {
      if (category) {
        const data = await Api.label.getAllLabels();
        const labelsWithCategoryId = Label.getLabelsWithCategoryId(data, category._id);
        const ActivedLabels = Label.getActiveLabels(labelsWithCategoryId);
        const sortedLabels = Label.sortLabelsByPriority(ActivedLabels);
        if (sortedLabels) {
          setLabels(sortedLabels);
        }
      }
    } catch(err) {
      // 오류 컨트롤 필요
    }
  }, [category]);

  useEffect(() => {
    localStorage.setItem("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJpYXQiOjE2NDc2ODAxNTcsImV4cCI6MTY0Nzc2NjU1N30.h0980woGuZDKK3hWiwilTzqt9nlOChjGQIi-gi_hATs");
    getCategories();
    getLabels();

    if (!category) {
      setCurrent(0);
    } else if (!label) {
      setCurrent(1);
    } else if (!goalTime) {
      setCurrent(2);
    }
  }, [getCategories, getLabels, category, label, goalTime]);

  function makeDropdown(arr, onClick) {
    return (
      <Menu>
        {arr.map((el, i) => (
          <>
            <Menu.Item key={`dropdown-${el.name}`}>
              <ListButtonWrapper onClick={() => onClick(el)} lastItem={i === arr.length-1 ? true : false}>{el.name}</ListButtonWrapper>
            </Menu.Item>
          </>
        ))}
      </Menu>
    );
  }

  function onClickCategory(el) {
    onSelectCategory(el);
    setCategory(el);
  }

  function onClickLabel(el) {
    onSelectLabel(el);
    setLabel(el);
  }

  return (
    <TaskSettingWrapper>
      <Global styles={TimePickerPanelStyled}/>
      <Steps progressDot current={current} direction="vertical" style={{ gridArea: "step"}}>
        {steps.map(item => (
          <Step key={item.title} title={item.title} description={item.description} />
        ))}
      </Steps>
      {steps.map(step => step.content)}
    </TaskSettingWrapper>
  );
}

const TimePickerPanelStyled = css`
  .ant-picker-panel {
    width: 300px;

    .ant-picker-time-panel-cell-inner {
      padding: 0 !important;
      text-align: center;
    }
  }
`

const TaskSettingWrapper = styled.div`
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

const StepButtonWrapper = styled.button`
  margin: 5px 0;
  padding: 5px 10px;
  background: none;
  border: 1px solid #D9D9D9;
  width: 300px;
  height: 50px;
`

const ListButtonWrapper = styled.button`
  background: none;
  border: none;
  padding: 0;
  width: 100%;
  height: 40px;
`

const ContentWrapper = styled.div`
  grid-area: ${(props) => props.grid};
  font-weight: 800;

  input {
    text-align: center;
  }
`

const ButtonContentWrapper = styled.div`
  display: grid;
  grid-template-columns: auto 14px;
`

const TimePickerStyled = {
  "width": "300px",
  "height": "50px",
  "margin": "5px 0",
  "padding": "5px 10px",
}

TaskSetting.propTypes = {
  onSelectCategory: PropTypes.func,
  onSelectLabel: PropTypes.func,
  onTimeChange: PropTypes.func,
};
