import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";

export default function DataLabel({ title, value, imageName }) {
  return (
    <DataLabelWrapper>
      <LabelImageWrapper className="report-brief-label-image">
        <img style={{ width: "100%" }} alt={imageName} src={"/image/" + imageName + ".png"}></img>
      </LabelImageWrapper>
      <LabelValueWrapper>{value}</LabelValueWrapper>
      <LabelTitleWrapper>{title}</LabelTitleWrapper>
    </DataLabelWrapper>
  );
}

const DataLabelWrapper = styled.div`
  width: 175px;
  height: 100px;
  background-color: #F2F2F2;
  border-radius: 5px;
  display: grid;
  grid-template-columns: 60px 1fr;
  grid-template-rows: 60px 40px;
  grid-template-areas:
  "image value"
  "title title";
`

const LabelImageWrapper = styled.div`
  grid-area: image;
  margin: 15px;
`

const LabelValueWrapper = styled.div`
  font-size: 20px;
  font-weight: 600;
  text-align: right;
  padding: 20px 15px 0 0;
  grid-area: value;
`

const LabelTitleWrapper = styled.div`
  font-size: 16px;
  text-align: right;
  padding: 0 15px 0 0;
  grid-area: title;
`

DataLabel.propTypes = {
  title: PropTypes.string,
  val: PropTypes.string,
  imageName: PropTypes.string,
};

DataLabel.defaultProps = {
  title: "",
  val: "",
};
