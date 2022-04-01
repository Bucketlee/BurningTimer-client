import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";

import AddList from "../AddList";
import OptionPopup from "../OptionPopover";

export default function CategoriesView({
  contents,
  selectedContent,
  onDragOver,
  onDragStart,
  onDragEnter,
  onDragEnd,
  onClickContent,
  confirmEditOptionPopup,
  confirmDeleteOptionPopup,
  onChangeAddList,
  onPressEnterAddList,
  onPressEscapeAddList,
  AddListValue,
}) {
  return (
    <CategoriesViewWrapper>
      <TitleWrapper>Categories</TitleWrapper>
      <UlWrapper>
        {contents.map(
          name => (
            <LiWrapper
              key={`category-${name}`}
              draggable
              onDragOver={(e) => onDragOver(e)}
              onDragStart={(e) => onDragStart(e)}
              onDragEnter={(e) => onDragEnter(e)}
              onDragEnd={(e) => onDragEnd(e)}
            >
              <ButtonWrapper selected={selectedContent === name ? true : false} onClick={() => onClickContent(name)}>{name}</ButtonWrapper>
              <OptionPopup
                confirmEdit={(value) => confirmEditOptionPopup(name, value)}
                confirmDelete={() => confirmDeleteOptionPopup(name)}
              />
            </LiWrapper>
          )
        )}
      </UlWrapper>
      <AddList
        placeholder={"새로운 카테고리"}
        onChange={(e) => onChangeAddList(e.target.value)}
        onPressEnter={() => onPressEnterAddList(AddListValue)}
        onPressEscape={() => onPressEscapeAddList("")}
        value={AddListValue}
      />
    </CategoriesViewWrapper>
  );
}

const CategoriesViewWrapper = styled.div`
  background-color: #F2F2F2;
  max-height: 100vh;
`

const TitleWrapper = styled.div`
  padding-left: 15px;
  font-size: 13px;
  font-weight: 600;
  color: #2D30364d;
`

const UlWrapper = styled.ul`
  margin: 0;
  padding: 10px 0 0 0;
  list-style: none;
`

const LiWrapper = styled.li`
  padding-left: 15px;
  display: grid;
  grid-template-columns: auto 35px;

  &:hover {
    background-color: #E2E2E2;
  }
`

const ButtonWrapper = styled.button`
  padding: 0;
  background: none;
  border: none;
  max-width: 175px;
  line-height: 40px;
  color: ${props => props.selected ? "#27251F" : "#797978"};
  font-weight: ${props => props.selected ? "600" : "400" };
  text-align: left;
  font-size: 15px;
  word-break: break-all;

  &:hover {
    color: #27251F;
    font-weight: 600;
  }
`

CategoriesView.propTypes = {
  contents: PropTypes.array,
  onDragOver: PropTypes.func,
  onDragStart: PropTypes.func,
  onDragEnter: PropTypes.func,
  onDragEnd: PropTypes.func,
  onClickContent: PropTypes.func,
  confirmEditOptionPopup: PropTypes.func,
  confirmDeleteOptionPopup: PropTypes.func,
  onChangeAddList: PropTypes.func,
  onPressEnterAddList: PropTypes.func,
  onPressEscapeAddList: PropTypes.func,
  AddListValue: PropTypes.string,
};
