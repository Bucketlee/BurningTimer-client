import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { Global, css } from "@emotion/react";
import { Popover, Modal } from "antd";
import "antd/dist/antd.css";
import { MoreOutlined, FormOutlined, ExclamationCircleOutlined } from "@ant-design/icons";


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

  const PopoverContent = (
    <PopoverContentWrapper>
      <Global styles={PopoverStyled} />
      <PopoverTitleWrapper>어떤 작업을 하시겠습니까?</PopoverTitleWrapper>
      <PopoverButtonWrapper onClick={() => showEditConfirm()} color="#DA291C" backgroundColor="#F2F2F2">수정</PopoverButtonWrapper>
      <PopoverButtonWrapper onClick={() => showDeleteConfirm()} color="#F2F2F2" backgroundColor="#DA291C">삭제</PopoverButtonWrapper>
    </PopoverContentWrapper>
  );

  return (
    <PopoverWrapper>
      <Popover
        content={PopoverContent}
        trigger="click"
        visible={visible}
        onVisibleChange={() => setVisible(!visible)}
      >
        <ButtonWrapper type="button"><MoreOutlined /></ButtonWrapper>
      </Popover>
    </PopoverWrapper>
  )
}

const PopoverWrapper = styled.div`
  line-height: 40px;
  text-align: center;
`

const ButtonWrapper = styled.button`
  padding: 0;
  border: none;
  background: none;
`

const PopoverContentWrapper = styled.div`
  font-size: 13px;
`

const PopoverTitleWrapper = styled.div`
  margin-bottom: 10px;
`

const PopoverButtonWrapper = styled.button`
  margin: 0 10px 0 0;
  border: none;
  border-radius: 3px;
  width: 50px;
  color: ${(props) => props.color};
  background-color: ${(props) => props.backgroundColor};
`

const PopoverStyled = css`

  .ant-modal-confirm-content {
    margin-top: 15px;

    input {
      width: 100%;
      border: 1px solid #F2F2F2;
      border-radius: 3px;

      &:focus {
        outline: 2px solid #DA291C;
      }
    }
  }

  .ant-btn-default {
    border: none;
    border-radius: 3px;
    background-color: #F2F2F2;
    color: #DA291C;

    &:hover {
      background-color: #F2F2F2;
      color: #DA291C;
    }
  }

  .ant-btn-dangerous, .ant-btn-primary {
    border: none;
    border-radius: 3px;
    background-color: #DA291C;
    color: #F2F2F2;

    &:focus {
      background-color: #DA291C;
      color: #F2F2F2;
    }

    &:hover {
      background-color: #FFFFFF;
      color: #DA291C;
    }
  }
`

OptionPopover.propTypes = {
  OptionPopover: PropTypes.array,
  createNewLabel: PropTypes.func,
};
