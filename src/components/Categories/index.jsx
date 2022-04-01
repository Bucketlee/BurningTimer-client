import React, { useCallback, useEffect, useState } from "react";

import Api from "../../api";
import Category from "../../models/category";
import CategoriesView from "./CategoriesView";

export default function Categories({ onSelect }) {
  const [categories, setCategories] = useState([]);
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
    } catch(err) {
      // 오류 컨트롤 필요
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

    if (targetPosition !== -1) {
      const newCategories = [ ...categories ];
      newCategories[grabPosition] = newCategories.splice(targetPosition, 1, newCategories[grabPosition])[0];
      setCategories(newCategories);
    }
  }

  async function handleDragEnd(e) {
    e.dataTransfer.dropEffect = "move";

    const grabPosition = getCategoryPosition(grab.innerText);
    const targetPosition = getCategoryPosition(e.target.innerText);

    if (targetPosition !== -1) {
      const grabbing = categories[grabPosition];
      await Api.category.updateCategory(grabbing, grabbing.name, targetPosition + 1);
      // 오류 컨트롤 필요
      getCategories();
      setGrab(null);
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
    if (name !== "") {
      const isIncludesInCategories = Category.findCategoryWithTargetName(categories, name);
      if (!isIncludesInCategories) {
        const targetCategory = Category.fromJson({ name: name, priority: categories.length + 1 });
        setCategories([...categories, targetCategory]);
        await Api.category.createNewCategory(targetCategory.name, targetCategory.priority);
        // 오류 컨트롤 필요
      }
      getCategories();
      setNewCategory("");
    } else {
      alert("이미 카테고리 있음");
    }
  }

  function onSelectCategory(name) {
    for (let i = 0; i < categories.length; i += 1) {
      if (categories[i].name === name) {
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
      // 오류 컨트롤 필요
      getCategories();
    } catch (err) {
      alert("문제가 있음");
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
    await Api.category.deleteCategory(targetCategory);
    // 오류 컨트롤 필요
  }

  return (
    <CategoriesView
      contents={categories.map(category => category.name)}
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
