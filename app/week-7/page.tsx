"use client";
import ItemList from "./item-list";
import NewItems from "./new-item";
import MealIdeas from "./meal-idea";
import Items from "./item.json";
import { useState } from "react";

export default function Week7page() {
  const [Item, setItem] = useState(Items);
  const [selectedItemName, setSelectedItemName] = useState("");

  function handleAddItem(newItem: {
    name: string;
    quantity: number;
    category: string;
  }) {
    setItem([...Item, { ...newItem, id: Date.now().toString() }]);
  }

  function handleItemSelect(item: { name: string }) {
    const cleaned = item.name
      .split(",")[0]
      .trim()
      .replace(
        /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD00-\uDDFF])/g,
        ""
      )
      .trim();
    setSelectedItemName(cleaned);
  }

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl mt-6 font-bold mb-4 text-center">
        Shopping List
      </h1>
      <div className="flex gap-8">
        <div className="flex-1">
          <NewItems onAddItem={handleAddItem} />
          <ItemList items={Item} onItemSelect={handleItemSelect} />
        </div>
        <div className="flex-1">
          {selectedItemName ? (
            <MealIdeas ingredient={selectedItemName} />
          ) : (
            <p className="text-gray-500 text-center mt-10">
              Click an item to see meal ideas
            </p>
          )}
        </div>
      </div>
    </main>
  );
}