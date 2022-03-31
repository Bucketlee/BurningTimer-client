import React from 'react';

import AppPage from '../components/AppPage';

export default {
  title: 'Page/AppPage',
  component: AppPage,
};

const Template = (args) => <AppPage {...args} />;

export const AppPageSample = Template.bind({});
AppPageSample.args = {

};
