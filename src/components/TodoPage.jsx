import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Empty } from "antd";

import Menu from "./Menu";
import Categories from "./Categories";
import Labels from "./Labels";

export default function TodoPage() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  useEffect(() => {
    // 임시로 로그인시킴
    localStorage.setItem("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJpYXQiOjE2NDc0OTcwNzksImV4cCI6MTY0NzU4MzQ3OX0.DEwZE_Bk0NnvtIdkNsmC1QtSGGksAxJ4I7JTSth6Fkw")
  }, []);

  function onSelectCategory(category) {
    setSelectedCategory(category);
  }

  return (
    <TodoPageWrapper>
      <MenuWrapper>
        <Menu />
      </MenuWrapper>
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

const EmptyWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`
