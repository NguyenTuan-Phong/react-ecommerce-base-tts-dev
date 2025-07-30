import { useMutation } from "@tanstack/react-query"
import { removeCategory } from "../../../../services"
import { toast } from "react-toastify"

export const useRemoveCategory = (onSuccessCallback?: () => void) => {

    const {
        isPending: isPendingRemoveCategory,
        mutateAsync: removeCategoryMutation
    } = useMutation({
        mutationKey: ["removeCategory"],
        mutationFn:removeCategory,
        onError: (err: Error) => {
            toast.error(err.message || "Có lỗi xảy ra vui lòng thực hiện lại sau ít phút")
        },
        onSuccess: () => {
            onSuccessCallback?.()
        }
    })

    const handleRemoveCategory = (id: string) => {
        removeCategoryMutation(id)
    }

    return {
        isPendingRemoveCategory,
        handleRemoveCategory
    }
}