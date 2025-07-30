import { useMutation } from "@tanstack/react-query"
import { createFeedback } from "../../../services/feedbackServices"
import { toast } from "react-toastify"

export interface FormFeedback {
    productId: string,
    rating: number,
    content: string
    userId: string
}

export const useCreateFeedback = (onSuccessCallback?: () => void) => {
    const {
        isPending: isPendingCreateFeedback,
        mutateAsync: createFeedbackMutation
    } = useMutation({
        mutationKey: ["createFeedback"],
        mutationFn: createFeedback,
        onError: (err : Error) => {
            toast.error(err.message || "Có lỗi xảy ra vui lòng thử lại sau ít phút!.")
        },
        onSuccess:() => {
            onSuccessCallback?.()
        }
        
    })

    const handleFeedback = (value : FormFeedback) => {
        createFeedbackMutation(value)
    }

    return {
        isPendingCreateFeedback,
        handleFeedback
    }
}