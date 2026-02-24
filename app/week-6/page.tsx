"use client";
import ItemList from "./item-list";
import NewItems from "./new-item";
import Items from "./item.json";
import { useState } from "react";

export default function Week6page() {
  const [Item, setItem] = useState(Items);

  function handleAddItem(newItem: {
    name: string;
    quantity: number;
    category: string;
  }) {
    setItem([...Item, { ...newItem, id: Date.now().toString() }]);
  }

  return (
    <main className="container  mx-auto p-4">
      <h1 className="text-2xl ml-120 mt-6 font-bold mb-4">Week 6 Shopping List</h1>
      <NewItems onAddItem={handleAddItem} />
      <ItemList items={Item} />
    </main>
  );
}