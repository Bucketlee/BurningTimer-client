import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";

import AddList from "./AddList";
import OptionPopup from "./OptionPopup";

export default function Labels({ category, labels, createNewLabel, onClickLabel }) {
  const [list, setList] = useState(labels);
  const [grab, setGrab] = useState(null);
  const [newLabel, setNewLabel] = useState("");

  function onDragOver(e) {
    e.preventDefault();
  }

  function onDragStart(e) {
    setGrab(e.target);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/html", e.target);
  }

  function onDragEnter(e) {
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

  function addNewLabel() {
    if (newLabel !== "") {
      console.log(list, list.includes(newLabel));
      if (!list.includes(newLabel)) {
        createNewLabel(newLabel);
        setList([...list, newLabel]);
        setNewLabel("");
      } else {
        alert("이미 라벨이 있음")
      }
    }
  }

  function editTargetLabel(el, newValue) {
    const result = list.map(category => el === category ? newValue : category);
    setList(result);
  }

  function deleteTargetLabel(el) {
    const index = list.indexOf(el);

    const newList = list.slice();
    newList.splice(index, 1);

    setList(newList);
  }

  return (
    <div>
      <TitleWrapper>{category}</TitleWrapper>
      <AddListWrapper>
        <AddList
          placeholder={"새로운 라벨"}
          onChange={(e) => setNewLabel(e.target.value)}
          onPressEnter={() => addNewLabel()}
          onPressEscape={() => setNewLabel("")}
          value={newLabel}
        />
      </AddListWrapper>
      <UlWrapper>
        {list.map(
          el => (
            <LiWrapper
              key={`label-${el}`}
              draggable
              onDragOver={(e) => onDragOver(e)}
              onDragStart={(e) => onDragStart(e)}
              onDragEnter={(e) => onDragEnter(e)}
              onDragEnd={(e) => onDragEnd(e)}
            >
              <ButtonWrapper onClick={() => onClickLabel(el)}>{el}</ButtonWrapper>
              <OptionPopup
                confirmEdit={(value) => editTargetLabel(el, value)}
                confirmDelete={() => deleteTargetLabel(el)}
              />
            </LiWrapper>
          )
        )}
      </UlWrapper>
    </div>
  )
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

Labels.propTypes = {
  category: PropTypes.string,
  labels: PropTypes.array,
  createNewLabel: PropTypes.func,
  onClickLabel: PropTypes.func,
};
