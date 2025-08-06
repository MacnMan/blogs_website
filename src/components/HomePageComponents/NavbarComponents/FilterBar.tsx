interface FilterBarProps {
  selected: string;
  onSelect: (value: string) => void;
}

const categories = [
  "All",
  "LoRaWAN",
  "4G Cellular",
  "WiFi 6",
  "Nb IoT",
  "Gateway",
  "Nodes",
  "Controllers"
];

export default function FilterBar({ selected, onSelect }: FilterBarProps) {
  return (
    <div className="flex gap-4 overflow-x-auto py-4">
      {categories.map((category) => (
        <button
          key={category}
          className={`px-4 py-1 text-sm rounded-full ${
            selected === category
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => onSelect(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
}