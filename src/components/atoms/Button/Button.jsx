const Button = ({
  classname,
  icon,
  text,
  iconSrc,
  onClick,
  disabled,
  children,
  type,
}) => {
  return (
    <button
      type={type}
      className={`${classname} flex items-center justify-center ${
        icon && "gap-x-[5px]"
      } button`}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && <img src={iconSrc} alt="" className="w-[18px] h-[18px]" />}
      {children ? children : text}
    </button>
  );
};

export default Button;
