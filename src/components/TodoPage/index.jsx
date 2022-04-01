import React, { useState } from "react";
import TodoPageView from "./TodoPageView";

export default function TodoPage() {
  const [selectedCategory, setSelectedCategory] = useState(undefined);

  function onSelectCategory(category) {
    setSelectedCategory(category);
  }

  return (
    <TodoPageView
      onSelectCategory={onSelectCategory}
      selectedCategory={selectedCategory}
    />
  );
}
