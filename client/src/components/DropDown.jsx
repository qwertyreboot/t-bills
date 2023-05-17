import { useCallback, useState } from "react";

const Dropdown = ({
  options = [],
  limit = -1,
  initialSearchText = "",
  label = (item) => (typeof item === "string" ? item : item?.label),
  match = (item, searchText) =>
    label(item).trim().toLowerCase().includes(searchText.trim().toLowerCase()),
  className = "",
  placeholder = "",
  fetchOptions,
  onSearchChange,
  onSelectionChange,
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchText, setSearchText] = useState(initialSearchText);
  const [items, setItems] = useState(options);

  const handleOnSearchChange = useCallback(
    async (searchText) => {
      const filteredItems =
        (await fetchOptions?.(searchText)) ??
        options.filter((item) => match(item, searchText));
      setItems(filteredItems);
    },
    [fetchOptions, match, options]
  );

  return (
    <div className={"relative inline-block " + className}>
      <input
        type="text"
        value={searchText}
        placeholder={placeholder}
        onClick={() => setShowDropdown(!showDropdown)}
        onChange={(e) => {
          setSearchText(e.target.value);
          handleOnSearchChange(e.target.value);
          onSearchChange?.(e.target.value);
        }}
        className="appearance-none h-10 block w-full border border-gray-400 rounded py-2 px-4 text-sm hover:bg-gray-50 focus:outline-none focus:bg-white focus:ring-primary-500"
      />
      <div
        hidden={!showDropdown}
        className="origin-top-left absolute z-40 left-0 mt-2 w-full rounded-md shadow-lg"
      >
        <div className="rounded-md bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1 max-height-dropdown">
            {items.slice(0, limit).map((item, index) => (
              <button
                type="button"
                key={index}
                onClick={() => {
                  setSearchText(label(item));
                  setShowDropdown(false);
                  onSelectionChange?.(item);
                }}
                className="w-full block px-4 py-2 text-sm leading-5 text-left text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
              >
                {label(item)}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
