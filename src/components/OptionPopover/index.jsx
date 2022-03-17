import React, { useState, useRef } from "react";
import { Modal } from "antd";
import "antd/dist/antd.min.css";
import { FormOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import OptionPopoverView from "./OptionPopoverView";

export default function OptionPopover({ confirmEdit, confirmDelete }) {
  const [visible, setVisible] = useState(false);

  const editInputRef = useRef(null);

  const { confirm } = Modal;

  function showEditConfirm() {
    setVisible(false);
    confirm({
      title: "변경할 내용을 입력해주세요.",
      icon: <FormOutlined style={{ color: "#DA291C" }} />,
      content: <input ref={editInputRef} />,
      okText: "변경",
      cancelText: "취소",
      onOk() {
        confirmEdit(editInputRef.current.value);
      },
      onCancel() {
      },
    });
  }

  function showDeleteConfirm() {
    setVisible(false);
    confirm({
      title: "정말로 삭제하시겠습니까?",
      icon: <ExclamationCircleOutlined style={{ color: "#DA291C" }} />,
      content: "삭제해도 해당 카테고리/라벨로 진행한 리포트는 남아있습니다.",
      okText: "삭제",
      okType: "danger",
      cancelText: "취소",
      onOk() {
        confirmDelete();
      },
      onCancel() {
      },
    });
  }

  return (
    <OptionPopoverView
      visible={visible}
      onVisibleChange={() => setVisible(!visible)}
      onClickEdit={showEditConfirm}
      onClickDelete={showDeleteConfirm}
    />
  );
}
