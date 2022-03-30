import React from "react";
import styled from "@emotion/styled";
import { Table, Modal } from "antd";

export default function EditableTableView({
  onClickEditButton,
  isModalVisible,
  onClickModalOk,
  onClickModalCancel,
  columns,
  dataSource,
}) {
  return (
    <div>
      <EditButton onClick={onClickEditButton}>
        자세히보기
      </EditButton>
      <Modal title="자세히보기" visible={isModalVisible} onOk={onClickModalOk} onCancel={onClickModalCancel} width={"80%"}>
        <Table columns={columns} dataSource={dataSource} />
      </Modal>
    </div>
  );
}

const EditButton = styled.button`
  color: #DA291C;
  border: none;
  background: none;
  font-size: 14px;
  font-weight: 600;
`
