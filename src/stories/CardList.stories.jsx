import React from "react";

import CardList from "../components/CardList";

export default {
  title: "List/CardList",
  component: CardList,
};

const Template = (args) => <CardList {...args} />;

export const CardListSample = Template.bind({});
CardListSample.args = {
};
