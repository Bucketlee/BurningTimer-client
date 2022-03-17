import React from 'react';

import Menu from '../components/Menu';

export default {
  title: 'Menu/Menu',
  component: Menu,
};

const Template = (args) => <Menu {...args} />;

export const MenuSample = Template.bind({});
MenuSample.args = {
};
