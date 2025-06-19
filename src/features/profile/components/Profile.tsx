import { Link, Outlet } from "react-router-dom"
import { toast } from "react-toastify";
import useUserStore from "../../../store/useUserStore";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const { logout } = useUserStore();
    const navigate = useNavigate();
    const handleLogout = () => {
        logout();
        toast.success("Đăng xuất thành công!");
        navigate('/');
    }
    return(
        <div className="flex flex-col max-w-[1400px] mx-auto py-5 gap-5">
            <div className="flex gap-5">
                <Link to={'/'}>TRANG CHỦ</Link>
                <div>/</div>
                <Link to={'/profile'}>TÀI KHOẢN</Link>
            </div>
            
            <div className="flex gap-5 bg-[white] py-8 px-4">
                <section className="flex-1 flex flex-col gap-5">
                    <div className="flex flex-col gap-2">
                        <p className="font-[800] text-xl">Đơn hàng đặt mua</p>
                        <Link to={'order-history'}
                        className="h-12! text-[white]! text-center! bg-[#6c757d]! w-full flex-1 py-3
                        hover:bg-[#29A07E]!">Danh sách đơn hàng</Link>
                    </div>
                    <div className="flex flex-col gap-2">
                        <p className="font-[800] text-xl">Thông tin tài khoản</p>
                        <Link to={'info-user'} className="h-12! text-[white]! text-center! bg-[#6c757d]! w-full flex-1 py-3
                        hover:bg-[#29A07E]!">
                            Thông tin cá nhân
                        </Link>
                            <Link to={'change-password'} className="h-10 text-[white]! text-center! bg-[#6c757d]! w-full flex-1 py-3
                        hover:bg-[#29A07E]!">
                            Thay đổi mật khẩu
                        </Link>
                    </div>
                    <button className="bg-[#f23c3cde] text-[white] py-3 px-5 hover:cursor-pointer hover:bg-[#f23c3c]"
                    onClick={handleLogout}
                    >
                        Logout
                    </button>
                </section>
                <section className="flex-3 px-10">
                    <Outlet />
                </section>
            </div>
            
        </div>
    )
}

export default Profile