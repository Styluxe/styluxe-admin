import { useState } from "react"
import { Button } from "../../atoms/Button"

const InputSearch = ({classname, placeholder, onSearch, inputClassName}) => {
   const [query, setQuery] = useState('')
  return (
    <div className={`flex items-center gap-x-[15px] ${classname}`}>
        <input type="text" onChange={(e) => setQuery(e.target.value)} placeholder={placeholder} className={inputClassName}/>
        <Button text={'Search'} classname={'bg-[#91680f] py-[3px] px-[10px] rounded-[5px] text-white'} icon iconSrc={'search_icon.svg'} onClick={() => onSearch(query)}/>
    </div>
  )
}

export default InputSearch
