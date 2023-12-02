import React, { useEffect, useState } from "react";
import { BiSolidDownArrow } from "react-icons/bi";

export const Selector = ({
  onSelect,
  label,
  register,
  focusContent,
  inputData,
  getSelectedSector,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [selected, setSelected] = useState("");
  const [open, setOpen] = useState(false);

  const handleSelect = (item) => {
    if (item.name.toLowerCase() !== selected.toLowerCase()) {
      setSelected(item.name);
      setOpen(false);
      setInputValue("");
      onSelect ? onSelect(item) : null;
    }
  };

  return (
    <div className="text-sm space-y-3">
      <p className="font-semibold flex">
        {label}
        <span className="ml-1 text-red-700  text-[10px] hidden lg:block">
          {focusContent}
        </span>
      </p>
      <div className="relative">
        <div
          onClick={() => setOpen(!open)}
          className={`bg-white w-full p-3 flex items-center justify-between rounded border-[1.5px] border-gray-200 text-[#10172A] font-normal ${
            !selected && "text-[#10172A]"
          }`}
        >
          <input
            type="text"
            value={
              selected
                ? selected.length > 25
                  ? selected.substring(0, 25) + "..."
                  : selected
                : getSelectedSector
                ? getSelectedSector
                : ""
            }
            name="sector"
            {...register}
            placeholder="Select an option"
            className="w-full text-[#10172A] focus:outline-none"
          />

          <BiSolidDownArrow
            size={12}
            className={` text-[#10172A] ${open && "rotate-180"}`}
          />
        </div>

        <ul
          className={`shadow-[0_8px_30px_rgb(0,0,0,0.12)] bg-[#476a82] mt-2 overflow-y-auto w-full font-normal cursor-pointer ${
            open ? "max-h-48" : "max-h-0"
          } absolute top-full w-full z-50`}
        >
          {inputData?.map((item) => (
            <li
              key={item?.name}
              className={`p-4 text-sm hover:bg-[#10172A] cursor-pointer hover:text-white
            ${item?.name?.toLowerCase() === selected?.toLowerCase() && ""}
            ${
              item?.name?.toLowerCase().startsWith(inputValue)
                ? "block"
                : "hidden"
            }`}
              onClick={() => handleSelect(item)}
            >
              {item?.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
