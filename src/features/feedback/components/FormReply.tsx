import { Form, Input, Button } from "antd";
import { StarFilled } from "@ant-design/icons";
import { useState } from "react";
import { useCreateFeedback } from "../hook/useCreateFeedback";
import useUserStore from "../../../store/useUserStore";
import { useNavigate } from "react-router-dom";
import { useGetOrderByUserId } from "../../profile/hook/useGetOrderByUserId";
interface FormReplyProps {
  productId: string;
}
const FormReply = ( {productId} : FormReplyProps) => {
  const [rating, setRating] = useState(0);
  const userId = useUserStore((state) => state.user?.id);
  const [form] = Form.useForm(); 
  const navigate = useNavigate()
  const {
    refetchResponseGetOrderByUserId
  } = useGetOrderByUserId(0, 10, 3)
  const onSuccessCallback = () => {
    refetchResponseGetOrderByUserId()
    navigate('/profile/order-history/status/3')
  }
  const {
    isPendingCreateFeedback,
    handleFeedback
  } = useCreateFeedback(onSuccessCallback);

  const onFinish = (values: any) => {
    if (rating === 0) {
      return alert("Vui lòng chọn đánh giá sao.");
    }

    const payload = {
      ...values,
      rating,
      productId: productId, 
      userId: userId
    };

    handleFeedback(payload);
    form.resetFields();
    setRating(0);
  };

  return (
    <div>
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item name="content" label="Nội dung">
          <Input.TextArea
            style={{ height: 144, padding: 10 }}
            placeholder="Nội dung"
          />
        </Form.Item>

        <div className="flex gap-2 pb-3 items-center">
          <p className="text-[16px]">Đánh giá:</p>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <StarFilled
                key={star}
                onClick={() => setRating(star)}
                style={{
                  fontSize: 20,
                  color: star <= rating ? "#fadb14" : "#d9d9d9",
                  cursor: "pointer",
                }}
              />
            ))}
          </div>
        </div>

        <div className="flex justify-end">
          <Form.Item>
            <Button
              htmlType="submit"
              loading={isPendingCreateFeedback}
              style={{
                background: "#29A07E",
                color: "white",
                height: 48,
                width: 120,
                fontSize: 16,
              }}
            >
              GỬI ĐI
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default FormReply;
