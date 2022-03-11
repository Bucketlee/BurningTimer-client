import React from 'react';

import Categories from '../components/Categories';

export default {
  title: 'Menu/Categories',
  component: Categories,
};

const Template = (args) => <Categories {...args} />;

export const CategoriesSample = Template.bind({});
CategoriesSample.args = {
  categories: ["BurningTimer 업데이트", "Typescript 사용", "독서", "홈트레이닝"],
  onSelect: (select) => console.log(`OnSelect 실행 & ${select} 선택됨`),
  createNewCategory: () => console.log("createNewCategory 실행")
};
