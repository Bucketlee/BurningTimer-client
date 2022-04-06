import React, { useCallback, useEffect, useState } from "react";

import Api from "../../api";
import Category from "../../models/category";
import CategoriesView from "./CategoriesView";
import { openNotification } from "../antdCustom";

export default function Categories({ onSelect }) {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(undefined);
  const [grab, setGrab] = useState(undefined);
  const [newCategory, setNewCategory] = useState("");

  const getCategories = useCallback(async () => {
    try {
      const data = await Api.category.getAllCategories();
      const ActivedCateogries = Category.getActiveCategories(data);
      const sortedCategories = Category.sortCategoriesByPriority(ActivedCateogries);

      if (sortedCategories) {
        setCategories(sortedCategories);
      }
    } catch (err) {
      if (err.response && err.response.status === 401) {
        localStorage.setItem("token", "");
        openNotification("top", "로그인 정보가 올바르지 않습니다.", "다시 로그인 해주세요. 해당 문제가 반복될 경우 고객센터로 문의해 주세요.");
      } else if (err.response && err.response.status === 500) {
        openNotification("top", "서버에 오류가 있습니다.", "잠시 후 다시 시도해 주세요. 해당 문제가 반복될 경우 고객센터로 문의해 주세요.");
      } else {
        openNotification("top", "서버에 연결되지 않습니다.", "잠시 후 다시 시도해 주세요. 해당 문제가 반복될 경우 고객센터로 문의해 주세요.");
      }
    }
  }, []);

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  function handleDragOver(e) {
    e.preventDefault();
  }

  function handleDragStart(e) {
    setGrab(e.target);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/html", e.target);
  }

  function handleDragEnter(e) {
    const grabPosition = getCategoryPosition(grab.innerText);
    const targetPosition = getCategoryPosition(e.target.innerText);

    if (targetPosition !== undefined) {
      const newCategories = [ ...categories ];
      newCategories[grabPosition] = newCategories.splice(targetPosition, 1, newCategories[grabPosition])[0];
      setCategories(newCategories);
    }
  }

  async function handleDragEnd(e) {
    try {
      e.dataTransfer.dropEffect = "move";

      const grabPosition = getCategoryPosition(grab.innerText);
      const targetPosition = getCategoryPosition(e.target.innerText);

      if (targetPosition !== undefined && targetPosition !== grabPosition) {
        const grabbing = categories[grabPosition];
        await Api.category.updateCategory(grabbing, grabbing.name, targetPosition + 1);
        getCategories();
        setGrab(null);
      }
    } catch (err) {
      if (err.response && err.response.status === 400) {
        openNotification("top", "카테고리 업데이트에 실패했습니다.", "새로고침 후 다시 시도해 주세요. 해당 문제가 반복될 경우 고객센터로 문의해 주세요.");
      } else if (err.response && err.response.status === 401) {
        localStorage.setItem("token", "");
        openNotification("top", "로그인 정보가 올바르지 않습니다.", "다시 로그인 해주세요. 해당 문제가 반복될 경우 고객센터로 문의해 주세요.");
      } else if (err.response && err.response.status === 500) {
        openNotification("top", "서버에 오류가 있습니다.", "잠시 후 다시 시도해 주세요. 해당 문제가 반복될 경우 고객센터로 문의해 주세요.");
      } else {
        openNotification("top", "서버에 연결되지 않습니다.", "잠시 후 다시 시도해 주세요. 해당 문제가 반복될 경우 고객센터로 문의해 주세요.");
      }
    }
  }

  function getCategoryPosition(name) {
    for (let i = 0; i < categories.length; i += 1 ) {
      if (categories[i].name === name) {
        return i;
      }
    }
  }

  async function addNewCategory(name) {
    try {
      if (name !== "") {
        const isIncludesInCategories = Category.findCategoryWithTargetName(categories, name);
        if (!isIncludesInCategories) {
          const targetCategory = Category.fromJson({ name: name, priority: categories.length + 1 });
          setCategories([...categories, targetCategory]);
          await Api.category.createNewCategory(targetCategory.name, targetCategory.priority);
        }
        getCategories();
        setNewCategory("");
      } else {
        openNotification("top", "이미 카테고리가 존재합니다.");
      }
    } catch (err) {
      if (err.response && err.response.status === 400) {
        openNotification("top", "카테고리 생성에 실패했습니다.", "카테고리 정보가 올바르지 않습니다.");
      } else if (err.response && err.response.status === 401) {
        localStorage.setItem("token", "");
        openNotification("top", "로그인 정보가 올바르지 않습니다.", "다시 로그인 해주세요. 해당 문제가 반복될 경우 고객센터로 문의해 주세요.");
      } else if (err.response && err.response.status === 500) {
        openNotification("top", "서버에 오류가 있습니다.", "잠시 후 다시 시도해 주세요. 해당 문제가 반복될 경우 고객센터로 문의해 주세요.");
      } else {
        openNotification("top", "서버에 연결되지 않습니다.", "잠시 후 다시 시도해 주세요. 해당 문제가 반복될 경우 고객센터로 문의해 주세요.");
      }
    }
  }

  function onSelectCategory(name) {
    for (let i = 0; i < categories.length; i += 1) {
      if (categories[i].name === name) {
        setSelectedCategory(categories[i]);
        onSelect(categories[i]);
        return;
      }
    }
  }

  async function editTargetCategory(oldName, newName) {
    let targetCategory;
    for (let i = 0; i < categories.length; i += 1) {
      if (categories[i].name === oldName) {
        targetCategory = categories[i];
      }
    }
    try {
      await Api.category.updateCategory(targetCategory, newName, targetCategory.priority);
      getCategories();
    } catch (err) {
      if (err.response && err.response.status === 400) {
        openNotification("top", "카테고리 업데이트에 실패했습니다.", "새로고침 후 다시 시도해 주세요. 해당 문제가 반복될 경우 고객센터로 문의해 주세요.");
      } else if (err.response && err.response.status === 401) {
        localStorage.setItem("token", "");
        openNotification("top", "로그인 정보가 올바르지 않습니다.", "다시 로그인 해주세요. 해당 문제가 반복될 경우 고객센터로 문의해 주세요.");
      } else if (err.response && err.response.status === 500) {
        openNotification("top", "서버에 오류가 있습니다.", "잠시 후 다시 시도해 주세요. 해당 문제가 반복될 경우 고객센터로 문의해 주세요.");
      } else {
        openNotification("top", "서버에 연결되지 않습니다.", "잠시 후 다시 시도해 주세요. 해당 문제가 반복될 경우 고객센터로 문의해 주세요.");
      }
    }
  }

  async function deleteTargetCategory(name) {
    const newCategories = [];
    let targetCategory;

    for (let i = 0; i < categories.length; i += 1) {
      if (categories[i].name !== name) {
        newCategories.push(categories[i]);
      } else {
        targetCategory = categories[i];
      }
    }

    setCategories(newCategories);
    try {
      await Api.category.deleteCategory(targetCategory);
    } catch (err) {
      if (err.response && err.response.status === 400) {
        openNotification("top", "카테고리 삭제에 실패했습니다.", "새로고침 후 다시 시도해 주세요. 해당 문제가 반복될 경우 고객센터로 문의해 주세요.");
      } else if (err.response && err.response.status === 401) {
        localStorage.setItem("token", "");
        openNotification("top", "로그인 정보가 올바르지 않습니다.", "다시 로그인 해주세요. 해당 문제가 반복될 경우 고객센터로 문의해 주세요.");
      } else if (err.response && err.response.status === 500) {
        openNotification("top", "서버에 오류가 있습니다.", "잠시 후 다시 시도해 주세요. 해당 문제가 반복될 경우 고객센터로 문의해 주세요.");
      } else {
        openNotification("top", "서버에 연결되지 않습니다.", "잠시 후 다시 시도해 주세요. 해당 문제가 반복될 경우 고객센터로 문의해 주세요.");
      }
    }
  }

  return (
    <CategoriesView
      contents={categories.map(category => category.name)}
      selectedContent={selectedCategory ? selectedCategory.name : undefined}
      onDragOver={handleDragOver}
      onDragStart={handleDragStart}
      onDragEnter={handleDragEnter}
      onDragEnd={handleDragEnd}
      onClickContent={onSelectCategory}
      confirmEditOptionPopup={editTargetCategory}
      confirmDeleteOptionPopup={deleteTargetCategory}
      onChangeAddList={setNewCategory}
      onPressEnterAddList={addNewCategory}
      onPressEscapeAddList={() => setNewCategory("")}
      AddListValue={newCategory}
    />
  );
}
