import { useMutation } from "@tanstack/react-query"
import { createCategoryItems } from "../../../../services"
import { toast } from "react-toastify"
import { useState } from "react"

export interface FormCreateCategoryItems {
    name:  string,
    categoryId: string
}

export const useCreateCategoryItems = (onSuccessCallback?: () => void) => {
    const [isOpenModalCreateCategoryItems, setIsOpenModalCreateCategoryItems] = useState(false)
    const {
        isPending: isPendingCreateCategoryItems,
        mutateAsync: createCategoryItemsMutation
    } = useMutation({
        mutationKey: ["createCateogryItems"],
        mutationFn: createCategoryItems,
        onError: (err: Error) => {
            toast.error(err.message || "Có lỗi xảy ra vui lòng thực hiện lại sau ít phút!.")
        },
        onSuccess: () => {
            onSuccessCallback?.()
            setIsOpenModalCreateCategoryItems(false)
        }
    })

    const handleCreateCategoryItems = (value: FormCreateCategoryItems) => {
        createCategoryItemsMutation(value)
    }

    return {
        isPendingCreateCategoryItems,
        isOpenModalCreateCategoryItems,
        setIsOpenModalCreateCategoryItems,
        handleCreateCategoryItems
    }
}