import { useMutation } from "@tanstack/react-query"
import { removeCategoryItems } from "../../../../services"
import { toast } from "react-toastify"

export const useRemoveCategoryItems = (onSuccessCallback?: () => void) => {

    const {
        isPending: isPendingRemoveCategoryItems,
        mutateAsync: removeCategoryItemsMutation
    } = useMutation({
        mutationKey: ["removeCategoryItems"],
        mutationFn:removeCategoryItems,
        onError: (err: Error) => {
            toast.error(err.message || "Có lỗi xảy ra vui lòng thực hiện lại sau ít phút")
        },
        onSuccess: () => {
            onSuccessCallback?.()
        }
    })

    const handleRemoveCategoryItems = (id: string) => {
        removeCategoryItemsMutation(id)
    }

    return {
        isPendingRemoveCategoryItems,
        handleRemoveCategoryItems
    }
}