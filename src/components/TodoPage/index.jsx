import React, { useState } from "react";
import TodoPageView from "./TodoPageView";

export default function TodoPage() {
  const [selectedCategory, setSelectedCategory] = useState(null);

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
