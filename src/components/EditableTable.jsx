import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { Table, Modal, Popover } from "antd";

import Task from "../models/task";
import Api from "../api";
// import Documentation from "./Documentation";
import { openNotification } from "./antdCustom";

export default function DetailsTable({ tasks }) {
  const [data, setData] = useState(undefined);
  // const [isModalVisible, setIsModalVisible] = useState(false);

  // const [memoTarget, setMemoTarget] = useState(undefined);
  // const [distractionTarget, setDistractionTarget] = useState(undefined);
  // const [modifiedData, setModifiedData] = useState(undefined);

  useEffect(() => {
    const originData = [];
    tasks.forEach(task => {
      originData.push({
        key: task._id,
        date: task.startTimestamp.toLocaleDateString(),
        goal: Task.msToTime(+task.goalTime),
        time: Task.msToTime(+task.playTime),
        memo: task.memo ? Task.converteTaskEditorJSDataToHTML(task.memo) : "",
        distraction: task.distraction ? Task.converteTaskEditorJSDataToHTML(task.distraction) : "",
      });
    });
    setData(originData);
  }, [tasks]);

  // async function saveModifiedData(type, target, data) {
  //   console.log(type);
  //   console.log(target)
  //   console.log(data);
  // }

  const columns = [
    {
      title: "날짜",
      dataIndex: "date",
      width: "10%",
    },
    {
      title: "목표 시간",
      dataIndex: "goal",
      width: "10%",
    },
    {
      title: "진행 시간",
      dataIndex: "time",
      width: "10%",
    },
    {
      title: "메모",
      dataIndex: "memo",
      width: "20%",
    },
    {
      title: "딴짓",
      dataIndex: "distraction",
      width: "20%",
    },
    {
      title: "수정",
      key: "edit",
      render: (_, record) => (
        // <Popover
        //   content={
        //     <div>
        //       <EditButton
        //         onClick={() => {
        //           setMemoTarget(record);
        //           setIsModalVisible(true);
        //         }}
        //       >
        //         메모
        //       </EditButton>
        //       <EditButton
        //         onClick={() => {
        //           setDistractionTarget(record);
        //           setIsModalVisible(true);
        //         }}
        //       >
        //       딴짓
        //       </EditButton>
        //     </div>
        //   }
        //   title="데이터를 선택해주세요."
        //   trigger="click"
        // >
        //   <EditButton>Edit</EditButton>
        // </Popover>
        <EditButton onClick={() => openNotification("top", "준비중인 기능입니다.")}>Edit</EditButton>
      ),
    },
  ];

  return (
    <div>
      {/* {memoTarget ?
        <Modal style={{height: "100px"}} visible={isModalVisible} title="메모 변경" onOk={() => saveModifiedData("memo", memoTarget, modifiedData)} onCancel={() => {setMemoTarget(undefined); setIsModalVisible(false)}}>
          <Documentation defaultContent={memoTarget.memo} onHandleSave={(data) => setModifiedData(data)}></Documentation>
        </Modal> :
        <></>
      }
      {distractionTarget ?
        <Modal style={{height: "100px"}} visible={isModalVisible} title="메모 변경" onOk={() => saveModifiedData("distraction", memoTarget, modifiedData)} onCancel={() => {setMemoTarget(undefined); setIsModalVisible(false)}}>
          <Documentation defaultContent={distractionTarget.distraction} onHandleSave={(data) => setModifiedData(data)}></Documentation>
        </Modal> :
        <></>
      } */}
      <Table columns={columns} dataSource={data} />
    </div>
  );
}

const EditButton = styled.button`
  color: #DA291C;
  font-size: 14px;
  border: none;
  background: none;
`