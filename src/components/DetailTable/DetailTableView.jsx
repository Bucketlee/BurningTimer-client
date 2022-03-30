import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { Table } from "antd";
import "antd/dist/antd.min.css";

export default function DetailTableView({ dataSource, columns }) {
  return (
    <DetailTableViewWrapper>
      <Table dataSource={dataSource} columns={columns} />
    </DetailTableViewWrapper>
  );
}

const DetailTableViewWrapper = styled.div`

`

DetailTableView.propTypes = {
  dataSource: PropTypes.array,
  columns: PropTypes.array,
};
