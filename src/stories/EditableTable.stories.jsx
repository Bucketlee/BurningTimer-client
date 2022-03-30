import React from "react";

import EditableTable from "../components/EditableTable";

export default {
  title: "Table/EditableTable",
  component: EditableTable,
};

const Template = (args) => <EditableTable {...args} />;

export const EditableTableSample = Template.bind({});
EditableTableSample.args = {
  data: [
    {
        "_id": "61ddab403c02597c636ae5e7",
        "userId": "61dbefd228da5c1326fbd57a",
        "labelId": "61dd8db05f25014e13af718c",
        "startTimestamp": new Date("Wed Jan 12 2022 01:07:25 GMT+0900 (한국 표준시)"),
        "endTimestamp": new Date("Wed Jan 12 2022 01:07:28 GMT+0900 (한국 표준시)"),
        "pauseAndRestarts": null,
        "goalTime": 180000,
        "playTime": 2150,
        "memo": {
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
        "distraction": null,
        "createdAt": "2022-01-11T16:07:28.202Z",
        "updatedAt": "2022-01-11T16:07:28.202Z"
    },
    {
        "_id": "61de639bd5044a8b7c729721",
        "userId": "61dbefd228da5c1326fbd57a",
        "labelId": "61de6382d5044a8b7c72971d",
        "startTimestamp": new Date("Wed Jan 12 2022 14:13:46 GMT+0900 (한국 표준시)"),
        "endTimestamp": new Date("Wed Jan 12 2022 14:14:03 GMT+0900 (한국 표준시)"),
        "pauseAndRestarts": [
            new Date("Wed Jan 12 2022 14:13:59 GMT+0900 (한국 표준시)"),
            new Date("Wed Jan 12 2022 14:14:00 GMT+0900 (한국 표준시)")
        ],
        "goalTime": 14644000,
        "playTime": 15750,
        "memo": null,
        "distraction": null,
        "createdAt": "2022-01-12T05:14:03.578Z",
        "updatedAt": "2022-01-12T05:14:03.578Z"
    },
    {
        "_id": "61de63d8d5044a8b7c729727",
        "userId": "61dbefd228da5c1326fbd57a",
        "labelId": "61de6382d5044a8b7c72971d",
        "startTimestamp": new Date("Wed Jan 12 2022 14:14:56 GMT+0900 (한국 표준시)"),
        "endTimestamp": new Date("Wed Jan 12 2022 14:15:04 GMT+0900 (한국 표준시)"),
        "pauseAndRestarts": [
            new Date("Wed Jan 12 2022 14:15:01 GMT+0900 (한국 표준시)"),
            new Date("Wed Jan 12 2022 14:15:02 GMT+0900 (한국 표준시)"),
            new Date("Wed Jan 12 2022 14:15:03 GMT+0900 (한국 표준시)")
        ],
        "goalTime": 21967000,
        "playTime": 6200,
        "memo": {
          "time": 1648150661241,
          "blocks": [
              {
                  "id": "oUq2g_tl8y",
                  "type": "paragraph",
                  "data": {
                      "text": "클릭하여 메모를 작성할aff"
                  }
              },
              {
                  "id": "T7NypyZxfC",
                  "type": "paragraph",
                  "data": {
                      "text": "afsf"
                  }
              },
              {
                  "id": "hgUuYlxTDS",
                  "type": "paragraph",
                  "data": {
                      "text": "수 있습니다."
                  }
              },
              {
                  "id": "6MDF1tzRjE",
                  "type": "header",
                  "data": {
                      "text": "ddd",
                      "level": 2
                  }
              },
              {
                  "id": "kI8bVEEN9v",
                  "type": "paragraph",
                  "data": {
                      "text": "ddddd"
                  }
              },
              {
                  "id": "95u_CFK5K0",
                  "type": "checkList",
                  "data": {
                      "items": [
                          {
                              "text": "faff",
                              "checked": false
                          },
                          {
                              "text": "ffsfa",
                              "checked": false
                          },
                          {
                              "text": "sczzz",
                              "checked": true
                          },
                          {
                              "text": "zzz",
                              "checked": false
                          }
                      ]
                  }
              },
              {
                  "id": "gbAQ-H94J3",
                  "type": "paragraph",
                  "data": {
                      "text": "dddddd"
                  }
              }
          ],
          "version": "2.23.2"
      },
        "distraction": null,
        "createdAt": "2022-01-12T05:15:04.395Z",
        "updatedAt": "2022-01-12T05:15:04.395Z"
    }
  ],
};
