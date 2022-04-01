import React from 'react';

import MainPage from '../components/MainPage';

export default {
  title: 'Page/MainPage',
  component: MainPage,
};

const Template = (args) => <MainPage {...args} />;

export const MainPageSample = Template.bind({});
MainPageSample.args = {
};
