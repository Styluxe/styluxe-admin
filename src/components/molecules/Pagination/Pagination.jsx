import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/16/solid";

const Pagination = ({ currentPage, totalPages, onPageChange, classname }) => {
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className={`flex gap-[20px] items-center ${classname}`}>
      <div className="flex gap-[10px]">
        {pageNumbers.map((number) => (
          <div
            key={number}
            className={`cursor-pointer px-[10px] py-[5px] rounded-[5px] text-white text-[16px] ${
              currentPage === number ? "bg-primary" : "bg-secondary"
            }`}
            onClick={() => onPageChange(number)}
          >
            {number}
          </div>
        ))}
      </div>
      <div className="flex gap-[10px]">
        <ChevronLeftIcon
          width={36}
          height={36}
          className={`bg-primary p-[5px] rounded-sm cursor-pointer ${
            currentPage === 1 && "pointer-events-none !bg-secondary"
          }`}
          onClick={() => onPageChange(currentPage - 1)}
        />
        <ChevronRightIcon
        width={36}
        height={36}
          className={`bg-primary p-[5px] rounded-sm cursor-pointer  ${
            currentPage === totalPages && "pointer-events-none !bg-secondary"
          }`}
          onClick={() => onPageChange(currentPage + 1)}
        />
      </div>
    </div>
  );
};

export default Pagination;
