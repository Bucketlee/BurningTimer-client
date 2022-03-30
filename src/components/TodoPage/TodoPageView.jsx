import React from "react";
import styled from "@emotion/styled";
import { Empty } from "antd";

import Categories from "../Categories";
import Labels from "../Labels";

export default function TodoPageView({ onSelectCategory, selectedCategory }) {
  return (
    <TodoPageViewWrapper>
      <CategoriesWrapper>
        <Categories onSelect={onSelectCategory} />
      </CategoriesWrapper>
      <LabelsWrapper>
        {selectedCategory ? (
          <Labels category={selectedCategory} />
        ) : (
          <EmptyWrapper>
            <Empty description={<div>카테고리를 선택하세요.</div>} />
          </EmptyWrapper>
        )}
      </LabelsWrapper>
    </TodoPageViewWrapper>
  )
}

const TodoPageViewWrapper = styled.section`
  font-family: sans-serif !important;
  display: grid;
  grid-template-columns: 220px auto;
  background-color: #F2F2F2;
  height: 100%;
`

const CategoriesWrapper = styled.div`
  padding: 30px 0;
  border-left: 1px solid rgba(0,0,0,.08);
  max-height: 100vh;
  overflow: auto;
`

const LabelsWrapper = styled.div`
  background-color: #FFFFFF;
  padding: 25px;
  max-height: 100vh;
  overflow: auto;
`

const EmptyWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`
