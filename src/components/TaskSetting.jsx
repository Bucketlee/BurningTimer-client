import React, { useState } from "react";
import PropTypes from "prop-types";
import { Steps, Menu, Dropdown, TimePicker } from "antd";
import { DownOutlined } from "@ant-design/icons";
import moment from "moment";

import Task from "../models/task";


export default function TaskSetting({ onSelectCategory, onSelectLabel, onTimeChange }) {
  const [category, setCategory] = useState(null);
  const [label, setLabel] = useState(null);
  const [goalTime, setGoalTime] = useState(null);

  const [categories, setCategories] = useState([{name: "hi"}, {name:"hello"}]);
  const [labels, setLabels] = useState([{name: "hi"}, {name:"hello"}]);

  const { Step } = Steps;

  const steps = [
    {
      title: "Category",
      description: "카테고리를 선택해주세요",
      content: (
        <Dropdown overlay={makeDropdown(categories, onClickCategory)}>
          <button className="ant-dropdown-link" onClick={e => e.preventDefault()}>
            {!category ? "카테고리" : category.name} <DownOutlined />
          </button>
        </Dropdown>
      ),
    },
    {
      title: "Label",
      description: "라벨을 선택해주세요",
      content: (
        <Dropdown overlay={makeDropdown(labels, onClickLabel)}>
          <button className="ant-dropdown-link" onClick={e => e.preventDefault()}>
            {!label ? "라벨" : label.name} <DownOutlined />
          </button>
        </Dropdown>
      ),
    },
    {
      title: "Goal Time",
      description: "목표 시간을 선택해주세요",
      content: (
        <TimePicker
          defaultValue={!goalTime ? moment("00:00:00", "HH:mm:ss") : moment(Task.msToTime(goalTime), "HH:mm:ss")}
          onChange={(moment, timeString) => {
            const ms = Task.timeToMs(timeString);
            setGoalTime(moment);
            onTimeChange(ms);
          }}
        />
      ),
    },
  ];

  function makeDropdown(arr, onClick) {
    return (
      <Menu>
        {arr.map((el) => (
          <Menu.Item key={`dropdown-${el.name}`}>
            <button onClick={() => onClick(el)}>{el.name}</button>
          </Menu.Item>
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
    <div>
      <Steps progressDot current={0} direction="vertical">
        {steps.map(item => (
          <Step key={item.title} title={item.title} description={item.description} />
        ))}
      </Steps>
      {steps.map(step => step.content)}
    </div>
  );
}

TaskSetting.propTypes = {
  onSelectCategory: PropTypes.func,
  onSelectLabel: PropTypes.func,
  onTimeChange: PropTypes.func,
};
