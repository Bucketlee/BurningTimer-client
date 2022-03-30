import React from "react";

import DetailTableView from "../components/DetailTable/DetailTableView";

export default {
  title: "Table/DetailTable",
  component: DetailTableView,
};

const Template = (args) => <DetailTableView {...args} />;

export const DetailTableSample = Template.bind({});
DetailTableSample.args = {
  dataSource: [
    {
      key: 'a',
      name: "A 테스트",
      weight: "30%",
      time: "03:00:00",
      number: "3회",
      average: "01:00:00",
      runDays: "2일 / 10일",
      showDetails: (
        <>
          <button type="primary" onClick={() => console.log("onClick 실행")}>
            자세히보기
          </button>
        </>
      ),
    },
    {
      key: 'b',
      name: "B 테스트",
      weight: "10%",
      time: "01:00:00",
      number: "1회",
      average: "01:00:00",
      runDays: "1일 / 10일",
      showDetails: (
        <>
          <button type="primary" onClick={() => console.log("onClick 실행")}>
            자세히보기
          </button>
        </>
      ),
    },
    {
      key: 'c',
      name: "[ 삭제 된 라벨 ]",
      weight: "60%",
      time: "06:00:00",
      number: "6회",
      average: "01:00:00",
      runDays: "5일 / 10일",
      showDetails: (
        <>
          <button type="primary" onClick={() => console.log("onClick 실행")}>
            자세히보기
          </button>
        </>
      ),
    }
  ],
  columns: [
    {
      title: '라벨명',
      dataIndex: 'name',
      key: 'name',
      sorter: () => console.log("sorter 실행"),
    },
    {
      title: '비중',
      dataIndex: 'weight',
      key: 'weight',
      sorter: () => console.log("sorter 실행"),
      defaultSortOrder: 'descend',
    },
    {
      title: '총 시간',
      dataIndex: 'time',
      key: 'time',
      sorter: () => console.log("sorter 실행"),
    },
    {
      title: '총 횟수',
      dataIndex: 'number',
      key: 'number',
      sorter: () => console.log("sorter 실행"),
    },
    {
      title: '회당 평균 시간',
      dataIndex: 'average',
      key: 'average',
      sorter: () => console.log("sorter 실행"),
    },
    {
      title: '진행 일 수',
      dataIndex: 'runDays',
      key: 'runDays',
      sorter: () => console.log("sorter 실행"),
    },
    {
      title: '세부사항',
      dataIndex: 'showDetails',
      key: 'showDetails',
    },
  ],
};
