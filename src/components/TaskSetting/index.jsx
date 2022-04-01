import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { Menu, Dropdown, TimePicker } from "antd";
import { DownOutlined } from "@ant-design/icons";

import Api from "../../api";
import Category from "../../models/category";
import Label from "../../models/label";
import Task from "../../models/task";
import { openNotification } from "../antdCustom";
import TaskSettingView from "./TaskSettingView";

export default function TaskSetting({ onSelectCategory, onSelectLabel, onTimeChange }) {
  const [category, setCategory] = useState(undefined);
  const [label, setLabel] = useState(undefined);
  const [goalTime, setGoalTime] = useState(undefined);
  const [current, setCurrent] = useState(0);

  const [categories, setCategories] = useState([]);
  const [labels, setLabels] = useState([]);

  const steps = [
    {
      id: "category",
      title: "Category",
      description: "카테고리를 선택해주세요",
      content: (
        <ContentWrapper grid={"category"}>
          <Dropdown overlay={makeDropdown(categories, onClickCategory)} trigger={["click"]}>
            <StepButtonWrapper className="ant-dropdown-link" onClick={e => e.preventDefault()}>
              <ButtonContentWrapper>
              {!category ? <BeforeSelectionWrapper>select category</BeforeSelectionWrapper> : <div>{category.name}</div>}
                <div><DownOutlined /></div>
              </ButtonContentWrapper>
            </StepButtonWrapper>
          </Dropdown>
        </ContentWrapper>
      ),
    },
    {
      id: "label",
      title: "Label",
      description: "라벨을 선택해주세요",
      content: (
        <ContentWrapper grid={"label"}>
          <Dropdown overlay={makeDropdown(labels, onClickLabel)} trigger={["click"]}>
            <StepButtonWrapper className="ant-dropdown-link" onClick={e => e.preventDefault()}>
              <ButtonContentWrapper>
                {!label ? <BeforeSelectionWrapper>select label</BeforeSelectionWrapper> : <div>{label.name}</div>}
                <div><DownOutlined /></div>
              </ButtonContentWrapper>
            </StepButtonWrapper>
          </Dropdown>
        </ContentWrapper>
      ),
    },
    {
      id: "goal-time",
      title: "Goal Time",
      description: "목표 시간을 선택해주세요",
      content: (
        <ContentWrapper grid={"time"}>
          <TimePicker
            value={goalTime}
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
      if (err.response && err.response.status === 500) {
        openNotification("top", "서버에 오류가 있습니다.", "잠시 후 다시 시도해 주세요. 해당 문제가 반복될 경우 고객센터로 문의해 주세요.");
      } else {
        openNotification("top", "서버에 연결되지 않습니다.", "잠시 후 다시 시도해 주세요. 해당 문제가 반복될 경우 고객센터로 문의해 주세요.");
      }
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
      if (err.response && err.response.status === 500) {
        openNotification("top", "서버에 오류가 있습니다.", "잠시 후 다시 시도해 주세요. 해당 문제가 반복될 경우 고객센터로 문의해 주세요.");
      } else {
        openNotification("top", "서버에 연결되지 않습니다.", "잠시 후 다시 시도해 주세요. 해당 문제가 반복될 경우 고객센터로 문의해 주세요.");
      }
    }
  }, [category]);

  useEffect(() => {
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
          <Menu.Item key={`dropdown-${el.name}`}>
            <ListButtonWrapper onClick={() => onClick(el)} lastItem={i === arr.length-1 ? true : false}>{el.name}</ListButtonWrapper>
          </Menu.Item>
        ))}
      </Menu>
    );
  }

  function onClickCategory(el) {
    onSelectCategory(el);
    setCategory(el);
    setLabel(undefined);
    setGoalTime(undefined);
  }

  function onClickLabel(el) {
    onSelectLabel(el);
    setLabel(el);
  }

  return (
    <TaskSettingView
      current={current}
      steps={steps}
    />
  );
}

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

const BeforeSelectionWrapper = styled.div`
  color: #BEBEBE;
`

TaskSetting.propTypes = {
  onSelectCategory: PropTypes.func,
  onSelectLabel: PropTypes.func,
  onTimeChange: PropTypes.func,
};
