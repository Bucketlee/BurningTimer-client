import React from 'react';

import TabsBoard from '../components/TabsBoard';

export default {
  title: 'Tabs/TabsBoard',
  component: TabsBoard,
};

const Template = (args) => <TabsBoard {...args} />;

export const TabsBoardSample = Template.bind({});
TabsBoardSample.args = {
  tabs: [
    {
      title: "Tab 1",
      content: "Tab 1 information",
    },
    {
      title: "Tab 2",
      content: "Tab 2 information",
    },
    {
      title: "Tab 3",
      content: "Tab 3 information",
    },
  ],
};
