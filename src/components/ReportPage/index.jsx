import React, { useEffect, useCallback, useState } from "react";

import Api from "../../api";
import Task from "../../models/task";
import ReportPageView from "./ReportPageView";

const standardDate = new Date();
const year = standardDate.getFullYear();
const month = standardDate.getMonth() + 1;
const day = standardDate.getDate();
const currentDate = `${year}-${month}-${day}`

export default function ReportPage() {
  const [selectedDate, setSelectedDate] = useState([currentDate, currentDate]);
  const [tasks, setTasks] = useState([]);

  function getPeriodDays(startDate, endDate) {
    const result = (Date.parse(endDate) - Date.parse(startDate))/(1000*60*60*24) + 1;
    return result;
  }

  const getAverageRunCountPerDay = useCallback((tasks) => {
    if (tasks.length === 0) {
      return "0회";
    }
    const selectedDaysCount = getPeriodDays(selectedDate[0], selectedDate[1]);
    const runCount = (tasks.length/selectedDaysCount).toFixed(1);
    return runCount + "회";
  }, [selectedDate]);

  const getAverageBurningTimePerDay = useCallback((tasks) => {
    if (tasks.length === 0) {
      return "00:00:00";
    }
    const totalMilliseconds = Task.getTotalMsOfTasks(tasks);
    const selectedDaysCount = getPeriodDays(selectedDate[0], selectedDate[1]);
    return Task.msToTime((totalMilliseconds/selectedDaysCount).toFixed(0));
  }, [selectedDate]);

  const getAverageBurningTimePerRun = useCallback((tasks) => {
    if (tasks.length === 0) {
      return "00:00:00";
    }
    const totalMilliseconds = Task.getTotalMsOfTasks(tasks);
    return Task.msToTime((totalMilliseconds/tasks.length).toFixed(0));
  }, []);

  const getRunDaysWithinDatePeriod = useCallback((tasks) => {
    if (tasks.length === 0) {
      return "0일 / 0일";
    }
    const playDaysCount = Task.getNumOfBurningDays(tasks);
    const selectedDaysCount = getPeriodDays(selectedDate[0], selectedDate[1]);
    return playDaysCount + "일 / " + selectedDaysCount + "일";
  }, [selectedDate]);

  const makeReportLabels = useCallback(() => {
    const selectedTasks = Task.getTasksTimePeriod(tasks, selectedDate[0], selectedDate[1]);
    const result = [
      {
        title: "하루 평균 집중한 시간",
        value: getAverageBurningTimePerDay(selectedTasks),
        imageName: "run-time",
      },
      {
        title: "하루 평균 집중한 횟수",
        value: getAverageRunCountPerDay(selectedTasks),
        imageName: "average-count",
      },
      {
        title: "집중 당 평균 시간",
        value: getAverageBurningTimePerRun(selectedTasks),
        imageName: "average-time",
      },
      {
        title: "기간 내 진행 일 수",
        value: getRunDaysWithinDatePeriod(selectedTasks),
        imageName: "run-days",
      },
    ];
    return result;
  }, [selectedDate, tasks, getAverageBurningTimePerDay, getAverageBurningTimePerRun, getAverageRunCountPerDay, getRunDaysWithinDatePeriod]);

  useEffect(() => {
    async function getTasks() {
      const data = await Api.task.getTasks();
      setTasks(data);
    }
    getTasks();
  }, []);

  return (
    <ReportPageView
      onSelectDate={(date) => setSelectedDate(date)}
      labels={makeReportLabels()}
      data={tasks}
      selectedDate={selectedDate}
    />
  )
}
