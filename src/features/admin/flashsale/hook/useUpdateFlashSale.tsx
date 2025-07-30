import { useMutation } from "@tanstack/react-query"
import { updateFlashSale, type FormCreateFlashSale } from "../../../../services/flashsaleServices"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

export const useUpdateFlashSale = (onSuccessCallback?: () => void) => {
    const navigate = useNavigate()
    const {
        isPending: isLoadingUpdateFlashSale,
        mutateAsync: updateFlashSaleMutation
    } = useMutation({
        mutationKey:["updateFlashSale"],
        mutationFn: updateFlashSale,
        onSuccess: () => {
            onSuccessCallback?.()
            navigate('/admin/management-flashsale')
        },
        onError:(err:Error) => {
            toast.error(err.message || "Có lỗi xảy ra vui lòng thử lại sau ít phút.!")
        }
    })

    const handleUpdateFlashSale = (data:FormCreateFlashSale) => {
        updateFlashSaleMutation(data)
    }

    return {
        isLoadingUpdateFlashSale,
        handleUpdateFlashSale
    }
}   