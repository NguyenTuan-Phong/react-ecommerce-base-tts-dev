import { useMutation } from "@tanstack/react-query"
import { deleteFlashSale } from "../../../../services/flashsaleServices"
import { toast } from "react-toastify"

export const useDeleteFlashSale = (onSuccessCallback?: () => void) => {
    const {
        isPending: isLoadingDeleteFlashSale,
        mutateAsync: deleteFlashSaleMutation
    } = useMutation({
        mutationKey:["deleteFlashSale"],
        mutationFn: deleteFlashSale,
        onError:(err:Error) => {
            toast.error(err.message || "Có lỗi xảy ra vui lòng thử lại sau ít phút.!")
        },
        onSuccess:() => {
            onSuccessCallback?.()
        }
    })

    const handleDeleteFlashSale = (id: string) => {
        deleteFlashSaleMutation(id)
    }

    return {
        isLoadingDeleteFlashSale,
        handleDeleteFlashSale
    }
}