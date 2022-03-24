import React from "react";

import LoginPageView from "../components/LoginPage/LoginPageView";

export default {
  title: "Page/LoginPage",
  component: LoginPageView,
};

const Template = (args) => <LoginPageView {...args} />;

export const LoginPageViewSample = Template.bind({});
LoginPageViewSample.args = {
  onUserNameChange: (e) => console.log("onUserNameChange 실행", e),
  onPasswordChange: (e) => console.log("onPasswordChange 실행", e),
  onKeyPress: (e) => console.log("onKeyPress 실행", e),
  onSubmitForm: () => console.log("onSubmitForm 실행"),
  onClickSignup: () => console.log("onClickSignup 실행"),
  onClickFindId: () => console.log("onClickFindId 실행"),
  onClickFindPassword: () => console.log("onClickFindPassword 실행"),
  onSocialLogin: (e) => console.log("onSocialLogin 실행", e),
};
