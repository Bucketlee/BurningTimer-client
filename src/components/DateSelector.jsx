import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { Global, css } from "@emotion/react";
import { DatePicker } from "antd";
import moment from "moment";

const { RangePicker } = DatePicker;
const dateFormat = "YYYY-MM-DD";

export default function DateSelector({ onSelectDate }) {
  return (
    <DateSelectorWrapper>
      <Global styles={RangePickerStyled} />
      <RangePicker
        defaultValue={[moment(new Date(), dateFormat), moment(new Date(), dateFormat)]}
        format={dateFormat}
        onCalendarChange={(_, strDate) => onSelectDate(strDate)}
      />
    </DateSelectorWrapper>
  )
}

const RangePickerStyled = css`
  .ant-picker-cell-in-view.ant-picker-cell-range-end .ant-picker-cell-inner, .ant-picker-cell-in-view.ant-picker-cell-range-start .ant-picker-cell-inner, .ant-picker-cell-in-view.ant-picker-cell-selected .ant-picker-cell-inner {
    background-color: #DA291C !important;
  }

  .ant-picker-cell-in-view.ant-picker-cell-today .ant-picker-cell-inner:before {
    border-color: #DA291C !important;
  }

  .ant-picker-cell-in-view.ant-picker-cell-in-range:before {
    background-color: #DA291C1A !important;
    border-color: #DA291C !important;
  }

  .ant-picker-cell-in-view.ant-picker-cell-range-end:not(.ant-picker-cell-range-end-single):before, .ant-picker-cell-in-view.ant-picker-cell-range-start:not(.ant-picker-cell-range-start-single):before {
    background-color: #DA291C1A !important;
  }

  .ant-picker-cell-range-hover-end::after, .ant-picker-cell-range-hover-start::after, .ant-picker-cell-range-hover::after {
    border-color: #DA291C !important;
  }

`

const DateSelectorWrapper = styled.div`
  .ant-picker-range:hover {
    border-color: #DA291C !important;
  }

  .ant-picker-focused {
    border-color: #DA291C !important;
    box-shadow: none !important;

    .ant-picker-active-bar {
      background-color: #DA291C !important;
    }
  }
`

DateSelector.propTypes = {
  onSelectDate: PropTypes.func,
};
