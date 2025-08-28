import {
    TruckOutlined
} from "@ant-design/icons";
import OrderCardSkeleton from "./OrderCardSkeleton";
import { Modal, Pagination, Spin } from "antd";
import { useState } from "react";
import { STATUS_CONFIG } from '../enum/enumStatusOrder'
import { useGetHistoryStatusOrder } from "../hook/useGetHistoryStatusOrder";
import { Link } from "react-router-dom";
import { useGetOrderByUserId } from "../hook/useGetOrderByUserId";
const OrderCard = () => {
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(5);
  const [showAll, setShowAll] = useState(false);
  const [showOrderId, setShowOrderId] = useState<string | null>(null);
  const {
        isPendingGetOrderByUserId,
        ResponseGetOrderByUserId
  } = useGetOrderByUserId(page, size);
  const data = ResponseGetOrderByUserId?.data.content || []
  

  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [isCodeOrder, setIsCodeOrder] = useState<string | null>(null);

  const { isPendingGetHistoryStatusOrder, ResponseGetHistoryStatusOrder } =
    useGetHistoryStatusOrder(selectedOrderId);

  const [isOpenModalViewHistoryStatusOrder, setIsOpenModalViewHistoryStatusOrder] = useState(false);

  const handleViewHistoryStatusOrder = (id: string, code: string) => {
    setSelectedOrderId(id);
    setIsCodeOrder(code);
    setIsOpenModalViewHistoryStatusOrder(true);
  };

  const mappedStatusConfig = STATUS_CONFIG.map((status) => {
    const matchedItem = ResponseGetHistoryStatusOrder?.data?.find((item) =>
      item.note.includes(status.matchText),
    );
    return {
      ...status,
      time: matchedItem?.createdAt || null,
    };
  });

  const handleShowMore = (code: string) => {
    setShowOrderId(code)
    setShowAll(true)
  }

  const handleShowLess = () => {
    setShowAll(false)
  }


  const getBorderColor = (statusKey: string, isDone: boolean, isCurrent: boolean) => {
    if (isDone || isCurrent) {
      switch (statusKey) {
        case 'processing':
          return 'border-amber-300';
        case 'confirmed':
          return 'border-rose-500';
        case 'ready':
          return 'border-fuchsia-500';
        case 'shipping':
          return 'border-orange-500';
        case 'completed':
          return 'border-pink-500';
        default:
          return 'border-gray-300';
      }
    }
    return 'border-gray-300';
  };

  return (
    <>
      {isPendingGetOrderByUserId ? (
        <OrderCardSkeleton />
      ) : (
        <>
          {data.length === 0 ? (
            <div className='text-center font-bold text-2xl h-50 content-center'>
              Chưa có đơn hàng nào
            </div>
          ) : (
            <div className='flex flex-col gap-6'>
              {data.map((item) => (
                <div key={item.id}>
                  <div className='bg-[#f3efef]'>
                    <div className='border-b-[1px] border-dotted p-5'>
                      <section className=''>
                        <div className="pb-4 border-b border-[#c0bfbf] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
                          <div className="flex-1">
                            Mã đơn hàng: <span className="font-bold">{item.code}</span>
                          </div>

                          {item.orderStatus === 3 ? (
                            <div className="flex flex-wrap gap-2 items-center justify-start sm:justify-end">
                              <div className="flex gap-1 text-green-600 items-center">
                                <TruckOutlined className="text-[16px]" />
                                <b>{item.orderStatusText}</b>
                              </div>
                              <div className="hidden sm:block bg-[#a1a0a0] w-[1px] h-5"></div>
                              <Link
                                to="/profile/feedback"
                                className="text-[#e12d2d] hover:cursor-pointer font-semibold"
                                state={{ item }}
                              >
                                ĐÁNH GIÁ
                              </Link>
                            </div>
                          ) : (
                            <div className="flex flex-wrap gap-2 items-center justify-start sm:justify-end">
                              <div className={`flex gap-1 items-center ${item.orderStatus === 4 ? "text-red-600" : "text-[#f29e04]"}`}>
                                <TruckOutlined className="text-[16px]" />
                                <b>{item.orderStatusText}</b>
                              </div>
                            </div>
                          )}
                        </div>

                      <div className='flex md:flex-row pt-4 gap-3 hover:cursor-pointer'
                        
                      >
                        <div className="flex-1">
                          <div className='flex flex-col gap-3 flex-1'
                          onClick={() => handleViewHistoryStatusOrder(item.id, item.code)}
                          >
                            {(showAll && showOrderId === item.code ? item.items : item.items.slice(0, 3)).map((i) => (
                              <div key={i.productCode} className='flex gap-2'>
                                <div className='border w-[100px] h-[100px] flex-shrink-0'>
                                  <img className='w-full h-full object-cover' src='/images/default.png' alt='LB' />
                                </div>
                                <div className='flex-1'>
                                  <p className='font-semibold'>{i.productName}</p>
                                  <p className='text-sm text-gray-600'>Mã sản phẩm: {i.productCode}</p>
                                  <p className='text-sm text-gray-600'>Số lượng: {i.quantity}</p>
                                </div>
                              </div>
                            ))}

                            
                          </div>
                          {item.items.length > 3 && (
                              <div>
                                {showAll && showOrderId === item.code ? (
                                  <button
                                    onClick={handleShowLess}
                                    className='text-blue-500 hover:underline text-sm cursor-pointer mt-5'
                                  >
                                    Thu gọn
                                  </button>
                                ) : (
                                  <button
                                    onClick={() => handleShowMore(item.code)}
                                    className='text-blue-500 hover:underline text-sm cursor-pointer mt-5'
                                  >
                                    Xem thêm
                                  </button>
                                )}
                                
                              </div>
                              
                          )}
                        </div>
                        <div className='w-full md:w-[200px] text-right flex flex-col justify-end'>
                          <span className='text-sm text-gray-400 line-through'>
                            {(
                              item.originMoney -
                              (item.originMoney * 10) / 100
                            ).toLocaleString()} VNĐ
                          </span>
                          <span className='text-red-600 font-bold text-lg'>
                            {item.originMoney.toLocaleString()} VNĐ
                          </span>
                        </div>
                      </div>

                      </section>
                    </div>
                  </div>
                  <div className='bg-gray-100 px-4 py-3 flex flex-col sm:flex-row justify-between items-center gap-4'>
                    <div className='justify-end'>
                      <span className='text-gray-600 text-sm'>Thành tiền:</span>
                      <span className='ml-2 text-xl font-bold text-red-600'>
                        {item.totalMoney.toLocaleString()} VNĐ
                      </span>
                    </div>
                    {/* <div className="flex justify-end">
                      <button className='bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600 transition justify-end'>
                        Mua lại
                      </button>
                    </div> */}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className='mt-10'>
            <Pagination
              align='center'
              current={page + 1}
              pageSize={size}
              onChange={(pageNumber, sizeNumber) => {
                  setPage(pageNumber - 1)
                  setSize(sizeNumber)
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }
              total={ResponseGetOrderByUserId?.data?.currentTotalElementsCount || 1}
            />
          </div>
        </>
      )}
      <Modal
        open={isOpenModalViewHistoryStatusOrder}
        onCancel={() => setIsOpenModalViewHistoryStatusOrder(false)}
        footer
        className='w-250!'
        title={
          <div>
            <h1 className='text-2xl font-bold pb-10'>Lịch sử trạng thái đơn hàng</h1>
            <p>Mã đơn hàng: <span className="font-bold">{isCodeOrder}</span></p>
          </div>
        }
      >
        {isPendingGetHistoryStatusOrder ? (
          <div className='text-center items-center content-center'>
            <Spin className='text-[100px]!' />
          </div>
        ) : (
          <div>
            {!ResponseGetHistoryStatusOrder ? (
              <div className='text-[16px] text-center content-center h-50'>
                Chưa có thông tin đơn hàng
              </div>
            ) : (
              <div className='relative w-full px-6 py-8 rounded-xl bg-white shadow-xl border border-gray-200'>
                <div className='grid grid-cols-1 sm:grid-cols-5 '>
                  {mappedStatusConfig.map((status, index) => {
                    const isDone = Boolean(status.time);
                    const isCurrent: boolean =
                      !status.time && !!mappedStatusConfig[index - 1]?.time;

                    return (
                      <div
                        key={status.key}
                        className='flex flex-col items-center relative text-center transition-all'
                      >
                        {/* Icon */}
                        <div
                          className={`w-20 h-20 rounded-full border-4 flex items-center justify-center shadow-md transition-all duration-300 bg-white
                                                ${getBorderColor(status.key, isDone, isCurrent)} 
                                                ${
                                                  isCurrent
                                                    ? 'scale-105 animate-pulse'
                                                    : isDone
                                                    ? 'scale-100'
                                                    : 'opacity-50'
                                                }
                                            `}
                        >
                          {status.icon}
                        </div>

                        {/* Label */}
                        <p
                          className={`mt-3 font-semibold text-sm sm:text-base ${
                            isDone
                              ? 'text-green-700'
                              : isCurrent
                              ? 'text-purple-600'
                              : 'text-gray-500'
                          }`}
                        >
                          {status.label}
                        </p>

                        {/* Thời gian */}
                        <div
                          className={`text-xs leading-tight mt-1 ${
                            isDone ? 'text-green-500' : 'text-gray-400'
                          }`}
                        >
                          {status.time ? (
                            (() => {
                              const [date, timeWithMicro] = status.time.split('T');
                              const [year, month, day] = date.split('-');
                              const time = timeWithMicro.split('.')[0];
                              return (
                                <>
                                  <div>{time}</div>
                                  <div>{`${day}/${month}/${year}`}</div>
                                </>
                              );
                            })()
                          ) : (
                            <>
                              <div>--:--:--</div>
                              <div>--/--/----</div>
                            </>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </Modal>
    </>
  );
};
export default OrderCard;
