import React from 'react';

import Header from '../components/Header';

export default {
  title: 'Header/Header',
  component: Header,
};

const Template = (args) => <Header {...args} />;

export const HeaderSample = Template.bind({});
HeaderSample.args = {
};
