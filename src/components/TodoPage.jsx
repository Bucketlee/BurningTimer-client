import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";

import Menu from "./Menu";
import Categories from "./Categories";
import Labels from "./Labels";

export default function TodoPage({ }) {
  const categories = ["BurningTimer 업데이트", "Typescript 사용", "독서", "홈트레이닝"];
  const onSelect = (select) => console.log(`OnSelect 실행 & ${select} 선택됨`);
  const createNewCategory = () => console.log("createNewCategory 실행");


  const category = "BurningTimer 업데이트";
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
