import React from "react";

import Result from "../components/Result";

export default {
  title: "Task/Result",
  component: Result,
};

const Template = (args) => <Result {...args} />;

export const ResultSample = Template.bind({});
ResultSample.args = {
  percent: 189,
  title: "버닝 결과",
  content: <div>이벤트 조건을 충족했습니다</div>,
  footer: <div>또 진행하시겠습니까?</div>,
  okButtonText: "Ok",
  onClickOkButton: () => console.log("onClickOkButton 실행"),
  cancelButtonText: "Cancel",
  onClickCancelButton: () => console.log("onClickCancelButton 실행"),
};
