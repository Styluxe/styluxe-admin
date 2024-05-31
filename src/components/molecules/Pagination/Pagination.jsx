
const Pagination = ({ 
    currentPage, 
    totalPages, 
    onPageChange,
    classname 
}) => {
    const pageNumbers = [];
  
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
  
    return (
    <div className={`flex gap-[20px] items-center ${classname}`}>
        <div className="flex gap-[10px]">
         {pageNumbers.map((number) => (
            <div key={number} className={`cursor-pointer px-[10px] py-[5px] rounded-[5px] text-white text-[16px] ${currentPage === number ? 'bg-[#91680f]' : 'bg-[#d4ae3c]'}`} onClick={() => onPageChange(number)}>
                {number}
            </div>
          ))}
        </div>
        <div className="flex gap-[10px]">
            <img 
                src="left_arrow.svg" 
                alt="" 
                className={`bg-[#d4ae3c] p-[5px] rounded-sm cursor-pointer ${currentPage === 1 && 'pointer-events-none !bg-gray-300'}`}
                onClick={() => onPageChange(currentPage - 1)}
            />
            <img 
                src="left_arrow.svg" 
                alt="" 
                className={`bg-[#d4ae3c] p-[5px] rounded-sm rotate-180 cursor-pointer  ${currentPage ===  totalPages && 'pointer-events-none !bg-gray-300'}`}
                onClick={() => onPageChange(currentPage + 1)}
            />
        </div>
    </div>
    );
  };
  
  export default Pagination;
