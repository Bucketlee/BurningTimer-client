import React from 'react';

import TimerDisplay from '../components/TimerDisplay';

export default {
  title: 'Timer/TimerDisplay',
  component: TimerDisplay,
};

const Template = (args) => <TimerDisplay {...args} />;

export const TimerDisplaySample = Template.bind({});
TimerDisplaySample.args = {

};
