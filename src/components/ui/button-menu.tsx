"use client";

import { useSidebar } from "@/store/sidebar.store";

export const ButtonMenu = () => {
  const setIsOpen = useSidebar((state) => state.setIsOpen);

  return (
    <button
      onClick={setIsOpen}
      className="m-2 px-2 py-1 rounded-md transition-all hover:bg-gray-100"
    >
      Menu
    </button>
  );
};
