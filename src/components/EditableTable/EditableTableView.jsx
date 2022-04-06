import React from "react";
import styled from "@emotion/styled";
import { Global, css } from "@emotion/react";
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
      <Global styles={ModalStyled} />
      <EditButton onClick={onClickEditButton}>
        자세히보기
      </EditButton>
      <Modal title="자세히보기" visible={isModalVisible} onOk={onClickModalOk} onCancel={onClickModalCancel} width={"80%"}>
        <Table columns={columns} dataSource={dataSource} />
      </Modal>
    </div>
  );
}

const ModalStyled = css`
  .ant-pagination-item-active {
    border-color: #DA291C !important;

    a {
      color: #DA291C !important;
    }
  }
`

const EditButton = styled.button`
  color: #DA291C;
  border: none;
  background: none;
  font-size: 14px;
  font-weight: 600;
`
