
const InputLabel = ({classname,label,name, labelPosition = 'top', inputClassName, placeholder, disabled, ref, type, ...props}) => {
  return (
    <div className={`flex gap-[10px] ${labelPosition === 'left' && 'flex-row items-center'} ${labelPosition === 'top' && 'flex-col'} ${classname}`}>
        <label className="text-sm font-medium text-gray-700" htmlFor={name}>{label}</label>
        {type === 'textarea' ? <textarea className={`placeholder:text-muted ${inputClassName}`}
            name={name}
            placeholder={placeholder ? placeholder : ''}
            disabled={disabled}
            ref={ref}
            {...props} />
            :  <input
            className={`placeholder:text-muted ${inputClassName}`}
            name={name}
            placeholder={placeholder ? placeholder : ''}
            disabled={disabled}
            type={type}
            ref={ref}
            {...props}
        />}
       
    </div>
  )
}

export default InputLabel
