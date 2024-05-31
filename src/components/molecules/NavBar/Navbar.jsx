// import styles from './Navbar.module.css'
const Navbar = ({
    title,
    userLoginName
}) => {
  return (
    <div className={`flex w-full p-[10px] !pl-[20px] shadow-md items-center justify-between`}>
        <text className="text-[20px] font-semibold">{title}</text>
        <div className="flex gap-[10px] w-fit h-fit">
            <img src="profile_icon.svg" alt="" />
            <text >{`${userLoginName}`}</text>
        </div>
    </div>
  )
}

export default Navbar
