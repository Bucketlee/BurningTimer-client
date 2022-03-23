class Task {
  constructor(_id, userId, categoryId, labelId, startTimestamp, endTimestamp, pauseAndRestarts, goalTime, playTime, memo, distraction, createdAt, updatedAt) {
    this._id = _id;
    this.categoryId = categoryId;
    this.userId = userId;
    this.labelId = labelId;
    this.startTimestamp = startTimestamp;
    this.endTimestamp = endTimestamp;
    this.pauseAndRestarts = !pauseAndRestarts ? [] : pauseAndRestarts;
    this.goalTime = goalTime;
    this.playTime = playTime;
    this.memo = memo;
    this.distraction = distraction;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static fromJson(json) {
    return new Task(
      json._id,
      json.userId,
      json.categoryId,
      json.labelId,
      json.startTimestamp,
      json.endTimestamp,
      json.pauseAndRestarts,
      json.goalTime,
      json.playTime,
      json.memo,
      json.distraction,
      json.createdAt,
      json.updatedAt,
    );
  }

  static getTasksTimePeriod(tasks, startDate, endDate) {
    const midnightStartDate = new Date(startDate + " 00:00:00");
    const beforeMidnightAfterEndDate = new Date(endDate + " 23:59:59");

    const tasksResult = [];

    tasks.forEach(task => {
      if (Date.parse(task.startTimestamp) >= midnightStartDate && Date.parse(task.startTimestamp) < beforeMidnightAfterEndDate) {
        tasksResult.push(task);
      }
    });

    return tasksResult;
  }

  static getTotalMsOfTasks(tasks) {
    const totalMilliseconds = tasks.reduce((pre, cur) => (pre) + (+cur.playTime), 0);
    return totalMilliseconds;
  }

  static getNumOfBurningDays(tasks) {
    let playDate = [];

    tasks.forEach(task => {
      const year = new Date(task.startTimestamp).getFullYear();
      const month = new Date(task.startTimestamp).getMonth();
      const day = new Date(task.startTimestamp).getDate();
      const checkDay = new Date(year, month, day, 0, 0, 0, 0);
      if (playDate.indexOf(checkDay.toString()) === -1) {
        playDate.push(checkDay.toString());
      }
    });

    return playDate.length;
  }

  static getTasksInLabelId(tasks, labelId) {
    const detachedTasks = [];
    tasks.forEach(task => {
      if (task.labelId === labelId) {
        detachedTasks.push(task);
      }
    });

    return detachedTasks;
  }

  static msToTime(s) {
    s = +s;

    function pad(n, z) {
      z = z || 2;
      return ('00' + n).slice(-z);
    }

    const ms = s % 1000;
    s = (s - ms) / 1000;
    const secs = s % 60;
    s = (s - secs) / 60;
    const mins = s % 60;
    const hrs = (s - mins) / 60;
    return pad(hrs) + ':' + pad(mins) + ':' + pad(secs);
  }

  static timeToMs(s) {
    const [hrs, mins, secs] = s.split(":");
    return (+secs)*1000 + (+mins)*1000*60 + (+hrs)*1000*60*60;
  }
};

export default Task;
