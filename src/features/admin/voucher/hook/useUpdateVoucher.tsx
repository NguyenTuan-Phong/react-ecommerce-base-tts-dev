import { useMutation } from "@tanstack/react-query"
import { toast } from "react-toastify"
import { updateVoucher, type FormVoucher } from "../../../../services"

export const useUpdateVoucher = (onSuccessCallback?: () => void) => {

    const {
        isPending: isPendingUpdateVoucher,
        mutateAsync: updateVoucherMutation
    } = useMutation({
        mutationKey: ["updateVoucher"],
        mutationFn: ({id, value} : {id: string, value: FormVoucher}) => updateVoucher(id, value),
        onSuccess: () => {
            onSuccessCallback?.()
        },
        onError: (err: Error) => {
            toast.error(err.message || "Có lỗi xảy ra vui lòng thử lại sau ít phút!.")
        }
    })

    const handleUpdateVoucher = (id: string, value: FormVoucher) => {
        updateVoucherMutation({id, value})
    }

    return {
        isPendingUpdateVoucher,
        handleUpdateVoucher
    }
}