import React from 'react';

import OptionPopup from '../components/OptionPopup';

export default {
  title: 'Option/OptionPopup',
  component: OptionPopup,
};

const Template = (args) => <OptionPopup {...args} />;

export const OptionPopupSample = Template.bind({});
OptionPopupSample.args = {
  confirmEdit: (value) => console.log("confirmEdit 실행", value),
  confirmDelete: () => console.log("confirmDelete 실행"),
};
