import {
    ShoppingCartOutlined,
    TransactionOutlined,
} from "@ant-design/icons"
import { useDashBoardRevenueSales } from "../hook/useDashBoardRevenueSales"
import SVGProduct from "../../../../components/svg/SVGProduct"
const RevenueSales = () => {

    const now  = new Date
    const year = now.getFullYear()
    const month = now.getMonth() + 1
    
    const {
        // isLoadingDashBoardRevenueSales,
        ResponseDataDashBoardRevenueSales
    } = useDashBoardRevenueSales(year, month)

    const data = ResponseDataDashBoardRevenueSales || []

    return(
        <div className="flex flex-col gap-5">
            <section>
                <h2 className="font-bold text-lg">Doanh thu hiện tại tháng {month}</h2>
            </section>
            <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white border-gray-100 border p-6 rounded shadow-md flex items-center space-x-4 gap-3">
                    <TransactionOutlined className="w-10! h-10! text-yellow-500! text-[40px]!" />
                    <div>
                        <p className="text-gray-500 text-sm">Doanh thu</p>
                        <p className="text-xl font-bold">{data.map(i => i.revenue).toLocaleString() || 0} VNĐ</p>
                    </div>
                </div>
                <div className="bg-white border-gray-100 border p-6 rounded shadow-md flex items-center space-x-4 gap-3">
                    <ShoppingCartOutlined className="w-10! h-10! text-green-500! text-[40px]!" />
                    <div>
                        <p className="text-gray-500 text-sm">Đơn hàng</p>
                        <p className="text-xl font-bold">
                            {data.map(i => i.orders.length) || 0}
                        </p>
                    </div>
                </div>
                <div className="bg-white border-gray-100 border p-6 rounded shadow-md flex items-center space-x-4 gap-3">
                    <SVGProduct className="w-10! h-10! text-blue-500! text-[40px]!"/>
                    <div>
                        <p className="text-gray-500 text-sm">Sản phẩm</p>
                        <p className="text-xl font-bold">{data.map(o => o.soldQuantity) || 0}</p>
                    </div>
                </div>
            </section>
        </div>
    )
}
export default RevenueSales