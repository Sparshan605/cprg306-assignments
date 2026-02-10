"use client";
import { useState } from "react";
import Items from "./item.json";

export default function ItemsSort() {
    const [sortby, setSortby] = useState("name");
    
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
                    className={`px-4 py-2 rounded-xl ${sortby === "category" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"}`}
                >
                    Sort by Category
                </button>
            </div>
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
        </div>

    );
}
