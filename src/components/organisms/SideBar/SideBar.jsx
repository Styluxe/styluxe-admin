import { useState } from "react"


const SideBar = () => {
    const [open, setOpen] = useState(false)
    const menus = [
      {
        label: 'Products',
        src: 'white_hanger.svg'
      },
      {
        label: 'Categories',
        src: 'white_categories.svg'
      },
      {
        label: 'Orders',
        src: 'white_bill.svg'
      },
  
    ]
    return (
            <div className={`${open ? 'w-[200px]' : 'w-[45px]'} h-screen bg-[#91680f] relative duration-300 pt-[15px] p-[8px]`}>
              <div className="flex absolute cursor-pointer right-[-10px] top-10 border-2 border-black rounded-full bg-white justify-center items-center p-[2px]">
                <img src="left_arrow.svg" alt="" className={`w-[18px] h-[18px] ${open ? 'rotate-0' : 'rotate-180'}`} onClick={() => setOpen(!open)}/>
              </div>
              <div className="flex gap-[10px]">
                <img src="profile_icon.svg" alt="" className={'w-[25px] h-[25px]'}/>
                <text className={`text-white duration-200 ${!open && 'scale-0'}`} >Styluxe</text>
              </div>
              <div className="pt-[30px]">
                  {menus.map((menu, index) => (
                      <div key={index} className={`text-gray-300 text-sm flex items-center gap-x-[7px] cursor-pointer ${open ? 'p-[10px] !pl-[2px]' : 'pl-[2px]'} py-[10px] hover:bg-[#efcc62] rounded-sm`}>
                          <img src={menu.src} alt="" className="!w-[18px] !h-[18px]"/>
                          <a className={`text-white duration-200 ${!open && 'scale-0'}`} href={`/${menu.label.toLowerCase()}`}>{menu.label}</a>
                      </div>
                  ))}
              </div>
            </div>
    )
}

export default SideBar
