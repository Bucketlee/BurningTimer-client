import React from "react";
import { List, Card } from "antd";

const updateList = [
  {
    title: "라벨 클릭시 타이머로 바로 이동",
    content: "[Byungwook Oh님 제안] 라벨을 클릭하면 해당 라벨로 타이머를 바로 시작할 수 있도록 함",
  },
  {
    title: "Report 자세히보기 모달 내 Edit 기능",
    content: "Report 자세히보기에서 볼 수 있는 Task의 메모와 딴짓을 수정할 수 있도록 함",
  },
];

export default function CardList() {
  return (
    <div>
      <List
        grid={{ gutter: 16, column: 1 }}
        dataSource={updateList}
        renderItem={item => (
          <List.Item>
            <Card title={item.title}>{item.content}</Card>
          </List.Item>
        )}
      />
    </div>
  );
}
