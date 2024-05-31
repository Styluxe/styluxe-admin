
const Badge = ({label, classname}) => {
  return (
    <div className={`${classname} py-[3px] px-[10px] rounded-[20px] bg-[#ab985d] text-[12px] font-semibold w-fit text-slate-50 pointer-events-none`}>
        {label}
    </div>
  )
}

export default Badge
