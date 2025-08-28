import { useMutation } from "@tanstack/react-query"
import { removeCombo } from "../../../../services/comboServices"
import { toast } from "react-toastify"

export const useRemoveCombo = (onSuccessCallback?: () => void) => {
    const {
        isPending: isLoadingRemoveCombo,
        mutateAsync: useRemoveComboMutation
    } = useMutation({
        mutationKey: ["useRemoveCombo"],
        mutationFn: removeCombo,
        onError: (err :Error) => {
            toast.error(err.message || "Có lỗi cảy ra vui lòng thực hiện lại sau ít phút")
        },
        onSuccess: () => {
            onSuccessCallback?.()
        }
    })

    const handleRemoveCombo = (id: string) => {
        useRemoveComboMutation(id)
    }

    return{
        isLoadingRemoveCombo,
        handleRemoveCombo
    }
}