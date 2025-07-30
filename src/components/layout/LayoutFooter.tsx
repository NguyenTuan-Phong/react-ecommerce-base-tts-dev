import { 
    EnvironmentOutlined,
    MailOutlined,
    SendOutlined,
    PhoneOutlined
} from '@ant-design/icons';
import FooterContent from '../../features/news/components/FooterContent';
import useUserStore from '../../store/useUserStore';

const LayoutFooter = () => {
    const role = useUserStore((state) => state.user?.role.name)
    return (
        <div className='flex flex-col gap-4 overflow-x-hidden'>
            {role !== "ROLE_MANAGER" && <FooterContent /> }

            <footer className='bg-[#f8f8f8] text-[15px]'>
                <div className='bg-[#22a085] text-[#fff] px-[10px]'
                >
                    <div className="max-w-[1400px] mx-auto flex items-center justify-between flex-wrap">
                        <div className="flex items-center gap-4 flex-[2] pr-5">
                            <div className='flex gap-2 items-center'>
                                <b className='text-[100px]'><MailOutlined/></b>
                                <div>
                                    <div className='font-bold text-[28px]'>NHẬN TIN KHUYẾN MÃI</div>
                                    <div>Bạn vui lòng để lại Email để nhận thông tin khuyến mãi từ Lắc Đầu</div>
                                </div>
                                
                            </div>
                        </div>
                        <form className="flex items-center bg-white rounded-[32px] p-2 w-[400px] flex-[2] mx-[10px] mb-2">
                            <input
                                type="email"
                                placeholder="Nhập email đăng ký nhận tin khuyến mãi"
                                className="border-none outline-none flex-1 px-4 py-3 rounded-[32px] text-base text-black"
                            />
                            <button type="submit" className="bg-[#22a085]! border-none rounded-full w-12 h-12 text-white cursor-pointer">
                                <SendOutlined />
                            </button>
                        </form>
                    </div>
                </div>
                <div className='bg-[white] px-2'>
                    <div className={`${role === "ROLE_MANAGER" ? "" : "max-w-[1400px]"} mx-auto flex gap-8 py-4 flex-wrap`}>
                        <div >
                            <div className="font-bold text-[22px] mb-2">LẮC ĐẦU</div>
                            <div className='gap-[5px] flex mb-2'>
                                <p className='text-[green]!'><EnvironmentOutlined/></p> 66 Xã Đàn, Phường Phương Liên, Quận Đống Đa, Hà Nội
                            </div>
                            <div className='gap-[5px] flex mb-2'>
                                <p className='text-[green]!'><PhoneOutlined /></p>0349296461
                            </div>
                            <div className='gap-[5px] flex mb-2'>
                                <p className='text-[green]!'><MailOutlined/></p>lacdaushop@gmail.com
                            </div>
                        </div>
                        <div>
                            <div className="font-bold mb-2">HỖ TRỢ KHÁCH HÀNG</div>
                            <ul className="p-0 m-0 list-none">
                                <li>• Hướng dẫn mua hàng trực tuyến</li>
                                <li>• Hướng dẫn thanh toán</li>
                                <li>• Góp ý, Khiếu Nại</li>
                            </ul>
                            
                        </div>
                        <div>
                            <div className='mb-2 font-bold'>CHÍNH SÁCH CHUNG</div>
                            <ul className="p-0 m-0 list-none">
                                <li>• Chính sách, quy định chung</li>
                                <li>• Chính sách vận chuyển</li>
                                <li>• Chính sách bảo hành</li>
                                <li>• Chính sách đổi trả và hoàn tiền</li>
                                <li>• Chính sách xử lý khiếu nại</li>
                                <li>• Bảo mật thông tin khách hàng</li>
                            </ul>
                        </div>
                        <div>
                            <div className='mb-2 font-bold'>FANPAGE FACEBOOK</div>
                            <img src="/images/default.png" alt="LOGO" 
                            className='w-[250px] h-[120px]'
                            />
                        </div>
                    </div>
                </div>
                <div>
                    <div className={`${role === "ROLE_MANAGER" ? "" : "max-w-[1400px]"} text-[13px] text-[#555] mx-auto py-4 px-2`}

                    >
                        Công ty trách nhiệm hữu hạn MAGITECH<br />
                        Địa chỉ : Thôn Yên Ngưu, Xã Tam Hiệp, Huyện Thanh Trì, Thành phố Hà Nội, Việt Nam<br />
                        Chủ sở hữu: Hoàng Vĩnh Phúc<br />
                        Mã số thuế: 8714045794 do Chi cục Thuế Quận Thanh Xuân quản lý - Cấp ngày 07/10/2021<br />
                        Giấy chứng nhận Đăng ký Kinh doanh số 0109583374 do Sở KHĐT Tp.Hà Nội cấp ngày 07/04/2021
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LayoutFooter;