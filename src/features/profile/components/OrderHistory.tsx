import { useState } from "react"
import { Link, Outlet} from "react-router-dom"

const OrderHistory = () => {
    const [activeTab, setactiveTab] = useState(0);

    return(
        <div className="flex flex-col gap-5">
            <nav className="grid grid-cols-6 bg-[white] text-center font-bold ">
                <Link key={0} to={''} className={`h-12! content-center! ${activeTab === 0 ? 'text-[red]! border-b-2 border-[red]' : 'text-[black]!' } `}
                onClick={() => setactiveTab(0)} 
                >
                    Tất Cả
                </Link>
                <Link key={1} to={`status/${0}`} className={`h-12! content-center! ${activeTab === 1 ? 'text-[red]! border-b-2 border-[red]' : 'text-[black]!' }`}
                onClick={() => setactiveTab(1)}
                >
                    Chờ xác nhận
                </Link>
                <Link key={2} to={`status/${1}`} className={`h-12! content-center! ${activeTab === 2 ? 'text-[red]! border-b-2 border-[red]' : 'text-[black]!' }`}
                onClick={() => setactiveTab(2)}
                >
                    Đang vận chuyển
                </Link>
                <Link key={3} to={`status/${2}`} className={`h-12! content-center! ${activeTab === 3 ? 'text-[red]! border-b-2 border-[red]' : 'text-[black]!' }`}
                onClick={() => setactiveTab(3)}
                >
                    Đang giao
                </Link>
                <Link key={4} to={`status/${3}`} className={`h-12! content-center! ${activeTab === 4 ? 'text-[red]! border-b-2 border-[red]' : 'text-[black]!' }`}
                onClick={() => setactiveTab(4)}
                >
                    Hoàn thành
                </Link>
                <Link key={5} to={`status/${4}`} className={`h-12! content-center! ${activeTab === 5 ? 'text-[red]! border-b-2 border-[red]' : 'text-[black]!' }`}
                onClick={() => setactiveTab(5)}
                >
                    Đã hủy
                </Link>
            </nav>
            <div>
                <Outlet/>

            </div>
        </div>
    )
}
export default OrderHistory 