import { useMutation } from "@tanstack/react-query";
import type { FormForget, FormSendOTPForget } from "../../../types"
import { sendOTPForgotPassword, verifyOTPForgotPassword } from "../../../services/api_OTP";
import { toast } from "react-toastify";
import { useState } from "react";


const useForget = () => {
    const [isOpenModal, setIsOpenModal] = useState(false);
    const { isPending: isPendingSendOTP, mutateAsync: sendOTPMutation } = useMutation({
        mutationKey: ['sendOTPForget'],
        mutationFn: sendOTPForgotPassword,
        onSuccess: () => {
            setIsOpenModal(true);
        },
        onError: (err: Error) => {
            toast.error(err.message || 'Không gửi được OTP đến email của bạn!.')
        }
    })

    const { isPending: isPendingForgetPassword, mutateAsync: forgetMutation} = useMutation({
        mutationKey: ["forgotNewPassword"],
        mutationFn : verifyOTPForgotPassword,
        onSuccess: () => {
            setIsOpenModal(false);
        },
        onError: (err : Error) => {
            toast.error(err.message || "Có lỗi xảy ra vui lòng thực hiện lại!.")
        }
    })
    const handleForGetPassword = async (value: FormForget) => {
        forgetMutation(value);
    }

    const handleCancel = () => {
        setIsOpenModal(false);
    }

    const handleSendOTP = async (value: FormSendOTPForget) => {
        sendOTPMutation(value)
    }

    return { isPendingSendOTP, handleSendOTP, isOpenModal, handleCancel, handleForGetPassword, isPendingForgetPassword }
}
export default useForget