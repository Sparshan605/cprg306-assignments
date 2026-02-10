"use client";
import { useState } from "react";
import Items from "./item.json";

export default function ItemsSort() {
    const [sortby, setSortby] = useState("name");
    const [groupby, setGroupby] = useState("category");

    function GroupByCategory() {
        const groupedItems = Items.reduce((acc: { [key: string]: typeof Items }, item) => {
            if (!acc[item.category]) {
                acc[item.category] = [];
            }
            acc[item.category].push(item);
            return acc;
        }, {});
        
        const sortedCategories = Object.keys(groupedItems).sort();
        const result: { [key: string]: typeof Items } = {};
        sortedCategories.forEach(category => {
            result[category] = groupedItems[category].sort((a, b) => a.name.localeCompare(b.name));
        });
        return result;
    }
    
    function SortCategory() {
        const sortedItems = [...Items].sort((a, b) => {
            if (sortby === "category") {
                return a.category.localeCompare(b.category);
            }
            return 0;
        });
        return sortedItems;
    }


    function SortName() {
        const sortedItems = [...Items].sort((a, b) => {
            if (sortby === "name") {
                return a.name.localeCompare(b.name);
            } 
            return 0;
        });
        return sortedItems;
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
                    {Object.entries(GroupByCategory()).map(([category, items]) => (
                        <div key={category} className="mb-6">
                            <h3 className="text-xl font-semibold text-gray-800 capitalize mb-2">{category}</h3>
                            <ul className="bg-gray-50 rounded-lg shadow text-blue-500 p-10">
                                {items.map((item) => (
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
                    {sortby === "name" ? SortName().map((item) => (
                        <li key={item.id} className="flex justify-between p-4 bg-gray-50 rounded-lg shadow text-blue-500">
                            <span>{item.name}</span>
                            <span>{item.category}</span>
                        </li>
                    )) : SortCategory().map((item) => (
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