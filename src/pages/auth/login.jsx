import { Button } from '../../components/atoms/Button'
import './login.css'
const LoginPage = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-slate-200">
      <div className="w-[350px] h-fit bg-white rounded-[10px] drop-shadow-lg flex flex-col gap-y-[25px] items-center pb-[40px]">
        <div className='loginHeader text-white text-center text-[25px] py-[10px] rounded-t-[10px] font-semibold w-full'>Login Form</div>
            <input className='border-[2px] border-gray-300 p-[8px] rounded-[20px] w-[80%]' placeholder='Email Address'></input>
            <input className='border-[2px] border-gray-300 p-[8px] rounded-[20px] w-[80%]' placeholder='Password'></input>
            <Button text={'Login'} classname={'loginHeader p-[8px] text-white w-[80%] rounded-[20px] font-semibold'}/>
      </div>
    </div>
  )
}

export default LoginPage
