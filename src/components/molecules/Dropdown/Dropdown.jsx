import { ChevronDownIcon } from "@heroicons/react/16/solid";
import { useEffect, useState, useRef } from "react";

const Dropdown = ({
  placeholder,
  menu,
  onClickMenu,
  classname,
  withLabel,
  labelText,
  selectedOption = "",
}) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(selectedOption);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (selectedOption) {
      setSelected(selectedOption);
    }
  }, [selectedOption]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const getLabelFromValue = (value) => {
    return menu.find((item) => item.value === value)?.label;
  };

  return (
    <div className={`relative ${classname}`} ref={dropdownRef}>
      {withLabel && (
        <div className="mb-[10px]">
          <p className="text-sm font-medium text-gray-700 ">{labelText}</p>
        </div>
      )}
      <div
        className="flex items-center border-[1px] border-gray-500 px-[10px] py-[5px] cursor-pointer rounded-[5px] justify-between"
        onClick={() => setOpen(!open)}
      >
        {selected === "" ? placeholder : getLabelFromValue(selected)}
        <ChevronDownIcon
          className={`w-[18px] h-[18px] transform ${
            open ? "rotate-180" : "rotate-0"
          }`}
        />
      </div>
      <div
        className={`transition-all duration-300 ${
          open ? "max-h-[200px] overflow-y-auto" : "max-h-0 overflow-hidden"
        } absolute top-[110%] w-full shadow-[0_3px_10px_rgb(0,0,0,0.2)]`}
      >
        {menu.map((item, index) => (
          <div
            key={index}
            className="text-black text-[14px] cursor-pointer hover:bg-secondary p-[5px] bg-gray-200"
            onClick={() => {
              setOpen(false);
              setSelected(item.value);
              onClickMenu(item.value);
            }}
          >
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dropdown;
