"use client";
import { useState } from "react";
import Item from "./item";

interface ItemType {
  id: string;
  name: string;
  quantity: number;
  category: string;
}

interface ItemListProps {
  items: ItemType[];
  onItemSelect: (item: ItemType) => void;
}

export default function ItemsSort({ items, onItemSelect }: ItemListProps) {
  const [sortby, setSortby] = useState("name");

  function GroupByCategory() {
    const groupedItems = [...items].reduce((acc: { [key: string]: ItemType[] }, item) => {
      if (!acc[item.category]) {
        acc[item.category] = [];
      }
      acc[item.category].push(item);
      return acc;
    }, {});

    const sortedCategories = Object.keys(groupedItems).sort();
    const result: { [key: string]: ItemType[] } = {};
    sortedCategories.forEach((category) => {
      result[category] = [...groupedItems[category]].sort((a, b) =>
        a.name.localeCompare(b.name)
      );
    });
    return result;
  }

  function SortCategory() {
    return [...items].sort((a, b) => a.category.localeCompare(b.category));
  }

  function SortName() {
    return [...items].sort((a, b) => a.name.localeCompare(b.name));
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-8 bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-200">
      <h2 className="text-3xl font-bold mb-8 text-gray-800 text-center tracking-wide">
        Sort Items By Name or Category
      </h2>
      <div className="flex justify-center mb-6">
        <button
          onClick={() => setSortby("name")}
          className={`px-4 py-2 rounded-xl mr-4 ${sortby === "name" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"}`}
        >
          Sort by Name
        </button>
        <button
          onClick={() => setSortby("category")}
          className={`px-4 py-2 rounded-xl mr-4 ${sortby === "category" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"}`}
        >
          Sort by Category
        </button>
        <button
          onClick={() => setSortby("grouped")}
          className={`px-4 py-2 rounded-xl ${sortby === "grouped" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"}`}
        >
          Group by Category
        </button>
      </div>
      {sortby === "grouped" ? (
        <div>
          {Object.entries(GroupByCategory()).map(([category, categoryItems]) => (
            <div key={category} className="mb-6">
              <h3 className="text-xl font-semibold text-gray-800 capitalize mb-2">
                {category}
              </h3>
              <ul className="bg-gray-50 rounded-lg shadow text-blue-500 p-10">
                {categoryItems.map((item) => (
                  <Item
                    key={item.id}
                    name={item.name}
                    quantity={item.quantity}
                    category={item.category}
                    onSelect={() => onItemSelect(item)}
                  />
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <ul className="space-y-4">
          {(sortby === "name" ? SortName() : SortCategory()).map((item) => (
            <Item
              key={item.id}
              name={item.name}
              quantity={item.quantity}
              category={item.category}
              onSelect={() => onItemSelect(item)}
            />
          ))}
        </ul>
      )}
    </div>
  );
}