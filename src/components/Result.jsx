
import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { Progress } from "antd";

export default function Result({
  percent,
  title,
  content,
  footer,
  okButtonText,
  onClickOkButton,
  cancelButtonText,
  onClickCancelButton,
}) {
  return (
    <ResultWrapper>
      <ProgressWrapper>
        <Progress
          type="circle"
          strokeColor={{
            '0%': '#FFC72C',
            '100%': '#DA291C',
          }}
          percent={percent}
        />
      </ProgressWrapper>
      <TitleWrapper>{title}</TitleWrapper>
      <ContentWrapper>{content}</ContentWrapper>
      <FooterWrapper>{footer}</FooterWrapper>
      <div>
        <ButtonWrapper onClick={() => onClickOkButton()} primary={true}>{okButtonText}</ButtonWrapper>
        <ButtonWrapper onClick={() => onClickCancelButton()} primary={false}>{cancelButtonText}</ButtonWrapper>
      </div>
    </ResultWrapper>
  );
}

const ResultWrapper = styled.div`
  text-align: center;
`

const ProgressWrapper = styled.div`
  .ant-progress-text {
    color: #DA291C !important;
  }
`

const TitleWrapper = styled.div`
  margin: 30px 0 10px 0;
  font-size: 48px;
  font-weight: 800;
`

const ContentWrapper = styled.div`
  margin-bottom: 30px;
  font-size: 16px;
`

const FooterWrapper = styled.div`
  margin: 20px 0;
  font-size: 16px;
  font-weight: 600;
`

const ButtonWrapper = styled.button`
  margin: 10px;
  width: 100px;
  height: 50px;
  font-size: 14px;
  font-weight: 600;
  border: none;
  border-radius: 5px;
  background-color: ${(props) => props.primary ? "#DA291C" : "#27251F"};
  color: ${(props) => props.primary ? "#FFFFFF" : "#FFFFFF"};

  &:hover {
    border: 1px solid #F2F2F2;
  }
`

Result.propTypes = {
  percent: PropTypes.number,
  title: PropTypes.string,
  content: PropTypes.object,
  footer: PropTypes.string,
  okButtonText: PropTypes.string,
  onClickOkButton: PropTypes.func,
  cancelButtonText: PropTypes.string,
  onClickCancelButton: PropTypes.func,
};
