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
      if (err.response && err.response.status === 500) {
        openNotification("top", "서버에 오류가 있습니다.", "잠시 후 다시 시도해 주세요. 해당 문제가 반복될 경우 고객센터로 문의해 주세요.");
      } else {
        openNotification("top", "서버에 연결되지 않습니다.", "잠시 후 다시 시도해 주세요. 해당 문제가 반복될 경우 고객센터로 문의해 주세요.");
      }
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

    if (targetPosition !== undefined) {
      const newLabels = [...labels];
      newLabels[grabPosition] = newLabels.splice(targetPosition, 1, newLabels[grabPosition])[0];
      setLabels(newLabels);
    }
  }

  async function handleDragEnd(e) {
    try {
      e.dataTransfer.dropEffect = "move";

      const grabPosition = getLabelPosition(grab.innerText);
      const targetPosition = getLabelPosition(e.target.innerText);

      if (targetPosition !== undefined && targetPosition !== grabPosition) {
        const grabbing = labels[grabPosition];
        await Api.label.updateLabel(grabbing, grabbing.name, targetPosition + 1);
        getLabels(category._id);
        setGrab(null);
      }
    } catch (err) {
      if (err.response && err.response.status === 400) {
        openNotification("top", "라벨 업데이트에 실패했습니다.", "새로고침 후 다시 시도해 주세요. 해당 문제가 반복될 경우 고객센터로 문의해 주세요.");
      } else if (err.response && err.response.status === 500) {
        openNotification("top", "서버에 오류가 있습니다.", "잠시 후 다시 시도해 주세요. 해당 문제가 반복될 경우 고객센터로 문의해 주세요.");
      } else {
        openNotification("top", "서버에 연결되지 않습니다.", "잠시 후 다시 시도해 주세요. 해당 문제가 반복될 경우 고객센터로 문의해 주세요.");
      }
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
    try {
      if (name !== "") {
        const isIncludesInLabels = Label.findLabelWithTargetName(labels, name);

        if (!isIncludesInLabels) {
          const targetLabel = Label.fromJson({ name: name, priority: labels.length + 1 });
          setLabels([...labels, targetLabel]);
          await Api.label.createNewLabel(category._id, targetLabel.name, targetLabel.priority);
          getLabels(category._id);
          setNewLabel("");
        } else {
          openNotification("top", "이미 라벨이 있습니다.");
        }
      }
    } catch (err) {
      if (err.response && err.response.status === 400) {
        openNotification("top", "라벨 생성에 실패했습니다.", "라벨 정보가 올바르지 않습니다.");
      } else if (err.response && err.response.status === 500) {
        openNotification("top", "서버에 오류가 있습니다.", "잠시 후 다시 시도해 주세요. 해당 문제가 반복될 경우 고객센터로 문의해 주세요.");
      } else {
        openNotification("top", "서버에 연결되지 않습니다.", "잠시 후 다시 시도해 주세요. 해당 문제가 반복될 경우 고객센터로 문의해 주세요.");
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
      if (err.response && err.response.status === 400) {
        openNotification("top", "라벨 업데이트에 실패했습니다.", "새로고침 후 다시 시도해 주세요. 해당 문제가 반복될 경우 고객센터로 문의해 주세요.");
      } else if (err.response && err.response.status === 500) {
        openNotification("top", "서버에 오류가 있습니다.", "잠시 후 다시 시도해 주세요. 해당 문제가 반복될 경우 고객센터로 문의해 주세요.");
      } else {
        openNotification("top", "서버에 연결되지 않습니다.", "잠시 후 다시 시도해 주세요. 해당 문제가 반복될 경우 고객센터로 문의해 주세요.");
      }
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

    try {
      setLabels(newLabels);
      await Api.label.deleteLabel(targetLabel);
    } catch (err) {
      if (err.response && err.response.status === 400) {
        openNotification("top", "라벨 삭제에 실패했습니다.", "새로고침 후 다시 시도해 주세요. 해당 문제가 반복될 경우 고객센터로 문의해 주세요.");
      } else if (err.response && err.response.status === 500) {
        openNotification("top", "서버에 오류가 있습니다.", "잠시 후 다시 시도해 주세요. 해당 문제가 반복될 경우 고객센터로 문의해 주세요.");
      } else {
        openNotification("top", "서버에 연결되지 않습니다.", "잠시 후 다시 시도해 주세요. 해당 문제가 반복될 경우 고객센터로 문의해 주세요.");
      }
    }
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
