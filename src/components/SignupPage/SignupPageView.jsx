import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";

import Header from "../Header";
import AuthButton from "../AuthButton";

export default function SignupPageView({
  headerButtons,
  onUserNameChange,
  onPasswordChange,
  onPasswordCheckChange,
  onEmailChange,
  onKeyPress,
  onSubmitForm,
}) {
  return (
    <SignupPageViewWrapper>
      <Header buttons={headerButtons} />
      <AuthInfoWrapper>
        <AuthHeaderWrapper>회원가입</AuthHeaderWrapper>
        <FormWrapper id="sign-up-form" method="POST">
          <div>아이디</div>
          <InputWrapper
            type="text"
            name="username"
            onChange={(e) => onUserNameChange(e.target.value)}
            onKeyPress={(e) => onKeyPress(e)}
            autoComplete={"off"}
          />
          <div>비밀번호</div>
          <InputWrapper
            type="password"
            name="password"
            onChange={(e) => onPasswordChange(e.target.value)}
            onKeyPress={(e) => onKeyPress(e)}
            autoComplete={"new-password"}
          />
          <div>비밀번호 확인</div>
          <InputWrapper
            type="password"
            name="passwordcheck"
            onChange={(e) => onPasswordCheckChange(e.target.value)}
            onKeyPress={(e) => onKeyPress(e)}
            autoComplete={"new-password"}
          />
          <div>이메일</div>
          <InputWrapper
            type="email"
            name="email"
            onChange={(e) => onEmailChange(e.target.value)}
            onKeyPress={(e) => onKeyPress(e)}
          />
        </FormWrapper>
        <AuthButton
            text="회원가입"
            type="submit"
            onClick={() => onSubmitForm()}
          />
      </AuthInfoWrapper>
    </SignupPageViewWrapper>
  );
}

const SignupPageViewWrapper = styled.section`
  height: 100vh;
  display: grid;
  grid-template-rows: 45px auto;
`

const AuthInfoWrapper = styled.div`
  width: 400px;
  margin: auto;
  font-size: 16px;

  @media screen and (max-width:1023px) {
    width: 50%;
  }

  @media screen and (max-width:767px) {
    width: 80%;
  }
`

const AuthHeaderWrapper = styled.div`
  font-size: 32px;
  font-weight: 600;
  width: 80%;
  margin: 0 auto;
  border-bottom: 1px solid #ddd;
  text-align: center;

  @media screen and (max-width:1023px) {
    font-size: 28px;
  }

  @media screen and (max-width:767px) {
    font-size: 24px;
  }
`

const FormWrapper = styled.form`
  margin: 35px 0 20px 0;
  text-align: left;
`

const InputWrapper = styled.input`
  border: 1px solid #ddd;
  width: 100%;
  height: 30px;
  margin: 5px 0 15px 0;
  border-radius: 0%;

  &:focus {
    outline: 1px solid #DA291C;
  }
`

SignupPageView.propTypes = {
  onUserNameChange: PropTypes.func,
  onPasswordChange: PropTypes.func,
  onPasswordCheckChange: PropTypes.func,
  onEmailChange: PropTypes.func,
  onKeyPress: PropTypes.func,
  onSubmitForm: PropTypes.func,
};
