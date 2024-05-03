import { counterState, decrement, increment } from "./redux-toolkit/counter/counterSlice"
import { useSelector, useDispatch} from 'react-redux'
function App() {

  const counter = useSelector(counterState)
  const dispatch = useDispatch()

  return (
        <div className="flex justify-center items-center bg-slate-500 flex-col">
          <div>Hellooo Broo</div>
          <div className="flex gap-[20px]">
            <button onClick={()=>dispatch(increment(1))}>add</button>
            <div>{counter}</div>
            <button  onClick={()=>dispatch(decrement(1))}>min</button>
          </div>
        </div>
  )
}

export default App
