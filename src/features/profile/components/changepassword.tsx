import { useState } from "react";
import { Input, Button, Form, message } from "antd";

const ChangePassword = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const onFinish = async (values: any) => {
    const { currentPassword, newPassword, confirmPassword } = values;

    if (newPassword !== confirmPassword) {
      message.error("Mật khẩu mới không khớp!");
      return;
    }

    try {
      setLoading(true);

      // Gửi dữ liệu đến backend để thay đổi mật khẩu
      console.log("Sending password change request:", values);

      // fake delay
      await new Promise((res) => setTimeout(res, 1000));

      message.success("Đổi mật khẩu thành công!");
      form.resetFields();
    } catch (err) {
      message.error("Đổi mật khẩu thất bại!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full mx-auto p-6 shadow-md rounded-lg bg-white">
      <h2 className="text-xl font-bold mb-4 text-center">Đổi mật khẩu</h2>
      <Form layout="vertical" form={form} onFinish={onFinish}>
        <Form.Item
          name="currentPassword"
          label={<span className="font-bold text-[16px] text-gray-800">Mật khẩu hiện tại</span>}
          rules={[{ required: true, message: "Vui lòng nhập mật khẩu hiện tại!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="newPassword"
          label={<span className="font-bold text-[16px] text-gray-800">Mật khẩu mới</span>}
          rules={[{ required: true, message: "Vui lòng nhập mật khẩu mới!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item 
          name="confirmPassword"
          label={<span className="font-bold text-[16px] text-gray-800">Xác nhận mật khẩu mới</span>}
          rules={[{ required: true, message: "Vui lòng xác nhận mật khẩu mới!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block loading={loading}
          style={{ backgroundColor: "#22a085" }}>
            <p className="w-50 font-bold">Thay đổi mật khẩu</p>
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ChangePassword;
