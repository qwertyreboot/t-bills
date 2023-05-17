import {
  TbNotes,
  TbShoppingCart,
  TbSquareRoundedChevronLeftFilled,
  TbSquareRoundedChevronRightFilled,
  TbUser,
} from "react-icons/tb";
import { useEffect, useState } from "react";

import { classNames } from "../utils";

export default function Sidebar({ onChangeSize }) {
  const [isMaximized, setIsMaximized] = useState(false);

  useEffect(() => {
    onChangeSize(isMaximized);
  }, [isMaximized]);

  return (
    <>
      <aside
        id="default-sidebar"
        className={classNames(
          "fixed top-0 left-0 z-40 w-16 h-screen transition-transform",
          isMaximized && "!w-48"
        )}
        aria-label="Sidebar"
      >
        <div className="h-full sm:px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            <li>
              <a
                href="/bills"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <TbNotes size={25} />
                {isMaximized && (
                  <span className="flex-1 ml-3 whitespace-nowrap">Bills</span>
                )}
              </a>
            </li>
            <li>
              <a
                href="/products"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <TbShoppingCart size={25} />
                {isMaximized && (
                  <span className="flex-1 ml-3 whitespace-nowrap">
                    Products
                  </span>
                )}
              </a>
            </li>
            <li>
              <a
                href="/users"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <TbUser size={25} />
                {isMaximized && (
                  <span className="flex-1 ml-3 whitespace-nowrap">Users</span>
                )}
              </a>
            </li>
          </ul>

          {isMaximized ? (
            <TbSquareRoundedChevronLeftFilled
              onClick={() => setIsMaximized(false)}
              className="absolute bottom-10 right-5"
              size={45}
            />
          ) : (
            <TbSquareRoundedChevronRightFilled
              onClick={() => setIsMaximized(true)}
              className="absolute bottom-10 right-5"
              size={45}
            />
          )}
        </div>
      </aside>
    </>
  );
}
