import TableSkeleton from "../../../../components/skeleton/TableSkeleton";
import SVGAvatar from "../../../../components/svg/Avatar";
import { useDashBoardViewTableHistoryOrder } from "../hook/useDashBoardViewTableHistoryOrder";
import dayjs from "dayjs"
function TableHistoryOrder() {
    const limit = 10
    const {
        isLoadingDashBoardViewTableHistoryOrder,
        ResponseDashBoardViewTableHistoryOrder
    } = useDashBoardViewTableHistoryOrder(limit)

    const enums = [
        {
            status: 1,
            statusText: "Đang vận chuyển",
            color: "text-blue-500"
        },
        {
            status: 2,
            statusText: "Đang giao",
            color: "text-blue-800"
        },
        {
            status: 3,
            statusText: "Hoàn thành",
            color: "text-green-500"
        },
        {
            status: 4,
            statusText: "Đã hủy",
            color: "text-red-500"
        }
    ]

    const orders = ResponseDashBoardViewTableHistoryOrder || []
    return (
        <div className="">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">📦 Lịch sử đơn hàng gần nhất</h2>
            {isLoadingDashBoardViewTableHistoryOrder ? (
                <TableSkeleton />
            ) : (
                <div className="overflow-x-auto rounded-lg shadow">
                    <table className="min-w-full bg-white divide-y divide-gray-200">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">STT</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Avatar</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Tên tài khoản</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Trạng thái</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Giá</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Thời gian tạo</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {orders.map((order: any, index: any) => (
                                <tr key={order.id} className="hover:bg-gray-50">
                                    <td className="px-4 py-2 text-sm font-medium text-gray-800">{index + 1}</td>
                                    <td className="px-4 py-2">
                                        <SVGAvatar />
                                    </td>
                                    <td className="px-4 py-2 text-sm text-gray-700">{order.customerName}</td>
                                    <td className="px-4 py-2 text-sm text-gray-700">
                                        <div className="flex items-center gap-2">
                                            <b className={`${enums.find(c => c.status === order.status)?.color || ""}`}>
                                                {enums.find(i => i.status === order.status)?.statusText || "--"}
                                            </b>
                                        </div>
                                    </td>
                                    <td className="px-4 py-2 text-sm font-semibold text-red-500 text-start">
                                        {order.totalAmount.toLocaleString()} VNĐ
                                    </td>
                                    <td className="px-4 py-2 text-sm text-blue-600 font-medium">
                                        {dayjs(order.createdAt).format("DD/MM/YYYY HH:mm:ss")}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default TableHistoryOrder;