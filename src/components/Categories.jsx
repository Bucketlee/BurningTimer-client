import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";

import AddList from "./AddList";

export default function Categories({ categories, onSelect, createNewCategory }) {
  const [list, setList] = useState(categories);
  const [grab, setGrab] = useState(null);
  const [newCategory, setNewCategory] = useState("");

  function onDragOver(e) {
    e.preventDefault();
  }

  function onDragStart(e) {
    setGrab(e.target);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/html", e.target);
  }

  function onDragEnter(e) {
    console.log(grab.innerText, e.target.innerText);
    const grabPosition = list.indexOf(grab.innerText);
    const targetPosition = list.indexOf(e.target.innerText);

    if (targetPosition !== -1) {
      const newList = [ ...list ];
      newList[grabPosition] = newList.splice(targetPosition, 1, newList[grabPosition])[0];

      setList(newList);
    }
  }

  function onDragEnd(e) {
    e.dataTransfer.dropEffect = "move";
  }

  function addNewCategory() {
    if (newCategory !== "") {
      createNewCategory(newCategory);
      setList([...list, newCategory]);
      setNewCategory("");
    }
  }

  return (
    <CategoriesWrapper>
      <TitleWrapper>Categories</TitleWrapper>
      <UlWrapper>
        {list.map(
          el => (
            <LiWrapper
              key={`category-${el}`}
              draggable
              onDragOver={(e) => onDragOver(e)}
              onDragStart={(e) => onDragStart(e)}
              onDragEnter={(e) => onDragEnter(e)}
              onDragEnd={(e) => onDragEnd(e)}
            >
              <ButtonWrapper onClick={(e) => onSelect(e)}>{el}</ButtonWrapper>
            </LiWrapper>
          )
        )}
      </UlWrapper>
      <AddList
        placeholder={"새로운 카테고리"}
        onChange={(e) => setNewCategory(e.target.value)}
        onPressEnter={() => addNewCategory()}
        onPressEscape={() => setNewCategory("")}
        value={newCategory}
      />
    </CategoriesWrapper>
  )
}

const CategoriesWrapper = styled.div`
  padding: 20px 0;
  background-color: #F2F2F2;
`

const TitleWrapper = styled.div`
  padding-left: 15px;
  font-size: 13px;
  font-weight: 600;
  color: #2d30364d;
`

const UlWrapper = styled.ul`
  margin: 0;
  padding: 10px 0 0 0;
  list-style: none;
`

const LiWrapper = styled.li`
  padding: 0 15px;
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
  line-height: 35px;
  color: #797978;
  text-align: left;
  font-size: 15px;

  &:hover {
    color: #27251F;
    font-weight: 600;
  }
`

Categories.propTypes = {
  categories: PropTypes.array,
  onSelect: PropTypes.func,
  createNewCategory: PropTypes.func,
};
