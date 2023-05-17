import { classNames } from "../utils";
import { useState } from "react";

export default function Toggle({ options, className, onChange }) {
  const [currentOptionIndex, setCurrentOptionIndex] = useState(0);

  return (
    <button
      onClick={() => {
        const index =
          currentOptionIndex + 1 === options.length
            ? 0
            : currentOptionIndex + 1;
        setCurrentOptionIndex(index);
        onChange(options[index]);
      }}
      className={classNames(
        "text-sm px-4 min-w-6 rounded shadow-sm bg-gray-600 text-white font-semibold",
        className
      )}
    >
      {options[currentOptionIndex]}
    </button>
  );
}
