import { useMutation } from "@tanstack/react-query"
import { createCombo } from "../../../../services/comboServices"
import { toast } from "react-toastify"
import type { FormCreateComboProduct } from "../components/CreateComboProduct"
import { useNavigate } from "react-router-dom"

export const useCreateCombo = (onSuccessCallback?: () =>  void) => {
    const navigate = useNavigate()
    
    const {
        isPending: isLoadingCreateCombo,
        mutateAsync : useCreateComboMutation
    } = useMutation({
        mutationKey: ["useCreateCombo"],
        mutationFn: createCombo,
        onSuccess: () => {
            onSuccessCallback?.()
            navigate('/admin/management-combo')
        },
        onError: (err: Error) => {
            toast.error(err.message || "Có lỗi xảy ra vui lòng thử lại sau ít phút")
        }
    })

    const handleCreateComboProduct = (value: FormCreateComboProduct) => {
        useCreateComboMutation(value)
    }

    return {
        isLoadingCreateCombo,
        handleCreateComboProduct
    }
}