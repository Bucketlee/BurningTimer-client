import React, { useState } from 'react';

import CategoriesView from '../components/Categories/CategoriesView';

export default {
  title: 'Menu/Categories',
  component: CategoriesView,
};

export const CategoriesViewSampleWrapper = () => {
  const [categories, setCategories] = useState(["BurningTimer 업데이트", "독서 / 홈트레이닝 진행", "Nowment 기획", "독서"]);
  const [grab, setGrab] = useState();
  const [newCategory, setNewCategory] = useState("");

  return (
    <CategoriesView
      contents={categories}
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
          const grabPosition = categories.indexOf(grab.innerText);
          const targetPosition = categories.indexOf(e.target.innerText);

          if (targetPosition !== -1) {
            const newCategories = categories.slice();
            newCategories[grabPosition] = newCategories.splice(targetPosition, 1, newCategories[grabPosition])[0];
            setCategories(newCategories);
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
          const newCategories = categories.slice();
          for (let i = 0; i < newCategories.length; i += 1) {
            if (newCategories[i] === oldName) {
              newCategories[i] = newName;
            }
          }
          setCategories(newCategories);
        }
      }
      confirmDeleteOptionPopup={
        (name) => {
          console.log("confirmDelete 실행");
          const newCategories = [];
          for (let i = 0; i < categories.length; i += 1) {
            if (categories[i] !== name) {
              newCategories.push(categories[i]);
            }
          }
          setCategories(newCategories);
        }
      }
      onChangeAddList={
        (value) => {
          console.log("onChangeAddList 실행 : 추가 할 라벨 이름 변경", value)
          setNewCategory(value);
        }
      }
      onPressEnterAddList={
        (name) => {
          console.log("onPressEnterAddList 실행됨 : 새로운 라벨 추가", name);
          setCategories([...categories, name]);
          setNewCategory("");
        }
      }
      onPressEscapeAddList={
        () => {
          console.log("onPressEscapeAddList 실행 : addNewCategory value를 \"\"로 변경");
          setNewCategory("");
        }
      }
      AddListValue={newCategory}
    />);
}
