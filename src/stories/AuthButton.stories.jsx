import React from 'react';

import AuthButton from '../components/AuthButton';

export default {
  title: 'Button/AuthButton',
  component: AuthButton,
};

const Template = (args) => <AuthButton {...args} />;

export const AuthButtonSample = Template.bind({});
AuthButtonSample.args = {
  text: "로그인",
  type: "button",
  onClick: () => console.log("onClick 실행"),
  color: null,
  backgroundColor: null,
};
