import OrderCardSkeleton from "./OrderCardSkeleton";
import {
    TruckOutlined
} from "@ant-design/icons"
import { Link, useParams } from "react-router-dom";
import { useGetHistoryStatusOrder } from "../hook/useGetHistoryStatusOrder";
import { useEffect, useState } from "react";
import { Modal, Pagination, Spin } from "antd";
import { STATUS_CONFIG } from "../enum/enumStatusOrder";
import { useGetOrderByUserId } from "../hook/useGetOrderByUserId";
const ListOrderByStatus = () => {
    const [page, setPage] = useState(0)
    const size = 5
    const { statusCode } = useParams();
    const status = Number(statusCode);
    const [showAll, setShowAll] = useState(false);
    const [showOrderId, setShowOrderId] = useState<string | null>(null);    
    
    const {
        isPendingGetOrderByUserId,
        ResponseGetOrderByUserId
    } = useGetOrderByUserId(page, size, status);
    const data = ResponseGetOrderByUserId?.data.content || []
    const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
    const [isCodeOrder, setIsCodeOrder] = useState<string | null>(null);
    const { isPendingGetHistoryStatusOrder, ResponseGetHistoryStatusOrder } =
        useGetHistoryStatusOrder(selectedOrderId);
    
    const [isOpenModalViewHistoryStatusOrder, setIsOpenModalViewHistoryStatusOrder] = useState(false);
    
    const handleViewHistoryStatusOrder = (id: string, code:  string) => {
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

    useEffect(() => {
        setPage(0)
    },[status])
    
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
    const handleShowMore = (code: string) => {
        setShowOrderId(code)
        setShowAll(true)
    }

    const handleShowLess = () => {
        setShowAll(false)
    }
    
    return(
        <>
            {isPendingGetOrderByUserId ? (
                <OrderCardSkeleton />

            ) : (
                <>
                    {data.length === 0 ? (
                        <div className="text-center font-bold text-2xl h-50 content-center">
                            Chưa có đơn hàng nào
                        </div>
                    ) : (
                        <div className="flex flex-col gap-6">
                        {data.map((item) => (
                            <div key={item.id}>
                                <div className="bg-[#f3efef]">
                                    <div className="border-b-[1px] border-dotted p-5 hover:cursor-pointer">
                                        <section className="">
                                            <div className="pb-4 border-b border-[#c0bfbf] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
                                            {/* Mã đơn hàng */}
                                            <div className="flex-1 text-sm">
                                                Mã đơn hàng: <span className="font-bold">{item.code}</span>
                                            </div>

                                            {/* Trạng thái đơn hàng + link đánh giá */}
                                            {item.orderStatus === 3 ? (
                                                <section className="flex flex-wrap gap-2 items-center justify-start sm:justify-end text-sm">
                                                    <div className="flex gap-1 text-green-600 items-center">
                                                        <TruckOutlined className="text-[16px]" />
                                                        <b>{item.orderStatusText}</b>
                                                    </div>
                                                    <div className="w-[1px] h-5 bg-[#a1a0a0]"></div>
                                                    <Link
                                                        to="/profile/feedback"
                                                        className="text-[#e12d2d] hover:cursor-pointer font-semibold"
                                                        state={{ item }}
                                                    >
                                                        ĐÁNH GIÁ
                                                    </Link>
                                                </section>
                                            ) : (
                                                <section className="flex gap-2 sm:gap-4 justify-start sm:justify-end text-sm">
                                                <div className="flex gap-1 items-center text-[#f29e04]">
                                                    <TruckOutlined className="text-[16px]" />
                                                    <b
                                                    className={`${
                                                        item.orderStatus === 4 ? "text-[red]" : "text-[#f29e04]"
                                                    }`}
                                                    >
                                                    {item.orderStatusText}
                                                    </b>
                                                </div>
                                                </section>
                                            )}
                                            </div>

                                            <div className="flex flex-col sm:flex-row pt-4 gap-4">
                                            {/* Danh sách sản phẩm */}
                                            <div className="flex-1">
                                                <div
                                                    className="flex flex-col flex-1 gap-2 cursor-pointer"
                                                    onClick={() => handleViewHistoryStatusOrder(item.id, item.code)}
                                                >
                                                    {(showAll && showOrderId === item.code ? item.items : item.items.slice(0, 3)).map((i) => (
                                                    <div key={i.productCode} className="flex gap-2">
                                                        <section>
                                                        <img className="w-[80px] h-[80px] object-cover" src="/images/default.png" alt="LB" />
                                                        </section>
                                                        <section className="flex-1">
                                                        <div className="flex flex-col gap-1 sm:gap-3">
                                                            <b>{i.productName}</b>
                                                            <p className="text-sm text-gray-700">Mã sản phẩm: {i.productCode}</p>
                                                            <p className="text-sm text-gray-700">Số lượng: {i.quantity}</p>
                                                        </div>
                                                        </section>
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

                                            {/* Tổng tiền */}
                                            <section className="sm:w-[200px] w-full text-end flex flex-col justify-end items-end gap-1 sm:gap-2">
                                                <span className="text-[12px] text-gray-500 line-through">
                                                    {(item.originMoney - item.originMoney * 10 / 100).toLocaleString()} VNĐ
                                                </span>
                                                <span className="text-[red] font-bold text-[18px]">
                                                    {item.originMoney.toLocaleString()} VNĐ
                                                </span>
                                            </section>
                                            </div>

                                        </section>
                                    </div>
                                </div>
                                <div className="bg-[#dedcdc]">
                                    <div className="p-5">
                                        <section className="">
                                            <div className="flex gap-4 py-3 justify-end">
                                                <b className="content-end">Thành tiền: </b>
                                                <b className="text-[20px]">{item.totalMoney.toLocaleString()} VNĐ</b>
                                            </div>
                                            {/* <div className="flex justify-end">
                                                <button className="bg-[#ee4d2d] text-[white] px-7 py-3 rounded-[3px] hover:cursor-pointer">Mua lại</button>
                                            </div> */}
                                        </section>
                                    </div>
                                </div>
                            </div>
                        ))}
                            
                        </div>
                    )}
                    {data.length > 5 &&
                        <div className="mt-5">
                            <Pagination
                                align="center"
                                current={page + 1}
                                pageSize={size}
                                onChange={(pageNumber) => {
                                        setPage(pageNumber - 1)
                                        window.scrollTo({ top: 0, behavior: "smooth" });
                                    }
                                }
                                total={ResponseGetOrderByUserId?.data.currentTotalElementsCount}
                            />
                        </div>
                    }
                    
                </>
            )

            }
            <Modal
                open={isOpenModalViewHistoryStatusOrder}
                onCancel={() => setIsOpenModalViewHistoryStatusOrder(false)}
                footer
                className='w-250!'
                title={
                    <div>
                        <h1 className='text-2xl font-bold pb-10'>Lịch sử trạng thái đơn hàng</h1>
                        <b>Mã đơn hàng: <span>{isCodeOrder}</span></b>
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
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6'>
                    {mappedStatusConfig.map((status, index) => {
                        const isDone = Boolean(status.time);
                        const isCurrent: boolean = !status.time && !!mappedStatusConfig[index - 1]?.time;

                        return (
                        <div key={status.key} className='flex flex-col items-center text-center'>
                            <div
                            className={`w-16 h-16 rounded-full border-4 flex items-center justify-center
                                ${getBorderColor(status.key, isDone, isCurrent)}
                                ${isCurrent ? 'animate-pulse' : isDone ? '' : 'opacity-50'}
                            `}
                            >
                            {status.icon}
                            </div>
                            <p className={`mt-2 text-sm font-semibold ${isDone ? 'text-green-700' : isCurrent ? 'text-orange-500' : 'text-gray-400'}`}>
                            {status.label}
                            </p>
                            <p className={`text-xs mt-1 ${isDone ? 'text-green-500' : 'text-gray-400'}`}>
                            {status.time ? (
                                <>
                                <div>{status.time.split('T')[1].split('.')[0]}</div>
                                <div>{new Date(status.time).toLocaleDateString('vi-VN')}</div>
                                </>
                            ) : (
                                <>
                                <div>--:--:--</div>
                                <div>--/--/----</div>
                                </>
                            )}
                            </p>
                        </div>
                        );
                    })}
                    </div>

                    )}
                </div>
                )}
            </Modal>
        </>
    )
}

export default ListOrderByStatus;