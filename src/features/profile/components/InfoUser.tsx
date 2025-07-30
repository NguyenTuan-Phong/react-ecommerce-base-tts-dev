import useUserStore from "../../../store/useUserStore";
import useInfoUser from "../hook/useInfoUser";
import { Form, Input, Modal, Button } from "antd";
// import { useEffect } from "react";
const  InfoUser = () => {
    const { 
        // isPending, 
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
    const dataUser = useUserStore((state) => state.user)

    return(
        <div className="w-full flex flex-col gap-8">
            <h1 className="text-center text-[20px] font-bold">Thông tin người dùng</h1>
            {/* {isPending ? (
                <Skeleton />
            ) : ( */}
                <div className="flex flex-col gap-4 text-[16px]">
            {/* Họ và tên */}
            <div className="flex flex-wrap items-center">
                <p className="w-full sm:w-40 font-bold">Họ và tên:</p>
                <p className="flex-1">{dataUser?.fullName}</p>
            </div>

            {/* Email + Button xác thực */}
            <div className="flex flex-wrap items-center gap-2">
                <div className="flex flex-wrap items-center flex-1">
                <p className="w-full sm:w-40 font-bold">Email:</p>
                <p className="flex-1">{dataUser?.email}</p>
                </div>
                {dataUser?.statusUser === 2 && dataUser?.email && (
                <Button className="h-10" onClick={showModalSendOTPVerifyAccount}>
                    Xác thực người dùng
                </Button>
                )}
            </div>

            {/* Số điện thoại */}
            <div className="flex flex-wrap items-center">
                <p className="w-full sm:w-40 font-bold">Số điện thoại:</p>
                <p className="flex-1">{dataUser?.phoneNumber}</p>
            </div>

            {/* Địa chỉ */}
            <div className="flex flex-wrap items-center">
                <p className="w-full sm:w-40 font-bold">Address:</p>
                <p className="flex-1">{dataUser?.address}</p>
            </div>

            {/* Ngày sinh */}
            <div className="flex flex-wrap items-center">
                <p className="w-full sm:w-40 font-bold">DateOfBirth:</p>
                <p className="flex-1">{dataUser?.dateOfBirth}</p>
            </div>

            {/* Trạng thái tài khoản */}
            <div className="flex flex-wrap items-center font-bold gap-2">
                <p className="w-full sm:w-40">Trạng thái tài khoản:</p>
                <p
                className={`flex-1 ${
                    dataUser?.statusUser === 0
                    ? "text-green-600"
                    : dataUser?.statusUser === 1
                    ? "text-red-600"
                    : "text-blue-600"
                }`}
                >
                {dataUser?.statusUser === 0
                    ? "Đang hoạt động"
                    : dataUser?.statusUser === 1
                    ? "Không hoạt động"
                    : "Chờ xác thực"}
                </p>
            </div>
            </div>

            {/* )} */}

            <Modal
            title={<h1 className="font-bold pb-5">Xác thực tài khoản</h1>}
            footer
            open={isOpenModalSendOTPVerifyAccount}
            >
                <Form 
                onFinish={sendOTPVerifyAccount}
                layout="vertical"
                initialValues={{
                    email: dataUser?.email
                }}
                >
                    <div className="flex flex-wrap  gap-1 sm:gap-2">

                    <div className="flex-1 min-w-0 w-full">
                        <Form.Item
                        name="email"
                        label="Email"
                        className="m-0"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng nhập email mà bạn đăng ký tài khoản",
                            },
                            {
                                type: "email",
                                message: "Email không hợp lệ.",
                            },
                        ]}
                        >
                        <Input
                            id="email"
                            className="w-full! p-3!"
                            placeholder="Nhập email đăng ký tài khoản của bạn"
                        />
                        </Form.Item>
                    </div>
                    </div>

                    <div className="flex justify-end gap-5">
                        <Form.Item>
                            <Button className="h-10! w-20! bg-[red]! text-[white]!" onClick={cancelModalSendOTPVerifyAccount}>
                                Cancel
                            </Button>
                        </Form.Item>
                        <Form.Item className="">
                            <Button 
                            loading={isPendingSendOTPVerifyAccount} 
                            className="h-10! w-20! bg-[green]! text-[white]! "  
                            htmlType="submit">
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
                    email: dataUser?.email
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
                            placeholder="Nhập mã OTP "/>
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