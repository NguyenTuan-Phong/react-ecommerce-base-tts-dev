import { useMutation } from "@tanstack/react-query"
import { createVoucher, type FormVoucher } from "../../../../services"
import { toast } from "react-toastify"

export const useCreateVoucher = (onSuccessCallback?: () =>  void ) => {

    const {
        isPending: isPendingCreateVoucher,
        mutateAsync : createVoucherMutation
    } = useMutation({
        mutationKey: ["createVoucher"],
        mutationFn: createVoucher,
        onError: (err : Error) => {
            toast.error(err.message || "Có lỗi xảy ra vui lòng thực hiện lại sau ít phút!.")
        },
        onSuccess: () => {
            onSuccessCallback?.()
        }
    })

    const handleCreateVoucher = (value: FormVoucher) => {
        createVoucherMutation(value)
    }

    return {
        isPendingCreateVoucher,
        handleCreateVoucher,
    }
}