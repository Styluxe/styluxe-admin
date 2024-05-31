import { useMemo, useState } from "react"
import { InputSearch } from "../../components/molecules/InputSearch"
import { Navbar } from "../../components/molecules/NavBar"
import { SideBar } from "../../components/organisms/SideBar"
import { Button } from "../../components/atoms/Button"
import { Pagination } from "../../components/molecules/Pagination"
import { Table } from "../../components/organisms/Table"
import { Modal } from "../../components/molecules/Modal"
import { dummyOrdersBody, ordersHeading } from "../../mocks/dummyOrders"
import { Badge } from "../../components/atoms/Badge"


const OrdersPage = () => {

  const [currentPage, setCurrentPage] = useState(1);
  const [tableData, setTableData] = useState(dummyOrdersBody);
  const [modalType, setModalType] = useState(null)

  const renderButtonLabel = (status) => {
    if(status === 'Waiting For Confirmation') {
        return 'Move into Processing'
    }
    else if(status === 'Processing') {
        return 'Move into On Delivery'
    }
    else if(status === 'On Delivery') {
        return 'Move into Delivered'
    }
  }

  const renderTableData = useMemo(() => {
    return tableData.map((data) => {
      return {
        ...data,
       products: data.products.map((product) => `${product.product_name}(${product.quantity})`).join(', '),
       order_status: <div className="flex">
                        <Badge label={data.order_status}/>
                        {(data.order_status != 'Pending' && data.order_status != 'Delivered') && <Button text={renderButtonLabel(data.order_status)} classname={'bg-[#91680f] py-[3px] px-[10px] rounded-[5px] text-white w-fit ml-auto text-[13px]'} onClick={() => setModalType('change_status')}
                        />}
                    </div>
      }
  })}, [tableData]);

  const onPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearch = (query) => {
    setTableData(query === '' ? dummyOrdersBody : dummyOrdersBody.filter((item) => item.order_id == query));
  };
  

  const itemsPerPage = 10
  const totalPages = Math.ceil(tableData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = renderTableData.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="flex">
        <SideBar />
        <div className="flex-1 h-screen">
            <Navbar title={'Manage Orders'} userLoginName={'Bryan Hanuga'}/>
            <div className="flex flex-col p-[20px]">
              <div className="flex flex-col gap-y-[10px] border-b-[1px] border-slate-500 pb-[30px]">
                <text className="text-[15px] font-semibold">Search Order</text>
                <InputSearch placeholder={'Order ID'} onSearch={handleSearch} inputClassName={'rounded-[3px] border-[1px] border-black px-[15px] outline-none w-[400px] py-[3px]'}/>
              </div>
              <div className="flex justify-between">
                <Pagination classname={'mt-[20px]'}currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange}/>
              </div>
             <Table headings={ordersHeading} data={currentItems} classname={'mt-[20px] rounded-[5px]'}/>
            </div> 
        </div>
        <Modal type="change_status" isOpen={modalType === 'change_status'} onClose={()=> setModalType(null)}>
          <div className="flex flex-col items-center justify-center w-full gap-y-[15px]">
            <text className="text-[20px] font-bold">Confirmation</text>
            <text className="text-[20px] text-center">Are You Sure You Want to Change The Status?</text>
            <div className="flex gap-[30px]">
            <Button text={'Yes'} classname={'bg-[#91680f] py-[5px] px-[10px] rounded-[5px] mt-[15px] w-fit text-white'} />
            <Button text={'No'} classname={'bg-white border-2 border-[#91680f] py-[5px] px-[10px] rounded-[5px] mt-[15px] w-fit text-[#91680f]'} onClick={()=> setModalType(null)} />
            </div>
          </div>
        </Modal>
    </div>
  )
}

export default OrdersPage
