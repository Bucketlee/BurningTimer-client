import React from 'react';

import ProposalForm from '../components/ProposalForm';

export default {
  title: 'Form/ProposalForm',
  component: ProposalForm,
};

const Template = (args) => <ProposalForm {...args} />;

export const ProposalFormSample = Template.bind({});
ProposalFormSample.args = {
};
