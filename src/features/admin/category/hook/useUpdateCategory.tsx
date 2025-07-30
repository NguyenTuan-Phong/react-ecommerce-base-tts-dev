import { useMutation } from "@tanstack/react-query"
import { updateCategory } from "../../../../services"
import { toast } from "react-toastify"
import { useState } from "react"

export interface FormUpdateCategory {
    id: string,
    name: string
}

export const useUpdateCategory = (onSuccessCallback?: () => void) => {
    const [isOpenModalUpdateCategory, setIsOpenModalUpdateCategory] = useState(false)
    const {
        isPending: isPendingUpdateCategory,
        mutateAsync: updateCategoryMutation
    } = useMutation({
        mutationKey: ["updateCategory"],
        mutationFn: updateCategory,
        onError: (err: Error) => {
            toast.error(err.message || "Có lỗi xảy ra vui lòng thực hiện lại sau ít phút!.")
        },
        onSuccess: () => {
            onSuccessCallback?.()
        }
    })

    const handleUpdateCategory = (value: FormUpdateCategory) => {
        updateCategoryMutation(value)
    }

    return {
        isPendingUpdateCategory,
        handleUpdateCategory,
        isOpenModalUpdateCategory,
        setIsOpenModalUpdateCategory
    }
}