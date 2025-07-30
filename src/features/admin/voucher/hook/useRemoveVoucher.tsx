import { useMutation } from "@tanstack/react-query"
import { removeVoucher } from "../../../../services"
import { toast } from "react-toastify";

export const useRemoveVoucher = (onSuccessCallback?: () => void) => {

    const {
        isPending: isPendingRemoveVoucher,
        mutateAsync: removeVoucherMutation
    } = useMutation({
        mutationKey:["removeVoucher"],
        mutationFn: removeVoucher,
        onError: (err : Error) => {
            toast.error(err.message || "Có lỗi xảy ra vui lòng thử lại sau ít phút!.")
        },
        onSuccess: () => {
            onSuccessCallback?.()
        }
    })

    const  handleRemoveVoucher = (id: string) => {
        removeVoucherMutation(id)
    }

    return {
        isPendingRemoveVoucher,
        handleRemoveVoucher,
    }
}