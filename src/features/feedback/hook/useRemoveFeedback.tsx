import { useMutation } from "@tanstack/react-query"
import { removeFeedback } from "../../../services/feedbackServices"
import { toast } from "react-toastify"

export const useRemoveFeedback = (onSuccessCallBack?: () => void) => {
    const {
        isPending: isPendingRemoveFeedback,
        mutateAsync: removeFeedbackMutation
    } = useMutation({
        mutationKey: ["removeFeedback"],
        mutationFn: removeFeedback,
        onSuccess: () => {
            onSuccessCallBack?.()
        },
        onError: (err: Error) => {
            toast.error(err.message || "Có lỗi xảy ra vui lòng thực hiện lại sau ít phút!.")
        }
    })

    const  handleRemoveFeedback = (id : string) => {
        removeFeedbackMutation(id);
    }


    return {
        isPendingRemoveFeedback,
        handleRemoveFeedback
    }
}