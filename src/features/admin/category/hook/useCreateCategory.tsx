import { useMutation } from "@tanstack/react-query"
import { createCategory } from "../../../../services"
import { toast } from "react-toastify"
import { useState } from "react"

export interface FormCreateCategory {
    name: string
}

export const useCreateCategory = (onSuccessCallback?: () => void) => {
    const [isOpenModalCreateCategory,setIsOpenModalCreateCategory] = useState(false)
    const {
        isPending: isPendingCreateCategory,
        mutateAsync: createCategoryMutaion
    } = useMutation({
        mutationKey: ["createCategory"],
        mutationFn: createCategory,
        onSuccess: () => {
            onSuccessCallback?.()
            setIsOpenModalCreateCategory(false)
        },
        onError: (err :Error) => {
            toast.error(err.message || "Có lỗi xảy ra vui lòng thực hiện lại sau ít phút!.")
        }
    })

    const handleCreateCategory = (value: FormCreateCategory) => {
        createCategoryMutaion(value)
    }

    return {
        isPendingCreateCategory,
        handleCreateCategory,
        isOpenModalCreateCategory,
        setIsOpenModalCreateCategory
    }
}