import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";

import DateSelector from "../DateSelector";
import DataLabel from "../DataLabel";
import DetailTable from "../DetailTable";


export default function ReportPageView({
  onSelectDate,
  labels,
  data,
  selectedDate,
}) {
  return (
    <ReportPageViewWrapper>
      <TitleWrapper>
        전체 통계 보기
      </TitleWrapper>
      <DateWrapper>
        <DateSelector onSelectDate={onSelectDate} />
      </DateWrapper>
      <ContentsWrapper>
        <ReportLabelWrapper>
          {labels.map(el => (
            <DataLabel
              key={`data-label-${el.imageName}`}
              title={el.title}
              value={el.value}
              imageName={el.imageName}
            />
          ))}
        </ReportLabelWrapper>
        <ReportGraphWrapper>
        </ReportGraphWrapper>
        <ReportDetailsWrapper>
          <DetailTable
            data={data}
            selectedDate={selectedDate}
          />
        </ReportDetailsWrapper>
      </ContentsWrapper>
    </ReportPageViewWrapper>
  )
}

const ReportPageViewWrapper = styled.section`
  padding: 25px;
  background-color: #FFFFFF;
  height: 100vh;
  display: grid;
  grid-template-rows: 50px 95px auto;
`

const TitleWrapper = styled.h2`
  margin-bottom: 0;
  font-size: 32px;
  font-weight: 800;
`

const DateWrapper = styled.div`
  margin: 30px 0;
`

const ContentsWrapper = styled.div`
  display: grid;
  grid-template-columns: 400px auto;
  grid-template-rows: 250px auto;
  grid-template-areas:
  "label details"
  "graph details";
`

const ReportLabelWrapper = styled.div`
  grid-area: label;
  display: grid;
  grid-template-columns: 200px 200px;
`

const ReportGraphWrapper = styled.div`
  grid-area: graph;
`

const ReportDetailsWrapper = styled.div`
  grid-area: details;
`

ReportPageView.propTypes = {
  onSelectDate: PropTypes.func,
  labels: PropTypes.array,
  data: PropTypes.array,
  selectedDate: PropTypes.array,
};
