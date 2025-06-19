import { Link } from "react-router-dom"
import { Form, Input, Button, Modal} from "antd"
import useForget from "../hook/useForget"
const ForgetPage = () => {

    const { isPendingSendOTP, handleSendOTP, isOpenModal, 
        handleCancel, handleForGetPassword, isPendingForgetPassword} = useForget();
        
    return(
        <div>
            <div className="flex gap-3 max-w-[1400px] mx-auto py-5">
                <Link to={'/'}>TRANG CHỦ</Link>
                <p>/</p>
                <Link to={'/forget'}>LẤY LẠI MẬT KHẨU</Link>
            </div>
            <div className=" py-4">
                <div className="flex flex-col max-w-[1400px] mx-auto gap-5 bg-[white] p-5">
                    <h1 className="text-[24px] font-bold">Bạn quên mật khẩu vào tài khoản?</h1>
                    <p>Vui lòng nhập địa chỉ email đã đăng ký với chúng tôi để tạo mật khẩu mới. Chúng tôi sẽ gửi 1 email vào đại chỉ email cung cấp và yêu cầu xác minh trước khi có thể tạo mật khẩu mới.</p>
                    <Form className="flex-1"
                    onFinish={handleSendOTP}
                    name="form_forget"
                    >
                        <div className="flex">
                            <p className="w-[400px]">Nhập địa chỉ email đăng ký</p>
                            <Form.Item
                                name="email"
                                className="flex-1"
                                rules={[
                                    {
                                        required:true, message: "Vui lòng nhập địa chỉ email đăng ký."
                                    },
                                    {   
                                        type:"email", message: "Email không hợp lệ!"
                                    }

                                ]}
                            >
                                <Input style={{height: 48}} placeholder="Nhập địa chỉ email đăng ký" />
                            </Form.Item>
                        </div>
                        <div className="flex">
                            <div className="w-[400px]"></div>
                            <Form.Item>
                                <Button loading={isPendingSendOTP} htmlType="submit" style={{background: '#29A07E', color: 'white', height: 48, width: 200}}>
                                    LẤY MẬT KHẨU
                                </Button>
                            </Form.Item>
                        </div>
                        
                    </Form>
                </div>
            </div>
            <Modal
            title={"Đặt lại mật khẩu"}
            open={isOpenModal}
            footer
            >
                <Form
                onFinish={handleForGetPassword}
                >
                    <div className="flex">
                        <p className="w-[120px]">Nhập địa chỉ email tài khoản</p>
                        <Form.Item
                            name="email"
                            className="flex-1"
                            rules={[
                                {
                                    required:true, message: "Vui lòng nhập địa chỉ email tài khoản."
                                },
                                {   
                                    type:"email", message: "Email không hợp lệ!"
                                }

                            ]}
                        >
                            <Input style={{height: 48}} placeholder="Nhập địa chỉ email tài khoản." />
                        </Form.Item>
                    </div>
                    <div className="flex">
                        <p className="w-[120px]">Mã OTP</p>
                        <Form.Item
                            name="otp"
                            className="flex-1"
                            rules={[
                                {
                                    required:true, message: "Vui lòng nhập mã OTP!."
                                }

                            ]}
                        >
                            <Input maxLength={6} inputMode="numeric" style={{height: 48}} placeholder="Nhập địa mã OTP." />
                        </Form.Item>
                    </div>
                    <div className="flex">
                        <p className="w-[120px]">Nhập mật khẩu mới</p>
                        <Form.Item
                            name="newPassword"
                            className="flex-1"
                            rules={[
                                {
                                    required:true, message: "Vui lòng nhập mật khẩu mới."
                                },
                                {
                                    min: 8, message: "Mật khẩu ít nhất 8 ký tự!"
                                }
                            ]}
                        >
                            <Input.Password style={{height: 48}} placeholder="Nhập mật khẩu mới." />
                        </Form.Item>
                    </div>
                    <div className="flex">
                        <p className="w-[120px]">Nhập lại mật khẩu mới</p>
                        <Form.Item
                            name="confirmPassword"
                            dependencies={["newpassword"]}
                            className="flex-1"
                            rules={[
                                {
                                    required:true, message: "Vui lòng nhập lại mật khẩu mới!."
                                },
                                ({getFieldValue}) => ({
                                    validator(_, value) {
                                        if(!value || getFieldValue('newPassword') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('Mật khẩu không khớp!'));
                                    }
                                })
                            ]} 
                        >
                            <Input.Password style={{height: 48}} placeholder="Nhập đlại mật khẩu mới." />
                        </Form.Item>
                    </div>
                    <div className="flex gap-5 justify-end">
                        <Form.Item>
                            <Button className="h-10!" onClick={handleCancel}>Cancel</Button>
                        </Form.Item>
                        <Form.Item>
                            <Button loading={isPendingForgetPassword} className="h-10!" htmlType="submit">OK</Button>
                        </Form.Item>
                    </div>
                </Form>
            </Modal>
        </div>
    )
}
export default ForgetPage