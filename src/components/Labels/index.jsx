import React, { useCallback, useEffect, useState } from "react";

import Api from "../../api";
import LabelsView from "./LabelsView";
import Label from "../../models/label";
import { openNotification } from "../antdCustom";

export default function Labels({ category }) {
  const [labels, setLabels] = useState([]);
  const [grab, setGrab] = useState(undefined);
  const [newLabel, setNewLabel] = useState("");

  const getLabels = useCallback(async (categoryId) => {
    try {
      const data = await Api.label.getAllLabels();
      const labelsWithCategoryId = Label.getLabelsWithCategoryId(data, categoryId);
      const ActivedLabels = Label.getActiveLabels(labelsWithCategoryId);
      const sortedLabels = Label.sortLabelsByPriority(ActivedLabels);
      if (sortedLabels) {
        setLabels(sortedLabels);
      }
    } catch(err) {
      // 오류 컨트롤 필요
    }
  }, []);

  useEffect(() => {
    getLabels(category._id);
  }, [getLabels, category]);

  function handleDragOver(e) {
    e.preventDefault();
  }

  function handleDragStart(e) {
    setGrab(e.target);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/html", e.target);
  }

  function handleDragEnter(e) {
    const grabPosition = getLabelPosition(grab.innerText);
    const targetPosition = getLabelPosition(e.target.innerText);

    if (targetPosition !== -1) {
      const newLabels = [...labels];
      newLabels[grabPosition] = newLabels.splice(targetPosition, 1, newLabels[grabPosition])[0];
      setLabels(newLabels);
    }
  }

  async function handleDragEnd(e) { // handleDragEnd
    e.dataTransfer.dropEffect = "move";

    const grabPosition = getLabelPosition(grab.innerText);
    const targetPosition = getLabelPosition(e.target.innerText);

    if (targetPosition !== -1) {
      const grabbing = labels[grabPosition];
      await Api.label.updateLabel(grabbing, grabbing.name, targetPosition + 1);
      // 오류 컨트롤 필요
      getLabels(category._id);
      setGrab(null);
    }
  }

  function getLabelPosition(name) {
    for (let i = 0; i < labels.length; i += 1 ) {
      if (labels[i].name === name) {
        return i;
      }
    }
  }

  async function addNewLabel(name) { // 옵티미스틱 UI
    if (name !== "") {
      const isIncludesInLabels = Label.findLabelWithTargetName(labels, name);

      if (!isIncludesInLabels) {
        const targetLabel = Label.fromJson({ name: name, priority: labels.length + 1 });
        setLabels([...labels, targetLabel]);
        await Api.label.createNewLabel(category._id, targetLabel.name, targetLabel.priority);
        // 오류 컨트롤 필요
        getLabels(category._id);
        setNewLabel("");
      } else {
        openNotification("top", "이미 라벨이 있습니다.");
      }
    }
  }

  function onSelectLabel() {
    // 추후 클릭 시 해당 라벨의 timer 동작 페이지로 이동
  }

  async function editTargetLabel(oldName, newName) {
    let targetLabel;
    for (let i = 0; i < labels.length; i += 1) {
      if (labels[i].name === oldName) {
        targetLabel = labels[i];
      }
    }
    try {
      await Api.label.updateLabel(targetLabel, newName, targetLabel.priority);
      getLabels(category._id);
    } catch (err) {
      // 오류 컨트롤 필요
    }
  }

  async function deleteTargetLabel(name) {
    const newLabels = [];
    let targetLabel;

    for (let i = 0; i < labels.length; i += 1) {
      if (labels[i].name !== name) {
        newLabels.push(labels[i]);
      } else {
        targetLabel = labels[i];
      }
    }

    setLabels(newLabels);
    await Api.label.deleteLabel(targetLabel);
    // 오류 컨트롤 필요
  }

  return (
    <LabelsView
      title={category.name}
      contents={labels.map(label => label.name)}
      onChangeAddList={setNewLabel}
      onPressEnterAddList={addNewLabel}
      onPressEscapeAddList={() => setNewLabel("")}
      AddListValue={newLabel}
      onDragOver={handleDragOver}
      onDragStart={handleDragStart}
      onDragEnter={handleDragEnter}
      onDragEnd={handleDragEnd}
      onClickContent={onSelectLabel}
      confirmEditOptionPopup={editTargetLabel}
      confirmDeleteOptionPopup={deleteTargetLabel}
    />
  );
}
