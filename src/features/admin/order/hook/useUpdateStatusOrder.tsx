import { useMutation } from "@tanstack/react-query"
import { updateStatusOrder } from "../../../../services"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
export interface FormUpdateStatusOrder {
    orderId: string,
    status: number
}

export const useUpdateStatusOrder = () => {
    const navigate = useNavigate()

    const {
        isPending: isPendingUpdateStatusOrder,
        mutateAsync: updateStatusOrderMutation
    }= useMutation({
        mutationKey: ["updateStatusOrder"],
        mutationFn: updateStatusOrder,
        onError: (err: Error) => {
            toast.error(err.message || "Có lỗi xảy ra vui lòng thử lại sau ít phút!.")
        },
        onSuccess: () => {
            navigate('/admin/management-order')
        }
    })

    const handleUpdateStatusOrder = (value: FormUpdateStatusOrder) => {
        updateStatusOrderMutation(value)
    }

    return {
        isPendingUpdateStatusOrder,
        handleUpdateStatusOrder
    }
}