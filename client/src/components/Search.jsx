import { TbSearch } from "react-icons/tb";

export default function Search({
  icon: Icon = TbSearch,
  placeholder = "Start typing to search",
}) {
  return (
    <div className="relative rounded-md shadow-sm">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
        <Icon className="text-gray-500" />
      </div>
      <input
        type="text"
        className="w-full pl-10 p-2 rounded-md border border-gray-500"
        placeholder={placeholder}
      />
    </div>
  );
}
