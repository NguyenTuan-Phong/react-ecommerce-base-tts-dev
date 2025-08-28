import { useMutation } from "@tanstack/react-query"
import { updateCombo, type productsProp } from "../../../../services/comboServices"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
export interface FormUpdateComboProduct {
    nameCombo: string,
    description: string,
    price: number,
    products: productsProp[],
    imageUrl: File | string,
    code: string,
    quantityCombo: number,
    id:string
}
export const useUpdateCombo = (onSuccessCallback?: () =>  void) => {
    const navigate = useNavigate()
    
    const {
        isPending: isLoadingUpdateCombo,
        mutateAsync : useUpdateComboMutation
    } = useMutation({
        mutationKey: ["useUpdateCombo"],
        mutationFn: updateCombo,
        onSuccess: () => {
            onSuccessCallback?.()
            navigate('/admin/management-combo')
        },
        onError: (err: Error) => {
            toast.error(err.message || "Có lỗi xảy ra vui lòng thử lại sau ít phút")
        }
    })

    const handleUpdateComboProduct = (value: FormUpdateComboProduct) => {
        useUpdateComboMutation(value)
    }

    return {
        isLoadingUpdateCombo,
        handleUpdateComboProduct
    }
}