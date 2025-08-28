import { Input, Button, Form } from 'antd';
import { useLogin } from "../hook/useLogin";

const LoginAdmin = () => {
    const { isPending, handleLogin } = useLogin();

    return (
        <div className="p-20 mx-auto max-w-[1400px] flex justify-center bg-[#f0f4f8]">
            <div className="bg-white rounded-[20px] shadow-lg w-full max-w-[800px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2">
                <div className="overflow-hidden flex flex-col justify-center items-center w-full bg-[url('/images/bg_login_admin.png')] 
                bg-cover gap-2 rounded-t-[20px] sm:rounded-tr-[0px] py-3 lg:rounded-l-[20px]">
                    <img src="/images/logo.png" alt="LOGO" className='text-white w-40 h-30'  />
                    <p className='text-white'>Ecommerce Software for Enterprises</p>
                </div>
                <div className='px-10 py-15'>
                    <h2 className="text-[26px] font-semibold text-center text-gray-900 mb-4">Đăng nhập quản trị</h2>
                    <p className="text-center text-gray-500 mb-6">Xin chào, vui lòng nhập thông tin đăng nhập</p>

                    <Form name="login_form" onFinish={handleLogin}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm mb-2">Email</label>
                            <Form.Item
                                name="email"
                                rules={[
                                    { required: true, message: "Vui lòng nhập Email!" },
                                    { type: "email", message: "Email không hợp lệ" },
                                ]}
                            >
                                <Input
                                    placeholder="Vui lòng nhập Email"
                                    style={{ height: 48 }}
                                    className="border border-gray-300 rounded-md"
                                />
                            </Form.Item>
                        </div>

                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm mb-2">Mật khẩu</label>
                            <Form.Item
                                name="password"
                                rules={[{ required: true, message: "Vui lòng nhập Mật khẩu!" }]}
                            >
                                <Input.Password
                                    placeholder="Vui lòng nhập Mật khẩu"
                                    style={{ height: 48 }}
                                    className="border border-gray-300 rounded-md"
                                />
                            </Form.Item>
                        </div>

                        <div className="mb-6">
                            <Button
                                loading={isPending}
                                htmlType="submit"
                                style={{ height: 48, width: '100%', backgroundColor: '#fa7833', color: 'white', fontSize: '16px' }}
                                className="rounded-md"
                            >
                                {isPending ? "Đang đăng nhập" : "Đăng nhập"}
                            </Button>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default LoginAdmin;
