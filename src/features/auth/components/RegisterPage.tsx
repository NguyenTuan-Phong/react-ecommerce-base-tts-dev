import { Link } from "react-router-dom";
import { Form, Input, Select, Radio, Button } from "antd";
import { cities } from "../data/vietnamProvinces";
import { useRegister } from "../hook/useRegister";
const RegisterPage = () => {
    const {isPending, handleRegister} = useRegister();

    return(
        <div className="max-w-[1400px] mx-auto">
            <div className="flex gap-3 py-5 mb-2">
                <Link to={'/'}>TRANG CHỦ</Link>
                <p>/</p>
                <Link to={'/register'}>ĐĂNG KÝ TÀI KHOẢN THÀNH VIÊN</Link>
            </div>
            <div className="bg-[white] p-5 mb-5 border-b-[2px] border-blue-600">
                <Form
                name="form-register"
                onFinish={handleRegister}
                initialValues={{
                    gender: '0',
                    city:'Hà Nội'
                }}
                >
                    <p className="text-[24px] text-center mb-4">Tạo tài khoản khách hàng cá nhân</p>
                    <div className="flex max-w-[800px] mx-auto">
                        <p className="w-[180px] pt-3">Email đăng ký</p>
                        <Form.Item className="flex-1"
                        name="email"
                        rules={[
                            {
                                required: true, message: "Vui lòng nhập Email đăng ký",
                                type : 'email'
                            }
                        ]}
                        >
                            <Input style={{height:48}} placeholder="Nhập Email đăng ký." />
                        </Form.Item>
                    </div>
                    <div className="flex max-w-[800px] mx-auto">
                        <p className="w-[180px] pt-3">Tên</p>
                        <Form.Item className="flex-1"
                        name="fullName"
                        rules={[
                            {
                                required: true, message: "Vui lòng nhập tên"
                            }
                        ]}
                        >
                            <Input style={{height:48}} placeholder="Nhập tên." />
                        </Form.Item>
                    </div>
                    <div className="flex max-w-[800px] mx-auto">
                        <p className="w-[180px] pt-3">Số điện thoại</p>
                        <Form.Item className="flex-1"
                        name="phoneNumber"
                        rules={[
                            {
                                required: true, message: "Vui lòng nhập số điện thoại"
                            },
                            {
                                pattern : /^(0)[0-9]{9}$/,
                                message : "Số điện thoại không hợp lệ."
                            }
                        ]}
                        >
                            <Input style={{height:48}} placeholder="Nhập số điện thoại." />
                        </Form.Item>
                    </div>
                    <div className="flex max-w-[800px] mx-auto">
                        <p className="w-[180px] pt-3">Giới tính</p>
                        <Form.Item name="gender" className="flex-1"
                            rules={[{ required: true, message: "Vui lòng chọn giới tính" }]}
                        >
                            <Radio.Group>
                                <Radio value="0">Nam</Radio>
                                <Radio value="1">Nữ</Radio>
                            </Radio.Group>
                        </Form.Item>
                    </div>
                    <div className="flex max-w-[800px] mx-auto pb-[24px]">
                        <p className="w-[180px] pt-3">Ngày sinh</p>
                        <Form.Item className="flex-1 flex gap-3" style={{ marginBottom: 0 }}>
                            <Form.Item name="birthDay" rules={[{ required: true, message: "Chọn ngày" }]} noStyle>
                                <Select placeholder="- Ngày -" style={{ width: 100, height: 48 }}>
                                    {[...Array(31)].map((_, i) => (
                                        <Select.Option key={i + 1} value={i + 1}>{i + 1}</Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                            <Form.Item name="birthMonth" rules={[{ required: true, message: "Chọn tháng" }]} noStyle>
                                <Select placeholder="- Tháng -" style={{ width: 100, height: 48 }}>
                                    {[...Array(12)].map((_, i) => (
                                        <Select.Option key={i + 1} value={i + 1}>{i + 1}</Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                            <Form.Item name="birthYear" rules={[{ required: true, message: "Chọn năm" }]} noStyle>
                                <Select placeholder="Năm" style={{ width: 120, height: 48 }}>
                                    {Array.from({ length: 100 }, (_, i) => {
                                        const year = new Date().getFullYear() - i;
                                        return <Select.Option key={year} value={year}>{year}</Select.Option>;
                                    })}
                                </Select>
                            </Form.Item>
                        </Form.Item>
                    </div>
                    <div className="flex max-w-[800px] mx-auto">
                        <p className="w-[180px] pt-3">Mật khẩu</p>
                        <Form.Item className="flex-1"
                        name="password"
                        rules={[
                            {
                                required: true, message: "Vui lòng mật khẩu"
                            },
                            {
                                min: 8,
                                message: "Mật khẩu ít nhất gồm 8 ký tự"
                            }
                        ]}
                        >
                            <Input.Password style={{height:48}} placeholder="Nhập mật khẩu." />
                        </Form.Item>
                    </div>
                    <div className="flex max-w-[800px] mx-auto">
                        <p className="w-[180px] pt-3">Nhập lại mật khẩu</p>
                        <Form.Item className="flex-1"
                        name="re_password"
                        dependencies={['password']}
                        rules={[
                            {
                                required: true, message: "Vui lòng nhập lại mật khẩu"
                            },
                            ({ getFieldValue }) => ({

                                validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('Mật khẩu không khớp!'));
                                },
                            }),
                        ]}
                        >
                            <Input.Password style={{height:48}} placeholder="Nhập lại mật khẩu." />
                        </Form.Item>
                    </div>       
                    <div className="flex max-w-[800px] mx-auto">
                        <p className="w-[180px] pt-3">Tỉnh/TP</p>
                        <Form.Item className="flex-1"
                        name="city"
                        >
                            <Select placeholder="Chọn Tỉnh/TP" style={{ height: 48 }}>
                                {cities.map((city) => (
                                    <Select.Option key={city.id} value={city.name}>
                                    {city.name}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </div>
                    <div className="flex max-w-[800px] mx-auto">
                        <p className="w-[180px] pt-3">Địa chỉ</p>
                        <Form.Item className="flex-1"
                        name="address"
                        rules={[
                            {
                                required: true, message: "Vui lòng nhập địa chỉ"
                            }
                        ]}
                        >
                            <Input style={{height:48}} placeholder="Nhập địa chỉ." />
                        </Form.Item>
                    </div>
                    <div className="flex max-w-[800px] mx-auto">
                        <p className="w-[180px] pt-3"></p>
                        <Form.Item className="flex-1"
                        
                        >
                            <Button loading={isPending} style={{height:48,width:150,color:'white',fontSize:20, background: "#29A07E"}} htmlType="submit">
                                Đăng ký
                            </Button>
                        </Form.Item>
                    </div>

                </Form>
            </div>
        </div>
    )
}
export default RegisterPage;