import { Link, Outlet } from "react-router-dom"
import { toast } from "react-toastify";
import useUserStore from "../../../store/useUserStore";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const { logout } = useUserStore();
    const navigate = useNavigate();
    const role = useUserStore((state) => state.user?.role.name)
    const handleLogout = () => {
        logout();
        toast.success("Đăng xuất thành công!");
        if(role === "ROLE_MANAGER") {
            navigate('/admin/login');
            return;
        }
        navigate('/');
    }
    return(
        <div className="flex flex-col max-w-[1600px] mx-auto py-5 gap-5 px-4">
        <div className="flex gap-2 text-sm sm:text-base">
            {role === "ROLE_MANAGER" ? (
                <Link to={'/dashboard'} className="text-blue-600 hover:underline">DASHBOARD</Link>
                ) : (
                <Link to={'/'} className="link">TRANG CHỦ</Link>
            )}
            <span className='section-text'>/</span>
            <Link to={'/profile'} className="link">TÀI KHOẢN</Link>
        </div>

        <div className="flex flex-col md:flex-row gap-5 bg-white py-6 px-4 rounded-lg shadow-sm">
            
            <section className="w-full md:w-[280px] flex flex-col gap-5">
                {role !== "ROLE_MANAGER" && (
                    <div className="flex flex-col gap-2">
                        <p className="font-bold text-lg">Đơn hàng đặt mua</p>
                        <Link 
                        to={'order-history'}
                        className="h-12! text-[white]! text-center! bg-[#6c757d]! w-full! flex-1! p-3!
                        hover:bg-[#29A07E]!">
                            Danh sách đơn hàng
                        </Link>
                    </div>
                )}

                <div className="flex flex-col gap-2">
                    <p className="font-bold text-lg">Thông tin tài khoản</p>
                    <Link 
                        to={'info-user'} 
                        className="h-12! text-[white]! text-center! bg-[#6c757d]! w-full flex-1 py-3!
                                hover:bg-[#29A07E]!">
                        Thông tin cá nhân
                    </Link>
                    <Link 
                        to={'change-password'} 
                        className="h-12! text-[white]! text-center! bg-[#6c757d]! w-full flex-1 py-3! hover:bg-[#29A07E]!">
                        Thay đổi mật khẩu
                    </Link>
                </div>

                <button
                    className="bg-[#f23c3cde] text-white py-3 px-5 rounded hover:bg-[#f23c3c] transition cursor-pointer"
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </section>

            
            <section className="flex-1 border-t border-t-gray pt-5 border-dotted sm:border-none sm:pt-0">
                <Outlet />
            </section>
        </div>
        </div>

    )
}

export default Profile