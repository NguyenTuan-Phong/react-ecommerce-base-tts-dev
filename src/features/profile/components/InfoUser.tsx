import useInfoUser from "../hook/useInfoUser";
import { Form, Input, Modal, Skeleton, Button } from "antd";
// import { useEffect } from "react";
const  InfoUser = () => {
    const { 
        isPending, 
        dataUser,
        sendOTPVerifyAccount,
        isOpenModalSendOTPVerifyAccount, 
        showModalSendOTPVerifyAccount, 
        isOpenModalVerifyAccount,
        verifyAccount,
        cancelModalSendOTPVerifyAccount,
        cancelModalVerifyAccount,
        isPendingVerifyAccount,
        isPendingSendOTPVerifyAccount
    } = useInfoUser(); 

    return(
        <div className="w-full flex flex-col gap-8">
            <h1 className="text-center text-[20px] font-bold">Thông tin người dùng</h1>
            {isPending ? (
                <Skeleton />
            ) : (
                <div className="flex flex-col gap-4">
                    <div className="flex text-[16px]">
                        <p className="w-50 font-bold">Họ và tên: </p>
                        {dataUser?.data?.fullName}
                    </div>
                    <div className="flex text-[16px] h-10">
                        <div className="flex-1 flex">
                            <p className="w-50 font-bold">Email: </p>
                            {dataUser?.data?.email}
                        </div>
                        {dataUser?.data.statusUser === 2 && dataUser?.data.email &&
                            <Button className="h-10! content-center" onClick={showModalSendOTPVerifyAccount}>
                                Xác thực người dùng
                            </Button>
                        }
                    </div>
                    <div className="flex text-[16px]">
                        <p className="w-50 font-bold">Số điện thoại: </p>
                        {dataUser?.data?.phoneNumber}
                    </div>
                    <div className="flex text-[16px]">
                        <p className="w-50 font-bold">Address: </p>
                        {dataUser?.data?.address}
                    </div>
                    <div className="flex text-[16px]">
                        <p className="w-50 font-bold">DateOfBirth: </p>
                        {dataUser?.data?.dateOfBirth}
                    </div>
                    <div className="flex content-center font-bold text-[16px]">
                        <p className="w-50 ">Trạng thái tài khoản: </p>
                        <p className={`text-[${dataUser?.data.statusUser === 0 ? "green" : dataUser?.data.statusUser === 1 ? "red" : "blue"}]`}>
                            {dataUser?.data.statusUser === 0 ? "Đang hoạt động" : dataUser?.data.statusUser === 1 ? "Không hoạt động" : "Chờ xác thực" }
                        </p>
                    </div>
                </div>
            )}

            <Modal
            title={<h1 className="font-bold pb-5">Xác thực tài khoản</h1>}
            footer
            open={isOpenModalSendOTPVerifyAccount}
            >
                <Form 
                onFinish={sendOTPVerifyAccount}

                initialValues={{
                    email: dataUser?.data.email
                }}
                >
                    <div className="flex gap-5">
                        <label className="w-25 pt-3" htmlFor="">Email</label>
                        <Form.Item className="flex-1!"
                            name="email"
                            rules={[
                                {
                                    required: true, message: "Vui lòng nhập email mà bạn đăng ksy tài khoản",
                                },
                                {
                                    type:"email", message: "Email không hợp lệ."
                                }
                            ]}
                        >
                            <Input className="flex-1! p-3!"
                            placeholder="Nhập email đăng ký tài khoản của bạn"/>
                        </Form.Item>
                    </div>
                    <div className="flex justify-end gap-5">
                        <Form.Item>
                            <Button className="h-10! w-20! bg-[red]! text-[white]!" onClick={cancelModalSendOTPVerifyAccount}>
                                Cancel
                            </Button>
                        </Form.Item>
                        <Form.Item className="">
                            <Button loading={isPendingSendOTPVerifyAccount} className="h-10! w-20! bg-[green]! text-[white]! "  htmlType="submit">
                                Gửi
                            </Button>
                        </Form.Item>
                    </div>
                    
                </Form>
            </Modal>

            <Modal
            title={<h1 className="font-bold pb-5">Xác thực tài khoản</h1>}
            footer
            open={isOpenModalVerifyAccount}
            >
                <Form 
                onFinish={verifyAccount}
                initialValues={{
                    email: dataUser?.data.email
                }}
                >
                    <div className="flex gap-5">
                        <label className="w-25 pt-3" htmlFor="">Email</label>
                        <Form.Item className="flex-1!"
                            name="email"
                            rules={[
                                {
                                    required: true, message: "Vui lòng nhập email mà bạn đăng ksy tài khoản",
                                },
                                {
                                    type:"email", message: "Email không hợp lệ."
                                }
                            ]}
                        >
                            <Input className="flex-1! p-3!"
                            placeholder="Nhập email đăng ký tài khoản của bạn"/>
                        </Form.Item>
                    </div>
                    <div className="flex gap-5">
                        <label className="w-25 pt-3" htmlFor="">OTP</label>
                        <Form.Item className="flex-1!"
                            name="otp"
                            rules={[
                                {
                                    required: true, message: "Vui lòng nhập mã OTP",
                                }
                            ]}
                        >
                            <Input maxLength={6} className="flex-1! p-3!"
                            placeholder="Nhập email đăng ký tài khoản của bạn"/>
                        </Form.Item>
                    </div>
                    <div className="flex justify-end gap-5">
                        <Form.Item>
                            <Button className="h-10! w-20! bg-[red]! text-[white]!" onClick={cancelModalVerifyAccount}>
                                Cancel
                            </Button>
                        </Form.Item>
                        <Form.Item className="">
                            <Button loading={isPendingVerifyAccount} className="h-10! w-20! bg-[green]! text-[white]!"  htmlType="submit">
                                Gửi
                            </Button>
                        </Form.Item>
                    </div>
                    
                </Form>
            </Modal>
        </div>
    )
}

export default InfoUser;