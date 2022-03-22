import React from 'react';

import TimerPage from '../components/TimerPage';

export default {
  title: 'Page/TimerPage',
  component: TimerPage,
};

const Template = (args) => <TimerPage {...args} />;

export const TimerPageSample = Template.bind({});
TimerPageSample.args = {

};
