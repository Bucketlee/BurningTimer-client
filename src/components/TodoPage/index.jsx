import React, { useEffect, useState } from "react";
import TodoPageView from "./TodoPageView";

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
    <TodoPageView
      onSelectCategory={onSelectCategory}
      selectedCategory={selectedCategory}
    />
  );
}
