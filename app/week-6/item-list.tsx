"use client";
import { useState } from "react";

interface Item {
  id: string;
  name: string;
  quantity: number;
  category: string;
}

interface ItemListProps {
  items: Item[];
}

export default function ItemsSort({ items }: ItemListProps) {
  const [sortby, setSortby] = useState("name");

  function GroupByCategory() {
    const groupedItems = [...items].reduce((acc: { [key: string]: Item[] }, item) => {
      if (!acc[item.category]) {
        acc[item.category] = [];
      }
      acc[item.category].push(item);
      return acc;
    }, {});

    const sortedCategories = Object.keys(groupedItems).sort();
    const result: { [key: string]: Item[] } = {};
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
                  <li key={item.id} className="text-gray-700">
                    • {item.name} {item.quantity}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <ul className="space-y-4">
          {sortby === "name"
            ? SortName().map((item) => (
                <li key={item.id} className="flex justify-between p-4 bg-gray-50 rounded-lg shadow text-blue-500">
                  <span>{item.name}</span>
                  <span>{item.category}</span>
                </li>
              ))
            : SortCategory().map((item) => (
                <li key={item.id} className="flex justify-between p-4 bg-gray-50 rounded-lg shadow text-blue-500">
                  <span>{item.category}</span>
                  <span>{item.name}</span>
                </li>
              ))}
        </ul>
      )}
    </div>
  );
}