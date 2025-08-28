import { ref, push } from "firebase/database";
import { database } from "../../../../firebaseConfig";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { updateStatusOrder } from "../../../../services";
import { toast } from "react-toastify";

export interface FormUpdateStatusOrder {
    orderId: string,
    status: number,
    userId: string
}

export const useUpdateStatusOrder = () => {
    const navigate = useNavigate();

    const {
        isPending: isPendingUpdateStatusOrder,
        mutateAsync: updateStatusOrderMutation
    } = useMutation({
        mutationKey: ["updateStatusOrder"],
        mutationFn: updateStatusOrder,
        onError: (err: Error) => {
            toast.error(err.message || "Có lỗi xảy ra vui lòng thử lại sau ít phút!");
        },
        onSuccess: async (_data, variables) => {
            console.log("📨 New Notification:", _data);
            const { orderId, status, userId } = variables;
            console.log("🔍 userId:", userId);

            const messageByStatus = [
                "Đơn hàng của bạn đã được xác nhận.",
                "Đơn hàng đang được vận chuyển.",
                "Đơn hàng đang được giao.",
                "Đơn hàng đã hoàn thành.",
                "Đơn hàng đã bị hủy.",
            ];

            if (userId) {
                const notiRef = ref(database, `notifications/${userId}`);
                await push(notiRef, {
                    message: `Đơn hàng #${orderId}: ${messageByStatus[status]}`,
                    type: "order-status",
                    timestamp: Date.now(),
                    read: false,
                });
               
            }

            navigate('/admin/management-order');
        }
    });

    const handleUpdateStatusOrder = (value: FormUpdateStatusOrder & { userId: string }) => {
        updateStatusOrderMutation(value);
    };

    return {
        isPendingUpdateStatusOrder,
        handleUpdateStatusOrder,
    };
};

