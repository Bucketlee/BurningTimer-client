import React, { useState } from 'react';

import LabelsView from '../components/Labels/LabelsView';

export default {
  title: 'Label/Display',
  component: LabelsView,
};

export const LabelsViewSampleWrapper = () => {
  const [labels, setLabels] = useState(["API / Schema 작성", "클라이언트 코드 작성", "서버 코드 작성", "DB 구축"]);
  const [grab, setGrab] = useState();
  const [newLabel, setNewLabel] = useState("");

  return (
    <LabelsView
      title="BurningTimer 업데이트"
      contents={labels}
      onChangeAddList={
        (value) => {
          console.log("onChangeAddList 실행 : 추가 할 라벨 이름 변경", value)
          setNewLabel(value);
        }
      }
      onPressEnterAddList={
        (name) => {
          console.log("onPressEnterAddList 실행됨 : 새로운 라벨 추가", name);
          setLabels([...labels, name]);
          setNewLabel("");
        }
      }
      onPressEscapeAddList={
        () => {
          console.log("onPressEscapeAddList 실행 : addNewLabel value를 \"\"로 변경");
          setNewLabel("");
        }
      }
      AddListValue={newLabel}
      onDragOver={
        (e) => {
          console.log("onDragOver 실행");
          e.preventDefault();
        }
      }
      onDragStart={
        (e) => {
          console.log("onDragStart 실행");
          setGrab(e.target);
          e.dataTransfer.effectAllowed = "move";
          e.dataTransfer.setData("text/html", e.target);
        }
      }
      onDragEnter={
        (e) => {
          console.log("onDragEnter 실행");
          const grabPosition = labels.indexOf(grab.innerText);
          const targetPosition = labels.indexOf(e.target.innerText);

          if (targetPosition !== -1) {
            const newLabels = labels.slice();
            newLabels[grabPosition] = newLabels.splice(targetPosition, 1, newLabels[grabPosition])[0];
            setLabels(newLabels);
          }
        }
      }
      onDragEnd={
        (e) => {
          console.log("onDragEnd 실행");
          e.dataTransfer.dropEffect = "move";
          setGrab(null);
        }
      }
      onClickContent={
        () => console.log("onClickContent 실행")
      }
      confirmEditOptionPopup={
        (oldName, newName) => {
          console.log("confirmEdit 실행");
          const newLabels = labels.slice();
          for (let i = 0; i < newLabels.length; i += 1) {
            if (newLabels[i] === oldName) {
              newLabels[i] = newName;
            }
          }
          setLabels(newLabels);
        }
      }
      confirmDeleteOptionPopup={
        (name) => {
          console.log("confirmDelete 실행");
          const newLabels = [];
          for (let i = 0; i < labels.length; i += 1) {
            if (labels[i] !== name) {
              newLabels.push(labels[i]);
            }
          }
          setLabels(newLabels);
        }
      }
    />);
}
