import { useMutation } from "@tanstack/react-query"
import { updateCategoryItems } from "../../../../services"
import { toast } from "react-toastify"
import { useState } from "react"

export interface FormUpdateCategory {
    id: string,
    name: string,
    categoryId: string
}

export const useUpdateCategoryItems = (onSuccessCallback?: () => void) => {
    const [isOpenModalUpdateCategoryItems, setIsOpenModalUpdateCategoryItems] = useState(false)
    const {
        isPending: isPendingUpdateCategoryItems,
        mutateAsync: updateCategoryItemsMutation
    } = useMutation({
        mutationKey: ["updateCategoryItems"],
        mutationFn: updateCategoryItems,
        onError: (err: Error) => {
            toast.error(err.message || "Có lỗi xảy ra vui lòng thực hiện lại sau ít phút!.")
        },
        onSuccess: () => {
            onSuccessCallback?.(),
            setIsOpenModalUpdateCategoryItems(false)
        }
    })

    const handleUpdateCategoryItems = (value: FormUpdateCategory) => {
        updateCategoryItemsMutation(value)
    }

    return {
        isPendingUpdateCategoryItems,
        handleUpdateCategoryItems,
        isOpenModalUpdateCategoryItems,
        setIsOpenModalUpdateCategoryItems
    }
}