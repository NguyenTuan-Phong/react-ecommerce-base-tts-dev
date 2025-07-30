import { useMutation } from "@tanstack/react-query"
import { updateFeedback } from "../../../services/feedbackServices"
import { toast } from "react-toastify"
import { useState } from "react"

export interface FormUpdateFeedback {
    id: string,
    rating: number,
    content: string
}

export const useUpdateFeedback = (onSuccessCallBack?: () => void) => {
    const [isOpenModalUpdateFeedback, setIsOpenModalUpdateFeedback] = useState(false);
    const {
        isPending: isPendingUpdateFeedback,
        mutateAsync: updateFeedbackMutation
    } = useMutation({
        mutationKey: ["updateFeedback"],
        mutationFn: updateFeedback,
        onSuccess: () => {
            onSuccessCallBack?.()
            setIsOpenModalUpdateFeedback(false)
        },
        onError: (err : Error) => {
            toast.error(err.message || "Có lỗi xảy ra vui lòng thực hiện lại sau ít phút!.");
        }
    })

    const handleUpdateFeedback = (value: FormUpdateFeedback) => {
        updateFeedbackMutation(value)
    }

    return {
        isPendingUpdateFeedback,
        handleUpdateFeedback,
        isOpenModalUpdateFeedback,
        setIsOpenModalUpdateFeedback
    }
}