import { useMutation } from "@tanstack/react-query"
import { createFlashSale, type FormCreateFlashSale } from "../../../../services/flashsaleServices"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

export const useCreateFlashSale = (onSuccessCallback?: () => void) => {
    const navigate = useNavigate()
    const {
        isPending: isLoadingCreateFlashSale,
        mutateAsync: createFlashSaleMutation
    } = useMutation({
        mutationKey:["createFlashSale"],
        mutationFn: createFlashSale,
        onSuccess: () => {
            onSuccessCallback?.()
            navigate('/admin/management-flashsale')
        },
        onError:(err:Error) => {
            toast.error(err.message || "Có lỗi xảy ra vui lòng thử lại sau ít phút.!")
        }
    })

    const handleCreateFlashSale = (data:FormCreateFlashSale) => {
        createFlashSaleMutation(data)
    }

    return {
        isLoadingCreateFlashSale,
        handleCreateFlashSale
    }
}   