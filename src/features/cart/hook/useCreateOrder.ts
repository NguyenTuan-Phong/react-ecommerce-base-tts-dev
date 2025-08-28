import { useMutation } from "@tanstack/react-query";
import { createOrder } from "../../../services";
import useUserStore from "../../../store/useUserStore";
import type { DataCart } from "../type";
import { toast } from "react-toastify";
import { push, ref } from "firebase/database";
import { database } from "../../../firebaseConfig";

export const useCreateOrder = (onSuccessCallback ?: () => void) => {
    const userId = useUserStore((state) => state.user?.id);
    const user = useUserStore((state) => state.user);
    

    const { 
        isPending: isPendingCreateOrder,
        mutateAsync: createOrderMutation
    } = useMutation({
        mutationKey: ['createOrder'],
        mutationFn: ({ userId, value }: { userId: string, value: DataCart }) => createOrder(userId, value),
        onError: (err: Error) => {
            toast.error(err.message || 'Có lỗi xảy ra vui lòng thử lại sau ít phút!');
        },
        onSuccess: async (response: any) => {
            const adminId = "admin"
            const orderCode = response.data.code || "Không xác định";
            const notiRef = ref(database, `notifications/${adminId}`);
            await push(notiRef, {
                message: `Khách hàng ${user?.username || "ẩn danh"} vừa đặt đơn hàng || mã ${orderCode}.`,
                orderCode,
                type: "order",
                timestamp: Date.now(),
                read: false,
            });

            onSuccessCallback?.();
            const paymentUrl = response.data.paymentUrl;
            if (paymentUrl) {
                window.location.href = paymentUrl;
            }
        }
    });

    const handleCreateOrder = (value: DataCart) => {
        createOrderMutation({ userId: userId!, value });
    };

    return {
        isPendingCreateOrder,
        handleCreateOrder,
    };
}