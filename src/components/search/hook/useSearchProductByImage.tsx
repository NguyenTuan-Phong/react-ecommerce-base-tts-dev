import { useMutation } from "@tanstack/react-query"
import { searchProductByImage } from "../../../services/searchServices"
import { toast } from "react-toastify"
export interface FormSeach {
    embedding: number[]
}

export const useSearchProductByImage = () => {
    const {
        isPending: isPendingSeachProductByImage,
        mutateAsync: searchProductByImageMutation,
        data: ResponseSearchProductByImage
    } = useMutation({
        mutationKey: ["searchProductByImage"],
        mutationFn: searchProductByImage,
        onError: (err: Error) => {
            toast.error(err.message || "Có lỗi xảy ra vuui lòng thử lại sau ít phút")
        }
    })

    const handleSeachProductByImage = (value: FormSeach) => {
        searchProductByImageMutation(value)
    }

    return{
        isPendingSeachProductByImage,
        handleSeachProductByImage,
        ResponseSearchProductByImage
    }
}