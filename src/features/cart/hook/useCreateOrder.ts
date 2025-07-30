import { useMutation } from "@tanstack/react-query";
import { createOrder } from "../../../services";
import useUserStore from "../../../store/useUserStore";
import type { DataCart } from "../type";
import { useCart } from "./useCart";
import { toast } from "react-toastify";

export const useCreateOrder = (onSuccessCallback ?: () => void) => {

    const userId = useUserStore((state) => state.user?.id);

    const { 
        isPending: isPendingCreateOrder,
        mutateAsync: createOrderMutation
    } = useMutation({
        mutationKey: ['createOrder'],
        mutationFn: ({ userId, value }: { userId: string, value: DataCart }) => createOrder(userId, value),
        onError: (err: Error) => {
            toast.error(err.message || 'Có lỗi xảy ra vui lòng thử lại sau ít phút!');
        },
        onSuccess: () => {
            onSuccessCallback?.()
        }
    });
    const {
        dataCartItem,
    } = useCart();

    const handleCreateOrder = (value: DataCart) => {
        console.log(value.voucherCode);
        
        const data= {
            ...value,
            items: dataCartItem!.data.cartItems.map((item) => ({
                productId: item.product.id || '',
                quantity: item.quantity || 0,
                price: item.product.price || 0,
            })),
        }
        console.log(data);
        
        createOrderMutation({ userId: userId!, value: data });
    };

    return {
        isPendingCreateOrder,
        handleCreateOrder,
    };
}