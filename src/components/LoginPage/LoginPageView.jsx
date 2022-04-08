import React from "react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";

import Header from "../Header";
import AuthButton from "../AuthButton";
import GoogleLoginButton from "../GoogleLoginButton";

export default function LoginPageView({
  headerButtons,
  onUserNameChange,
  onPasswordChange,
  onKeyPress,
  onSubmitForm,
  onClickSignup,
  onClickFindId,
  onClickFindPassword,
  onSocialLogin,
}) {
  return(
    <LoginPageViewWrapper>
      <Header buttons={headerButtons} />
      <AuthInfoWrapper>
        <AuthHeaderWrapper>로그인</AuthHeaderWrapper>
        <FormWrapper className="log-form" method="POST">
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
        </FormWrapper>
        <AuthButton
          text="로그인"
          onClick={() => onSubmitForm()}
        />
        <SocialLoginWrapper>
          <GoogleLoginButton
            onSocial={(e) => onSocialLogin(e)}
          />
        </SocialLoginWrapper>
        <div>
          <AuthPageButtonWrapper onClick={() => onClickSignup()}>회원가입</AuthPageButtonWrapper>
          <AuthPageButtonWrapper onClick={() => onClickFindId()}>아이디 찾기</AuthPageButtonWrapper>
          <AuthPageButtonWrapper onClick={() => onClickFindPassword()}>비밀번호 찾기</AuthPageButtonWrapper>
        </div>
      </AuthInfoWrapper>
    </LoginPageViewWrapper>
  );
}

const LoginPageViewWrapper = styled.section`
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

const AuthPageButtonWrapper = styled.button`
  margin: 20px 10px;
  padding: 0;
  color: black;
  border: none;
  background-color: transparent;
`

const SocialLoginWrapper = styled.div`
  margin: 25px 0 10px 0;
  button {
    width: 100%;

    span {
      font-weight: 900;
      font-size: 16px;
    }
  }
`

LoginPageView.propTypes = {
  onUserNameChange: PropTypes.func,
  onPasswordChange: PropTypes.func,
  onKeyPress: PropTypes.func,
  onSubmitForm: PropTypes.func,
  onClickSignup: PropTypes.func,
  onClickFindId: PropTypes.func,
  onClickFindPassword: PropTypes.func,
  onSocialLogin: PropTypes.func,
};
