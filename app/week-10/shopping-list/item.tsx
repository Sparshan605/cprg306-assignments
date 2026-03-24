interface ItemProps {
    name: string;
    quantity: number;
    category: string;
    onSelect: () => void;
}

export default function Items({ name, quantity, category, onSelect }: ItemProps) {
    return (
        <li
            onClick={onSelect}
            className="flex items-center justify-between p-4 bg-gray-100 rounded-lg shadow-sm border border-gray-200 cursor-pointer hover:bg-gray-200 transition-colors"
        >
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 w-full">
                <span className="font-semibold text-gray-800 text-lg">{name}</span>
                <div className="flex gap-4 text-sm">
                    <span className="text-gray-600">
                        Quantity: <span className="font-medium text-gray-900">{quantity}</span>
                    </span>
                    <span className="text-gray-600">
                        Category: <span className="font-medium text-blue-600">{category}</span>
                    </span>
                </div>
            </div>
        </li>
    );
}