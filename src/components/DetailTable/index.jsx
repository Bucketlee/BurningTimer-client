import React, { useState, useEffect, useCallback } from "react";

import Api from "../../api";
import Task from "../../models/task";
import DetailTableView from "./DetailTableView";
import EditableTable from "../EditableTable";
import { openNotification } from "../antdCustom";
import Category from "../../models/category";
import Label from "../../models/label";


const getSortableColumn = (data, key) => {
  if (key === "weight") {
    return +data.replace("%","")
  } else if (key === "time") {
    return Task.timeToMs(data);
  } else if (key === "number") {
    return +data.replace("회", "");
  } else if (key === "average") {
    return Task.timeToMs(data);
  } else if (key === "runDays") {
    return +data.split("일 /")[0];
  } else {
    return data;
  }
}

export const reportColumns = [
  {
    title: "카테고리명",
    dataIndex: "category",
    key: "category",
    sorter: (a, b) => getSortableColumn(b.category, "category") < getSortableColumn(a.category, "category") ? 1 : -1,
  },
  {
    title: "라벨명",
    dataIndex: "label",
    key: "label",
    sorter: (a, b) => getSortableColumn(b.label, "label") < getSortableColumn(a.label, "label") ? 1 : -1,
  },
  {
    title: "비중",
    dataIndex: "weight",
    key: "weight",
    sorter: (a, b) => getSortableColumn(b.weight, "weight") < getSortableColumn(a.weight, "weight") ? 1 : -1,
    defaultSortOrder: "descend",
  },
  {
    title: "총 시간",
    dataIndex: "time",
    key: "time",
    sorter: (a, b) => getSortableColumn(b.time, "time") < getSortableColumn(a.time, "time") ? 1 : -1,
  },
  {
    title: "총 횟수",
    dataIndex: "number",
    key: "number",
    sorter: (a, b) => getSortableColumn(b.number, "number") < getSortableColumn(a.number, "number") ? 1 : -1,
  },
  {
    title: "회당 평균 시간",
    dataIndex: "average",
    key: "average",
    sorter: (a, b) => getSortableColumn(b.average, "average") < getSortableColumn(a.average, "average") ? 1 : -1,
  },
  {
    title: "진행 일 수",
    dataIndex: "runDays",
    key: "runDays",
    sorter: (a, b) => getSortableColumn(b.runDays, "runDays") < getSortableColumn(a.runDays, "runDays") ? 1 : -1,
  },
  {
    title: "세부사항",
    dataIndex: "showDetails",
    key: "showDetails",
  },
];


export default function DetailTable({ data, selectedDate }) {
  const [dataSource, setDataSource] = useState([]);

  function getPeriodDays(startDate, endDate) {
    const result = (Date.parse(endDate) - Date.parse(startDate))/(1000*60*60*24) + 1;
    return result;
  }

  function selectTasksWithinPeriodTime(tasks, startDate, endDate) {
    const result = Task.getTasksTimePeriod(tasks, startDate, endDate);
    return result;
  }

  async function selectCategoriesFromTask(tasks) {
    try {
      const selectedCategoriesId = Task.getCategoriesIdFromSelectedTask(tasks);
      const categories = await Api.category.getAllCategories();
      const selectedCategories = selectedCategoriesId.map(id => Category.getCategoryById(id, categories));
      return selectedCategories;
    } catch (err) {
      if (err.response && err.response.status === 500) {
        openNotification("top", "서버에 오류가 있습니다.", "잠시 후 다시 시도해 주세요. 해당 문제가 반복될 경우 고객센터로 문의해 주세요.");
      } else {
        openNotification("top", "서버에 연결되지 않습니다.", "잠시 후 다시 시도해 주세요. 해당 문제가 반복될 경우 고객센터로 문의해 주세요.");
      }
    }
  }


  async function selectLabelsFromTask(tasks) {
    try {
      const selectedLabelsId = Task.getLabelsIdFromSelectedTask(tasks);
      const labels = await Api.label.getAllLabels();
      const selectedLabels = selectedLabelsId.map(id => Label.getLabelById(id, labels));
      return selectedLabels;
    } catch (err) {
      if (err.response && err.response.status === 500) {
        openNotification("top", "서버에 오류가 있습니다.", "잠시 후 다시 시도해 주세요. 해당 문제가 반복될 경우 고객센터로 문의해 주세요.");
      } else {
        openNotification("top", "서버에 연결되지 않습니다.", "잠시 후 다시 시도해 주세요. 해당 문제가 반복될 경우 고객센터로 문의해 주세요.");
      }
    }
  }

  const makeTableData = useCallback(async () => {
    const result = {};
    const selectedTasks = selectTasksWithinPeriodTime(data, selectedDate[0], selectedDate[1]);

    const selectedCategories = await selectCategoriesFromTask(selectedTasks);

    selectedCategories.forEach(category => {
      result[category._id] = {
        category: category,
        labels: {},
      }
    });

    const selectedLabels = await selectLabelsFromTask(selectedTasks);

    selectedLabels.forEach(label => {
      result[label.categoryId]["labels"][label._id] = { label: label, tasks: [] };
    });

    selectedTasks.forEach(task => {
      result[task.categoryId]["labels"][task.labelId]["tasks"].push(task)
    });

    const temporaryDataSource = [];
    Object.entries(result).forEach(([id, obj]) => {
      const category = obj.category.name;

      Object.entries(obj.labels).forEach(([id, obj]) => {

        const label = obj.label.name;
        const weight = Math.floor(Task.getTotalMsOfTasks(obj.tasks)/Task.getTotalMsOfTasks(selectedTasks)*100);
        const time = Task.getTotalMsOfTasks(obj.tasks);
        const number = obj.tasks.length;
        const average = Task.getTotalMsOfTasks(obj.tasks)/number;
        const runDays = Task.getNumOfBurningDays(obj.tasks);
        const showDetails = <EditableTable data={obj.tasks} />;

        const newData = {
          key: id,
          category: category,
          label: label,
          weight: weight + "%",
          time: Task.msToTime(time),
          number: number + "회",
          average: Task.msToTime(average),
          runDays: runDays + "일 / " + getPeriodDays(selectedDate[0], selectedDate[1]) + "일",
          showDetails: showDetails,
        };

        temporaryDataSource.push(newData);
      });
    });

    setDataSource(temporaryDataSource);
  }, [data, selectedDate]);

  useEffect(() => {
    if (data) {
      makeTableData();
    } else {
      setDataSource([]);
    }

  }, [data, makeTableData]);

  return (
    <DetailTableView
      dataSource={dataSource}
      columns={reportColumns}
    />
  );
}
