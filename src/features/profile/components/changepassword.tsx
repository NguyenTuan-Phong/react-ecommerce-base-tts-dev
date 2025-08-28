import { Button, Form, Input } from "antd";
import { useChangePassword } from "../hook/useChangePassword";

const ChangePassword = () => {
    const [form] = Form.useForm();
    const {
        isPendingChangePassword,
        handleChangePassword
    } = useChangePassword(() => {
        form.resetFields();
    });

    return(
        <div className="flex flex-col gap-8 px-4">
        <h1 className="text-2xl font-bold text-center">Thay đổi mật khẩu</h1>
        <section>
            <div className="w-full max-w-xl mx-auto">
            <Form form={form} onFinish={handleChangePassword}>
                {/* Mật khẩu mới */}
                <div className="flex flex-wrap gap-2 sm:gap-5 mb-5">
                <label className="w-full sm:w-40 pt-2 font-medium">Mật khẩu mới</label>
                <div className="flex-1 min-w-0 w-full">
                    <Form.Item
                    name="newPassword"
                    className="m-0"
                    rules={[
                        {
                        required: true,
                        message: "Vui lòng nhập mật khẩu mới!",
                        },
                        {
                        min: 8,
                        message: "Mật khẩu phải có ít nhất 8 ký tự!",
                        },
                    ]}
                    >
                    <Input.Password
                        className="w-full p-3!"
                        placeholder="Nhập mật khẩu mới"
                    />
                    </Form.Item>
                </div>
                </div>

                {/* Xác nhận mật khẩu mới */}
                <div className="flex flex-wrap gap-2 sm:gap-5 mb-5">
                <label className="w-full sm:w-40 pt-2 font-medium">
                    Xác nhận mật khẩu mới
                </label>
                <div className="flex-1 min-w-0 w-full">
                    <Form.Item
                    name="confirmPassword"
                    className="m-0"
                    dependencies={["newPassword"]}
                    rules={[
                        {
                        required: true,
                        message: "Vui lòng nhập lại mật khẩu mới!",
                        },
                        ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue("newPassword") === value) {
                            return Promise.resolve();
                            }
                            return Promise.reject(new Error("Mật khẩu không khớp!"));
                        },
                        }),
                    ]}
                    >
                    <Input.Password
                        className="w-full p-3!"
                        placeholder="Nhập lại mật khẩu mới"
                    />
                    </Form.Item>
                </div>
                </div>

                {/* Submit button */}
                <div className="flex justify-end">
                <Form.Item className="m-0">
                    <Button loading={isPendingChangePassword} 
                            htmlType="submit"
                            className="w-full! h-12! p-3! bg-[#29A07E]! hover:bg-[#1f7a5c]! text-[white]! font-bold!">
                            ĐỔI MẬT KHẨU
                    </Button>
                </Form.Item>
                </div>
            </Form>
            </div>
        </section>
        </div>

    )
}
export default ChangePassword;