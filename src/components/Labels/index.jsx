import React, { useCallback, useEffect, useState } from "react";

import Api from "../../api";
import LabelsView from "./LabelsView";
import Label from "../../models/label";


export default function Labels({ category }) {
  const [labels, setLabels] = useState([]);
  const [grab, setGrab] = useState(null);
  const [newLabel, setNewLabel] = useState("");

  const getLabels = useCallback(async () => {
    try {
      const data = await Api.label.getAllLabels();
      const sortedLabels = Label.sortActivedLabelsByPriority(data);
      setLabels(sortedLabels);
    } catch(err) {
      // 오류 컨트롤 필요
    }
  }, []);

  useEffect(() => {
    getLabels();
  }, [getLabels]);

  function onDragOver(e) {
    e.preventDefault();
  }

  function onDragStart(e) {
    setGrab(e.target);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/html", e.target);
  }

  function onDragEnter(e) {
    const grabPosition = getLabelPosition(grab.innerText);
    const targetPosition = getLabelPosition(e.target.innerText);

    if (targetPosition !== -1) {
      const newLabels = [...labels];
      newLabels[grabPosition] = newLabels.splice(targetPosition, 1, newLabels[grabPosition])[0];
      setLabels(newLabels);
    }
  }

  async function onDragEnd(e) {
    e.dataTransfer.dropEffect = "move";

    const grabPosition = getLabelPosition(grab.innerText);
    const targetPosition = getLabelPosition(e.target.innerText);

    if (targetPosition !== -1) {
      const grabbing = labels[grabPosition];
      await Api.label.updateLabel(grabbing, grabbing.name, targetPosition + 1);
      // 오류 컨트롤 필요
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

  async function addNewLabel(name) {
    if (name !== "") {
      const isIncludesInLabels = Label.findLabelWithTargetName(labels, name);

      if (!isIncludesInLabels) {
        const targetLabel = Label.fromJson({ name: name, priority: labels.length + 1 })
        setLabels([...labels, targetLabel]);
        await Api.label.createNewLabel(category._id, targetLabel.name, targetLabel.priority);
        // 오류 컨트롤 필요
        getLabels();
        setNewLabel("");
      } else {
        alert("이미 라벨이 있음");
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
      // 오류 컨트롤 필요
      getLabels();
    } catch (err) {
      alert("문제가 있음");
    }

  }

  async function deleteTargetLabel(target) {
    const newLabels = [];
    let targetLabel;

    for (let i = 0; i < labels.length; i += 1) {
      if (labels[i].name !== target) {
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
      onDragOver={onDragOver}
      onDragStart={onDragStart}
      onDragEnter={onDragEnter}
      onDragEnd={onDragEnd}
      onClickContent={onSelectLabel}
      confirmEdit={editTargetLabel}
      confirmDelete={deleteTargetLabel}
    />
  )
}
