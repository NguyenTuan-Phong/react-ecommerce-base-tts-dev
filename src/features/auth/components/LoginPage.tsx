import { Link } from "react-router-dom";
import { Form, Input, Button } from "antd";
import { useLogin } from "../hook/useLogin";
const LoginPage = () => {
    const {isPending, handleLogin} = useLogin();

    return(
        <div className="">
            <div className="flex gap-3 max-w-[1400px] mx-auto py-5">
                <Link to={'/'}>TRANG CHỦ</Link>
                <p>/</p>
                <Link to={'/login'}>ĐĂNG NHẬP TÀI KHOẢN</Link>
            </div>
            <div className="py-4">
                <div className="md:flex max-w-[1400px] mx-auto gap-5 bg-[white] p-5">
                    <section className="flex-1 flex flex-col gap-3 text-[16px]">
                        <b>Thông tin khách hàng đăng nhập</b>
                        <Form
                            name="form_login"
                            onFinish={handleLogin}
                        >   
                            <div className="flex">
                                <p className="text-[16px] w-[180px] pt-2">Email đăng nhập</p>
                                <Form.Item
                                    name="email"
                                    className="flex-1"
                                    rules={[
                                        {
                                            required : true,
                                            message: "Vui lòng nhập Email!",
                                        },
                                        {
                                            type: "email",
                                            message: "Email không hợp lệ"
                                        }
                                    ]}
                                >
                                    <Input style={{height: 48}} placeholder="Vui lòng nhập Email"/>
                                </Form.Item>
                            </div>
                            
                            <div className="flex">
                                <p className="text-[16px] w-[180px] pt-2">Mật khẩu</p>
                                <Form.Item
                                    name="password"
                                    className="flex-1"
                                    rules={[
                                        {
                                            required : true, message: "Vui lòng nhập Mật khẩu!",
                                        }
                                    ]}
                                >
                                    <Input.Password style={{height: 48}} placeholder="Vui lòng nhập Mật khẩu"/>
                                </Form.Item>
                            </div>
                            <div className="flex">
                                <div className="w-[180px]"></div>
                                <Form.Item className="flex-1">
                                    <Button loading={isPending} htmlType="submit" style={{height : 48,width : 150, background : '#29A07E', fontSize: '16px', color : 'white'}}>
                                        {isPending ? "Đang đăng nhập" : "Đăng nhập"}
                                    </Button>
                                    <Link style={{paddingLeft: 20}} to={'/forget'}>Quên mật khẩu ?</Link>
                                </Form.Item>
                            </div>
                            
                        </Form>
                    </section>
                    <section className="flex-1 gap-3 flex flex-col text-[16px]">
                        <b>Bạn chưa là thành viên ?</b>
                        <p>Đăng ký là thành viên để hưởng nhiều lợi ích và đặt mua hàng dễ dàng hơn.</p>
                        <Link to={'/register'}>Đăng ký tài khoản</Link>
                    </section>
                </div>
            </div>
        </div>
    )
}
export default LoginPage;