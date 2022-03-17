import React, { useEffect } from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";

import Menu from "./Menu";
import Categories from "./Categories";
import Labels from "./Labels";

export default function TodoPage({ }) {
  // 카테고리는 Categories.jsx에서 받기
  const categories = ["BurningTimer 업데이트", "Typescript 사용", "독서", "홈트레이닝"];
  // onSelect : 클릭 된 버튼 이름에 따라서 해당 페이지로 이동
  const onSelect = (select) => console.log(`OnSelect 실행 & ${select} 선택됨`);
  // 카테고리는 Categories.jsx에서 받기
  const createNewCategory = () => console.log("createNewCategory 실행");

  useEffect(() => {
    localStorage.setItem("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJpYXQiOjE2NDc0OTcwNzksImV4cCI6MTY0NzU4MzQ3OX0.DEwZE_Bk0NnvtIdkNsmC1QtSGGksAxJ4I7JTSth6Fkw")
  }, []);

  function onSelectMenu(pageName) {

  }

  const category = {name: "BurningTimer 업데이트", _id: "6232cfb545f446f6461f41a0", priority: 1};
  const labels = ["API / Schema 정리", "서버 구축", "클라이언트 구축"];
  const createNewLabel = () => console.log("createNewLabel 실행");
  const onClickLabel =  (e) => console.log("onClickLabel 실행", e);

  return (
    <TodoPageWrapper>
      <MenuWrapper>
        <Menu onSelect={(e) => console.log("onSelectMenu", e)}></Menu>
      </MenuWrapper>
      <CategoriesWrapper>
        <Categories categories={categories} onSelect={onSelect} createNewCategory={createNewCategory} ></Categories>
      </CategoriesWrapper>
      <LabelsWrapper>
        <Labels category={category} labels={labels} createNewLabel={createNewLabel} onClickLabel={onClickLabel} ></Labels>
      </LabelsWrapper>
    </TodoPageWrapper>
  )
}

const TodoPageWrapper = styled.section`
  font-family: sans-serif !important;
  display: grid;
  grid-template-columns: 82px 220px auto;
  background-color: #F2F2F2;
  height: 100%;
`

const MenuWrapper = styled.div`
  padding: 20px 0;
  text-align: center;
`

const CategoriesWrapper = styled.div`
  padding: 20px 0;
  border-left: 1px solid rgba(0,0,0,.08);
  max-height: 100vh;
  overflow: scroll;
`

const LabelsWrapper = styled.div`
  background-color: #FFFFFF;
  padding: 20px;
  max-height: 100vh;
  overflow: scroll;
`

TodoPage.propTypes = {
};
