import React from 'react';

import TodoPage from '../components/TodoPage';

export default {
  title: 'Page/TodoPage',
  component: TodoPage,
};

const Template = (args) => <TodoPage {...args} />;

export const TodoPageSample = Template.bind({});
TodoPageSample.args = {

};
