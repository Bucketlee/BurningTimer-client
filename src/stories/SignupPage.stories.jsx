import React from "react";

import SignupPageView from "../components/SignupPage/SignupPageView";

export default {
  title: "Page/SignupPage",
  component: SignupPageView,
};

const Template = (args) => <SignupPageView {...args} />;

export const SignupPageViewSample = Template.bind({});
SignupPageViewSample.args = {
  onUserNameChange: (e) => console.log("onUserNameChange 실행", e),
  onPasswordChange: (e) => console.log("onPasswordChange 실행", e),
  onPasswordCheckChange: (e) => console.log("onPasswordCheckChange 실행", e),
  onEmailChange: (e) => console.log("onEmailChange 실행", e),
  onKeyPress: (e) => console.log("onKeyPress 실행", e),
  onSubmitForm: () => console.log("onSubmitForm 실행"),
};
