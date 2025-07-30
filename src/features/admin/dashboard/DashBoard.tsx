import {
    UserOutlined,
    ShoppingCartOutlined,
    TransactionOutlined,
} from "@ant-design/icons"
import { LineChart } from './components/Chart.tsx';
import { BarChart } from './components/BarChart.tsx';

const DashBoard = () => {
    return(
        <div className="flex flex-col gap-5 flex-1 overflow-y-auto h-full">
            <div className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-8 px-5
            rounded-lg shadow-md flex flex-col items-center text-center">
                <p className="text-[40px]">✨✨✨</p>
                <h2 className="text-lg font-bold">Chào mừng, Admin!</h2>
                <p className="text-sm">Chúc bạn một ngày làm việc hiệu quả 🌟</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white border-gray-100 border p-6 rounded shadow-md flex items-cente  space-x-4 gap-3">
                    <UserOutlined className="w-10! h-10! text-blue-500! text-[40px]!" />
                    <div>
                        <p className="text-gray-500 text-sm">Người dùng</p>
                        <p className="text-xl font-bold">1,200</p>
                    </div>
                </div>
                <div className="bg-white border-gray-100 border p-6 rounded shadow-md flex items-center space-x-4 gap-3">
                    <ShoppingCartOutlined className="w-10! h-10! text-green-500! text-[40px]!" />
                    <div>
                        <p className="text-gray-500 text-sm">Đơn hàng</p>
                        <p className="text-xl font-bold">320</p>
                    </div>
                </div>
                <div className="bg-white border-gray-100 border p-6 rounded shadow-md flex items-center space-x-4 gap-3">
                    <TransactionOutlined className="w-10! h-10! text-yellow-500! text-[40px]!" />
                    <div>
                        <p className="text-gray-500 text-sm">Doanh thu</p>
                        <p className="text-xl font-bold">85,000,000 VNĐ</p>
                    </div>
                </div>
            </div>
            <div className="max-w-4xl w-full ml-0 mt-6 bg-white p-6 rounded shadow-md">
                <h3 className="text-lg font-bold mx-auto">Thống kê doanh thu</h3>
                <LineChart/>
            </div>  
            <div className="max-w-xl mt-6 bg-white p-6 rounded shadow-md">
                <h3 className="text-lg font-bold mb-4">Tỷ lệ doanh số</h3>
                <BarChart/>
            </div>  
        </div>  
    )
}
export default DashBoard