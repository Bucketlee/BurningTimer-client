import React, { useState } from "react";
import styled from "@emotion/styled";

import Api from "../api";
import { openNotification } from "./antdCustom";
import { CheckCircleOutlined } from "@ant-design/icons";

export default function ProposalForm() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [content, setContent] = useState("");

  async function submitForm() {
    try {
      if (!email && !name && !content) {
        return;
      }
      await Api.feedback.createNewFeedback({ email: email, name: name, content: content });
      openNotification("top", "의견이 전송되었습니다.", "", <CheckCircleOutlined style={{ color: "#27251F" }} />);
      setEmail("");
      setName("");
      setContent("");
    } catch (err) {
      if (err.response && err.response.status === 500) {
        openNotification("top", "서버에 오류가 있습니다.", "잠시 후 다시 시도해 주세요. 해당 문제가 반복될 경우 고객센터로 문의해 주세요.");
      } else {
        openNotification("top", "서버에 연결되지 않습니다.", "잠시 후 다시 시도해 주세요. 해당 문제가 반복될 경우 고객센터로 문의해 주세요.");
      }
    }
  }
  return (
    <div>
      <FormWrapper>
        <div>이메일 (선택사항)</div>
        <InputWrapper
          type="text"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete={"off"}
        />
        <div>이름 (선택사항)</div>
        <InputWrapper
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete={"off"}
        />
        <div>무엇을 제안하시나요?</div>
        <TextareaWrapper
          type="text"
          name="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          autoComplete={"off"}
        />
      </FormWrapper>
      <ButtonWrapper
        onClick={() => submitForm()}
      >
        제안하기
      </ButtonWrapper>
    </div>
  );
}

const FormWrapper = styled.form`
  margin: 5px;
  font-size: 15px;
  color: #DA291C;
`

const InputWrapper = styled.input`
  padding: 10px;
  border: 1px solid #ddd;
  width: 100%;
  height: 40px;
  margin: 5px 0 20px 0;
  color: #27251F;

  &:focus {
    outline: 1px solid #DA291C;
  }
`

const TextareaWrapper = styled.textarea`
  padding: 10px;
  border: 1px solid #ddd;
  width: 100%;
  height: 100px;
  margin: 5px 0 20px 0;
  color: #27251F;

  &:focus {
    outline: 1px solid #DA291C;
  }
`

const ButtonWrapper = styled.button`
  height: 30px;
  width: 80px;
  border: none;
  border-radius: 3px;
  background-color: #DA291C;
  color: #FFFFFF;
  font-size: 15px;
`
