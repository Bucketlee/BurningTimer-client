import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { Global, css } from "@emotion/react";
import { Popover } from "antd";
import "antd/dist/antd.min.css";
import { MoreOutlined } from "@ant-design/icons";


export default function OptionPopoverView({ visible, onVisibleChange, onClickEdit, onClickDelete }) {

  const PopoverContent = (
    <PopoverContentWrapper>
      <Global styles={PopoverStyled} />
      <PopoverTitleWrapper>어떤 작업을 하시겠습니까?</PopoverTitleWrapper>
      <PopoverButtonWrapper onClick={() => onClickEdit()} color="#DA291C" backgroundColor="#F2F2F2">수정</PopoverButtonWrapper>
      <PopoverButtonWrapper onClick={() => onClickDelete()} color="#F2F2F2" backgroundColor="#DA291C">삭제</PopoverButtonWrapper>
    </PopoverContentWrapper>
  );

  return (
    <PopoverWrapper>
      <Popover
        content={PopoverContent}
        trigger="click"
        visible={visible}
        onVisibleChange={() => onVisibleChange()}
      >
        <ButtonWrapper type="button"><MoreOutlined /></ButtonWrapper>
      </Popover>
    </PopoverWrapper>
  );
}

const PopoverWrapper = styled.div`
  line-height: 40px;
  text-align: center;
`

const ButtonWrapper = styled.button`
  padding: 0;
  border: none;
  background: none;
  height: 100%;
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

OptionPopoverView.propTypes = {
  visible: PropTypes.bool,
  onVisibleChange: PropTypes.func,
  onClickEdit: PropTypes.func,
  onClickDelete: PropTypes.func,
};
