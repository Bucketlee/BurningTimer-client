import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";

import AddList from "../AddList";
import OptionPopup from "../OptionPopover";

export default function LabelsView({
  title,
  contents,
  onChangeAddList,
  onPressEnterAddList,
  onPressEscapeAddList,
  AddListValue,
  onDragOver,
  onDragStart,
  onDragEnter,
  onDragEnd,
  onClickContent,
  confirmEditOptionPopup,
  confirmDeleteOptionPopup,
}) {
  return (
    <div>
      <TitleWrapper>{title}</TitleWrapper>
      <AddListWrapper>
        <AddList
          placeholder={"새로운 라벨"}
          onChange={(e) => onChangeAddList(e.target.value)}
          onPressEnter={() => onPressEnterAddList(AddListValue)}
          onPressEscape={() => onPressEscapeAddList()}
          value={AddListValue}
        />
      </AddListWrapper>
      <UlWrapper>
        {contents.map(
          name => (
            <LiWrapper
              key={`label-${name}`}
              draggable
              onDragOver={(e) => onDragOver(e)}
              onDragStart={(e) => onDragStart(e)}
              onDragEnter={(e) => onDragEnter(e)}
              onDragEnd={(e) => onDragEnd(e)}
            >
              <ButtonWrapper onClick={() => onClickContent(name)}>{name}</ButtonWrapper>
              <OptionPopup
                confirmEditO={(value) => confirmEditOptionPopup(name, value)}
                confirmDelete={() => confirmDeleteOptionPopup(name)}
              />
            </LiWrapper>
          )
        )}
      </UlWrapper>
    </div>
  );
}

const TitleWrapper = styled.h2`
  margin-bottom: 20px;
  font-size: 48px;
  font-weight: 800;
`

const AddListWrapper = styled.div`
  padding: 8px;
  background-color: #F2F2F2;
  border: 1px solid #E2E2E2;
  border-radius: 3px;

  input {
    font-size: 14px !important;
  }
`

const UlWrapper = styled.ul`
  margin: 0;
  padding: 10px 0 0 0;
  list-style: none;
`

const LiWrapper = styled.li`
  padding: 7px 15px;
  display: grid;
  grid-template-columns: auto 40px;
  border-bottom: 1px solid #E2E2E2;

  &:hover {
    background-color: #E2E2E2;
  }
`

const ButtonWrapper = styled.button`
  padding: 0;
  background: none;
  border: none;
  line-height: 40px;
  color: #797978;
  text-align: left;
  font-size: 14px;

  &:hover {
    color: #27251F;
    font-weight: 600;
  }
`

LabelsView.propTypes = {
  title: PropTypes.string,
  contents: PropTypes.array,
  onChangeAddList: PropTypes.func,
  onPressEnterAddList: PropTypes.func,
  onPressEscapeAddList: PropTypes.func,
  AddListValue: PropTypes.string,
  onDragOver: PropTypes.func,
  onDragStart: PropTypes.func,
  onDragEnter: PropTypes.func,
  onDragEnd: PropTypes.func,
  onClickContent: PropTypes.func,
  confirmEditOptionPopup: PropTypes.func,
  confirmDeleteOptionPopup: PropTypes.func,
};
