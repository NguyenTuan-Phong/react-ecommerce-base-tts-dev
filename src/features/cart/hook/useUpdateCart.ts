import { useMutation } from "@tanstack/react-query"
import { updateItemCart, type TypeUpdate } from "../../../services"
import useUserStore from "../../../store/useUserStore";
import { useState } from "react";
import { toast } from "react-toastify";

export const useUpdateCart = (onSuccessCallback ?: () => void) => {

    const userId = useUserStore((state) => state.user?.id);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const {
        isPending: isPendingUpdateItemCart,
        mutateAsync: updateItemCartMutation
    } = useMutation({
        mutationKey:['updateItemCart'],
        mutationFn: ({ userId, value }: { userId: string, value: TypeUpdate }) => updateItemCart(userId, value),
        onError: (err: Error) => {
            toast.error(err.message || "Có lỗi xảy ra vui lòng thử lại sau!.")
        },
        onSuccess: () => {
            setIsModalOpen(false);
            onSuccessCallback?.()
        }
    })

    const handleUpdateItemCart = (value: TypeUpdate) => {
        updateItemCartMutation({ userId: userId!, value });
    }

    return {
        isPendingUpdateItemCart,
        handleUpdateItemCart,
        isModalOpen,
        setIsModalOpen
    }
}