
import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { Tabs } from "antd";

const { TabPane } = Tabs;

export default function TabsBoard({ tabs }) {
  return (
    <TabsBoardWrapper>
      <Tabs defaultActiveKey="0">
        {tabs.map((tab, i) => (
          <TabPane tab={tab.title} key={i}>
            {tab.content}
          </TabPane>
        ))}
      </Tabs>
    </TabsBoardWrapper>
  );
}

const TabsBoardWrapper = styled.div`
  .ant-tabs-tab:hover {
    color: #DA291C !important;
  }

  .ant-tabs-tab-active > .ant-tabs-tab-btn {
    color: #DA291C !important;
  }

  .ant-tabs-ink-bar {
    background-color: #DA291C !important;
  }
`

TabsBoard.propTypes = {
  tabs: PropTypes.array,
};
