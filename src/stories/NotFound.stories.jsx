import React from "react";
import NotFound from "../components/NotFound";

export default {
  title: "Page/NotFound",
  component: NotFound,
}

const Template = args => <NotFound {...args} />

export const NotFoundSample = Template.bind({})
NotFoundSample.args = {

}