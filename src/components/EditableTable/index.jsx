import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";

import Task from "../../models/task";
import { openNotification } from "../antdCustom";
import EditableTableView from "./EditableTableView";

export default function EditableTable({ data }) {
  const [dataSource, setDataSource] = useState(undefined);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    const originDataSource = [];
    data.forEach(task => {
      originDataSource.push({
        key: task._id,
        date: (new Date(task.startTimestamp)).toLocaleDateString(),
        goal: Task.msToTime(+task.goalTime),
        time: Task.msToTime(+task.playTime),
        memo: task.memo ? Task.converteTaskEditorJSDataToHTML(task.memo) : "",
        distraction: task.distraction ? Task.converteTaskEditorJSDataToHTML(task.distraction) : "",
      });
    });

    setDataSource(originDataSource);
  }, [data]);

  const columns = [
    {
      title: "날짜",
      dataIndex: "date",
      key: "date",
      width: "12%",
    },
    {
      title: "목표 시간",
      dataIndex: "goal",
      key: "goal",
      width: "12%",
    },
    {
      title: "진행 시간",
      dataIndex: "time",
      key: "time",
      width: "12%",
    },
    {
      title: "메모",
      dataIndex: "memo",
      key: "memo",
      width: "28%",
    },
    {
      title: "딴짓",
      dataIndex: "distraction",
      key: "distraction",
      width: "28%",
    },
    {
      title: "수정",
      key: "edit",
      render: (_, record) => (
        <EditButton onClick={() => openNotification("top", "준비중인 기능입니다.")}>Edit</EditButton>
      ),
    },
  ];

  return (
    <EditableTableView
      onClickEditButton={showModal}
      isModalVisible={isModalVisible}
      onClickModalOk={handleOk}
      onClickModalCancel={handleCancel}
      columns={columns}
      dataSource={dataSource}
    />
  );
}

const EditButton = styled.button`
  color: #DA291C;
  border: none;
  background: none;
  font-size: 14px;
  font-weight: 600;
`

EditableTable.propTypes = {
  data: PropTypes.array,
};
