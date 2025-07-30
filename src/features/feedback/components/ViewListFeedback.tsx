import {
    DeleteOutlined,
    FormOutlined,
    StarFilled,
    UserOutlined
} from "@ant-design/icons"
import { useGetFeedbackByProductId } from "../hook/useGetFeedbackByProductId";
import { Button, Form, Input, Modal, Spin } from "antd";
import { useParams } from "react-router-dom";
import useUserStore from "../../../store/useUserStore";
import { useRemoveFeedback } from "../hook/useRemoveFeedback";
import { useState } from "react";
import { useUpdateFeedback } from "../hook/useUpdateFeedback";
const ViewListFeedback = () => {
    const page = 0;
    const size = 10;
    const { id } = useParams();
    const {
        isPendingGetFeedbackByProductId,
        ResponseGetFeedbackByProductId,
        refetchGetFeedbackByProductId
    } = useGetFeedbackByProductId(page, size, id!)
    const userId = useUserStore((state) => state.user?.id)

    const {
        isPendingRemoveFeedback,
        handleRemoveFeedback
    } = useRemoveFeedback(refetchGetFeedbackByProductId)
    const [rating, setRating] = useState(0);
    const [form] = Form.useForm(); 
    const {
        isPendingUpdateFeedback,
        handleUpdateFeedback,
        isOpenModalUpdateFeedback,
        setIsOpenModalUpdateFeedback
    } = useUpdateFeedback(refetchGetFeedbackByProductId);

    const onFinish = (values: any) => {
    if (rating === 0) {
      return alert("Vui lòng chọn đánh giá sao.");
    }

    const payload = {
      ...values,
      rating,
      id: id, 
    };

    handleUpdateFeedback(payload);
    form.resetFields();
    setRating(0);
  };
 
    return (
        <div className="flex-1">

            {isPendingGetFeedbackByProductId ? (
                <div className="w-[100%] text-center content-center h-50">
                    <Spin className="text-[60px]!" />
                </div>
            ) : (
                <div className="flex-1">
                    {!ResponseGetFeedbackByProductId ? (
                        <div className="w-[100%] text-center content-center h-50 font-bold">
                            Không có Feedback.
                        </div>
                    ) : (
                        <div className="flex-1">
                            {ResponseGetFeedbackByProductId.data.content.length === 0 ? (
                                <div className="flex-1 text-center content-center h-50 font-bold text-[16px]">
                                    Không có Feedback.
                                </div>
                            ) : (
                                <div>
                                    {ResponseGetFeedbackByProductId.data.content.map((i) => (
                                        <div
                                            key={i.id}
                                            className="flex flex-col gap-4 rounded-xl bg-white p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300"
                                            >
                                            <div className="flex gap-4">
                                                <div className="flex-shrink-0">
                                                    <div className="w-14 h-14 rounded-full bg-gray-300 flex items-center justify-center">
                                                    <UserOutlined style={{ color: "white", fontSize: 28 }} />
                                                    </div>
                                                </div>
                                            
                                                <div className="flex flex-col gap-1 flex-1">
                                                    <div className="flex items-center justify-between">
                                                        <h4 className="font-semibold text-gray-800">{i.user.fullName}</h4>
                                                        <span className="text-xs text-gray-400">
                                                            {new Date(i.createdAt).toLocaleDateString("vi-VN", {
                                                            year: "numeric",
                                                            month: "2-digit",
                                                            day: "2-digit",
                                                            })}
                                                        </span>
                                                    </div>

                                                    <div className="flex items-center gap-1">
                                                        {[1, 2, 3, 4, 5].map((star) => (
                                                            <StarFilled
                                                            key={star}
                                                            style={{
                                                                fontSize: 18,
                                                                color: star <= i.rating ? "#facc15" : "#e5e7eb", // vàng hoặc xám nhạt
                                                            }}
                                                            />
                                                        ))}
                                                    </div>

                                                    <p className="text-sm text-gray-700 leading-normal whitespace-pre-line">
                                                        <span className="font-medium text-gray-600">Feedback: </span>
                                                        {i.content}
                                                    </p>
                                                </div>
                                            </div>
                                            {userId === i.user.id && 
                                                <div className="flex justify-end gap-3">
                                                    <Button loading={isPendingRemoveFeedback} className="cursor-pointer"
                                                        onClick={() => handleRemoveFeedback(i.id)}
                                                    >
                                                        <DeleteOutlined className="text-[red]! text-[22px]!"/>
                                                    </Button>
                                                    <Button className="cursor-pointer"
                                                        onClick={() => setIsOpenModalUpdateFeedback(true)}
                                                    >
                                                        <FormOutlined className="text-[green]! text-[22px]!"/>
                                                    </Button>
                                                </div>
                                            }
                                            
                                        </div>
                                    ))}
                                </div>

                            )}
                        </div>
                    )}
                    
                </div>
                
            )}
            <Modal
            open={isOpenModalUpdateFeedback}
            onCancel={() => setIsOpenModalUpdateFeedback(false)}
            footer
            
            >
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
                            loading={isPendingUpdateFeedback}
                            style={{
                                background: "#29A07E",
                                color: "white",
                                height: 48,
                                width: 120,
                                fontSize: 16,
                            }}
                        >
                            Chỉnh sửa
                        </Button>
                    </Form.Item>
                    </div>
                </Form>
                </div>
            </Modal>
            
        </div>
        
    );
};

export default ViewListFeedback;
