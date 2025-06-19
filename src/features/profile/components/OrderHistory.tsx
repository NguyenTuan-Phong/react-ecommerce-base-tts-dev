import { useState } from "react"
import { Link, Outlet} from "react-router-dom"

const OrderHistory = () => {
    const [activeTab, setactiveTab] = useState(0);

    return(
        <div className="flex flex-col gap-5">
            <nav className="grid grid-cols-5 bg-[white] text-center font-bold ">
                <Link key={0} to={''} className={`h-12! content-center! ${activeTab === 0 ? 'text-[red]! border-b-2 border-[red]' : 'text-[black]!' } `}
                onClick={() => setactiveTab(0)} 
                >
                    Tất Cả
                </Link>
                <Link key={1} to={''} className={`h-12! content-center! ${activeTab === 1 ? 'text-[red]! border-b-2 border-[red]' : 'text-[black]!' }`}
                onClick={() => setactiveTab(1)}
                >
                    Vận chuyển
                </Link>
                <Link key={2} to={''} className={`h-12! content-center! ${activeTab === 2 ? 'text-[red]! border-b-2 border-[red]' : 'text-[black]!' }`}
                onClick={() => setactiveTab(2)}
                >
                    Chờ giao hàng
                </Link>
                <Link key={3} to={''} className={`h-12! content-center! ${activeTab === 3 ? 'text-[red]! border-b-2 border-[red]' : 'text-[black]!' }`}
                onClick={() => setactiveTab(3)}
                >
                    Hoàn Thành
                </Link>
                <Link key={4} to={''} className={`h-12! content-center! ${activeTab === 4 ? 'text-[red]! border-b-2 border-[red]' : 'text-[black]!' }`}
                onClick={() => setactiveTab(4)}
                >
                    Đã Hủy
                </Link>
            </nav>
            <div>
                <Outlet/>
            </div>
        </div>
    )
}
export default OrderHistory 