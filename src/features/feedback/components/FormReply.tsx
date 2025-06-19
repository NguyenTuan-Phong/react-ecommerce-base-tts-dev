import { Form, Input, Button } from "antd";
import {
    StarOutlined
} from "@ant-design/icons"
import { useState } from "react";
import { toast } from "react-toastify";
const FormReply = () => {
    const [isLoading, setIsLoading] = useState(false);
    const handleSend = async (value: any) => {
        // const { name,email,content } = value;
        console.log(value);
        
        setIsLoading(true)
        try {
            toast.success("Gửi thành công")
        } catch (error: any) {
            toast.error(error?.response?.data?.message || "Lỗi không gọi được API");
        } finally {
            setIsLoading(false)
        }
    }
    return (
        <div>
            <Form 
            onFinish={handleSend}>
                <Form.Item name="content">
                    <Input.TextArea
                        style={{ height: 144, padding: 10 }}
                        placeholder="Nội dung"
                    />
                </Form.Item>
                <div className="flex gap-2 pb-3">
                    <p className="text-[16px]">Đánh giá: </p>
                    <div className="flex gap-1">
                        <StarOutlined />
                        <StarOutlined />
                        <StarOutlined />
                        <StarOutlined />
                        <StarOutlined />
                    </div>
                </div>
                <div className="flex gap-5">
                    <Form.Item
                        name="name"
                        style={{ flex: 1 }}
                        rules={[
                        {
                            required: true,
                            message: "Vui lòng nhập Tên",
                        },
                        ]}>
                        <Input style={{ height: 48 }} placeholder="Tên (Bắt buộc)" />
                    </Form.Item>
                    <Form.Item
                        name="email"
                        style={{ flex: 1 }}
                        rules={[
                        {
                            required: true,
                            message: "Vui lòng nhập Email",
                            type: "email",
                        },
                        ]}>
                        <Input style={{ height: 48 }} placeholder="Email (Bắt buộc)" />
                    </Form.Item>
                </div>
                <div className="flex">
                    <div className="flex-1"></div>
                    <Form.Item style={{ flex: 1, marginLeft: 20 }}>
                        <Button
                        htmlType="submit"
                        loading={isLoading}
                        style={{
                            background: "#29A07E",
                            color: "white",
                            height: 48,
                            width: 120,
                            fontSize: 16,
                        }}>
                        GỬI ĐI
                        </Button>
                    </Form.Item>
                </div>
            </Form>
        </div>
    );
};
export default FormReply;
