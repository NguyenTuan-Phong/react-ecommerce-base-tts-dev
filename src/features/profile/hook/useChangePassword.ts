import { useMutation } from "@tanstack/react-query";
import { changePassword } from "../../../services";
import { toast } from "react-toastify";
import type { FormChangePassword } from "../type";

export const useChangePassword = (onSuccessCallback ?: () => void) => {

    const {
        isPending: isPendingChangePassword,
        mutateAsync: changePasswordMutation,
    } = useMutation({
        mutationKey: ["changePassword"],
        mutationFn: changePassword,
        onError: (error: Error) => {
            toast.error(error.message || "Có lỗi xảy ra, vui lòng thử lại sau ít phút!");
        },
        onSuccess: () => {
            onSuccessCallback?.();
        }
    });

    const handleChangePassword = (value: FormChangePassword) => {
        changePasswordMutation(value);
    }

    return {
        isPendingChangePassword,
        handleChangePassword
     };
}