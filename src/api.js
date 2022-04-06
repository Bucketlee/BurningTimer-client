import { instance } from "./ApiController";
import Category from "./models/category";
import Label from "./models/label";
import Task from "./models/task";

export default class Api {

  static auth = {
    async signUp(username, password, email) {
      try {
        const form = {
          username,
          password,
          email,
        }
        const { data } = await instance.post("/users/signup", form);
        return data;
      } catch (err) {
        throw err;
      }
    },

    async login(username, password) {
      try {
        const form = {
          username,
          password,
        }
        const { data } = await instance.post("/users/login", form);
        const accessToken = data.accessToken;
        localStorage.setItem("token", accessToken);
      } catch (err) {
        throw err;
      }
    },

    async findId(email) {
      try {
        const form = {
          email,
        }
        const { data } = await instance.post("/users/help/id", form);
        return data;
      } catch (err) {
        throw err;
      }
    },
  }

  static category = {
    async createNewCategory(name, priority) {
      try {
        const form = {
          name,
          priority,
        }
        const { data } = await instance.post("/categories", form);
        return data;
      } catch (err) {
        throw err;
      }
    },

    async getAllCategories() {
      try {
        const { data } = await instance.get("/categories");
        return data.data.map(Category.fromJson);
      } catch (err) {
        throw err;
      }
    },

    async updateCategory(category, newName, priority) {
      try {
        const form = {
          name: newName,
          priority,
        };
        const { data } = await instance.put("/categories/" + category._id, form);
        return data;
      } catch (err) {
        throw err;
      }
    },

    async deleteCategory(category) {
      try {
        const { data } = await instance.delete("/categories/" + category._id);
        return data;
      } catch (err) {
        throw err;
      }
    },
  }

  static label = {
    async createNewLabel(categoryId, name, priority) {
      try {
        const form = {
          categoryId,
          name,
          priority,
        }
        const { data } = await instance.post("/labels", form);
        return data;
      } catch (err) {
        throw err;
      }
    },

    async getAllLabels() {
      try {
        const { data } = await instance.get("/labels");
        return data.data.map(Label.fromJson);
      } catch (err) {
        throw err;
      }
    },

    async updateLabel(label, newName, priority) {
      try {
        const form = {
          name: newName,
          priority,
        };
        const { data } = await instance.put("/labels/" + label._id, form);
        return data;
      } catch (err) {
        throw err;
      }
    },

    async deleteLabel(label) {
      try {
        const { data } = await instance.delete("/labels/" + label._id);
        return data;
      } catch (err) {
        throw err;
      }
    },
  }

  static task = {
    async createNewTask(newTask) {
      try {
        const form = {
          categoryId: newTask.categoryId,
          labelId: newTask.labelId,
          startTimestamp: newTask.startTimestamp,
          endTimestamp: newTask.endTimestamp,
          pauseAndRestarts: newTask.pauseAndRestarts,
          goalTime: newTask.goalTime,
          playTime: newTask.playTime,
          memo: newTask.memo,
          distraction: newTask.distraction,
        };
        const { data } = await instance.post("/tasks", form);
        return data;
      } catch (err) {
        throw err;
      }
    },

    async getTasks() {
      try {
        const { data } = await instance.get("/tasks");
        return data.data.map(Task.fromJson);
      } catch (err) {
        throw err;
      }
    },

    async updateTask(taskId, memo, distraction) {
      try {
        const form = {
          memo,
          distraction,
        };
        const { data } = await instance.put("/tasks/" + taskId, form);
        return data;
      } catch (err) {
        throw err;
      }
    },
  }

  static feedback = {
    async createNewFeedback(newFeedback) {
      try {
        const form = {
          email: newFeedback.email,
          name: newFeedback.name,
          content: newFeedback.content,
        };
        const { data } = await instance.post("/feedback", form);
        return data;
      } catch (err) {
        throw err;
      }
    },
  }
}
