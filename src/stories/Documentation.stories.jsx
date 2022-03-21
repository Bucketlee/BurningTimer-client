import React from 'react';

import Documentation from '../components/Documentation';

export default {
  title: 'Document/Documentation',
  component: Documentation,
};

const Template = (args) => <Documentation {...args} />;

export const DocumentationSample = Template.bind({});
DocumentationSample.args = {
  title: "Memo",
  subTitle: "메모 등 자유롭게 입력하세요.",
  defaultContent: {
    "blocks": [
      {
         "id": "oUq2g_tl8y",
         "type": "header",
         "data": {
            "text": "이곳에 작성하세요.",
            "level": 3
         }
      },
      {
         "id": "zbGZFPM-iI",
         "type": "paragraph",
         "data": {
            "text": "클릭하여 간단하게 작성할 수 있습니다."
         }
      },
    ],
  },
  onHandleSave: (e) => console.log(e),
};
