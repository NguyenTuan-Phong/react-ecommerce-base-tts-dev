import { 
    EnvironmentOutlined,
    MailOutlined,
    SendOutlined,
    PhoneOutlined
} from '@ant-design/icons';
import FooterContent from '../../features/news/components/FooterContent';

const LayoutFooter = () => {
    return (
        <div className='flex flex-col gap-4'>
            <FooterContent />

            <footer style={{ background: "#f8f8f8", fontFamily: "sans-serif", fontSize: 15 }}>
                <div style={{ background: "#22a085", color: "#fff",  padding:'0 10px 0 10px' }}>
                    <div style={{display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <div style={{flex : 1}}></div>
                        <div style={{ display: "flex", alignItems: "center", gap: 16,flex : 2, paddingRight : 20}}>
                            <div style={{display : 'flex' , gap : 8, alignItems : 'center'}}>
                                <b style={{fontSize : 100}}><MailOutlined/></b>
                                <div>
                                    <div style={{ fontWeight: 700, fontSize: 28 }}>NHẬN TIN KHUYẾN MÃI</div>
                                    <div>Bạn vui lòng để lại Email để nhận thông tin khuyến mãi từ Lắc Đầu</div>
                                </div>
                                
                            </div>
                        </div>
                        <form style={{ display: "flex", alignItems: "center", background: "#fff", borderRadius: 32, padding: 8, width: 400,flex : 2, margin : '0px 10px' }}>
                            <input
                                type="email"
                                placeholder="Nhập email đăng ký nhận tin khuyến mãi"
                                style={{ border: "none", outline: "none", flex: 1, padding: "12px 16px", borderRadius: 32, fontSize: 16, color: 'black' }}
                            />
                            <button type="submit" style={{ background: "#22a085", border: "none", borderRadius: "50%", width: 48, height: 48, color: "#fff", cursor: "pointer" }}>
                                <SendOutlined />
                            </button>
                        </form>
                        <div style={{flex : 1}}></div>
                    </div>
                </div>
                <div style={{background : 'white'}}>
                    <div style={{ maxWidth: 1400, margin: "0 auto", padding:'0 20px 0 20px', display: "flex", gap: 32 }}>
                        <div style={{ flex: 1 }}>
                            <div style={{ fontWeight: 700, fontSize: 22, marginBottom: 8 }}>LẮC ĐẦU</div>
                            <div style={{ marginBottom: 8, display : 'flex', gap:5 }}>
                                <p style={{color : 'green'}}><EnvironmentOutlined/></p> 66 Xã Đàn, Phường Phương Liên, Quận Đống Đa, Hà Nội
                            </div>
                            <div style={{ marginBottom: 8, display : 'flex', gap:5 }}>
                                <p style={{color : 'green'}}><PhoneOutlined /></p>0349296461
                            </div>
                            <div style={{ marginBottom: 8, display : 'flex', gap:5 }}>
                                <p style={{color : 'green'}}><MailOutlined/></p>lacdaushop@gmail.com
                            </div>
                        </div>
                        <div style={{ flex: 1 }}>
                            <div style={{ fontWeight: 700, marginBottom: 8 }}>HỖ TRỢ KHÁCH HÀNG</div>
                            <ul style={{ padding: 0, margin: 0, listStyle: "none" }}>
                                <li>• Hướng dẫn mua hàng trực tuyến</li>
                                <li>• Hướng dẫn thanh toán</li>
                                <li>• Góp ý, Khiếu Nại</li>
                            </ul>
                            
                        </div>
                        <div style={{ flex: 1 }}>
                            <div style={{ fontWeight: 700, marginBottom: 8 }}>CHÍNH SÁCH CHUNG</div>
                            <ul style={{ padding: 0, margin: 0, listStyle: "none" }}>
                                <li>• Chính sách, quy định chung</li>
                                <li>• Chính sách vận chuyển</li>
                                <li>• Chính sách bảo hành</li>
                                <li>• Chính sách đổi trả và hoàn tiền</li>
                                <li>• Chính sách xử lý khiếu nại</li>
                                <li>• Bảo mật thông tin khách hàng</li>
                            </ul>
                        </div>
                        <div style={{ flex: 1 }}>
                            <div style={{ fontWeight: 700, marginBottom: 8 }}>FANPAGE FACEBOOK</div>
                            <iframe
                                title="Fanpage Facebook"
                                src="https://www.facebook.com/lacdaustore?ref=embed_page"
                                width="250"
                                height="120"
                                style={{ border: "none", overflow: "hidden" }}
                            ></iframe>
                        </div>
                    </div>
                </div>
                <div>
                    <div style={{padding:'0 20px 0 20px', fontSize: 13, color: "#555", maxWidth : 1400, margin : '0 auto' }}>
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