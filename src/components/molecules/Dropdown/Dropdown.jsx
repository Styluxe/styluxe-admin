import { useState } from "react";

const Dropdown = ({
    placeholder,
    menu,
    onClickMenu,
    classname,
    withLabel,
    labelText,
    selectedOption = ''
}) => {

    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState(selectedOption);
  
    return (
        <div className={`relative ${classname}`}>
            {withLabel && <div className="mb-[10px]"><text className="text-sm font-medium text-gray-700 ">{labelText}</text></div>}
            <div 
                className="flex items-center border-[1px] border-gray-500 px-[10px] py-[5px] cursor-pointer rounded-[5px] justify-between"
                onClick={() => setOpen(!open)}
            >
                {selected === '' ? placeholder : selected}
                <img src="left_arrow.svg" alt="" className={`w-[18px] h-[18px] transform ${open ? 'rotate-90' : '-rotate-90'}`} />
            </div>
            <div className={`transition-all duration-300 ${open ? 'max-h-[200px] overflow-y-auto' : 'max-h-0 overflow-hidden'} absolute top-[110%] w-full`}>
                {menu.map((item, index) => (
                    <div 
                        key={index} 
                        className="text-black text-[14px] cursor-pointer hover:bg-[#b99b42] p-[5px] bg-[#d9c075]" 
                        onClick={() => {
                            setOpen(false)
                            setSelected(item.label);
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
