import { useMutation, useQuery } from "@tanstack/react-query"
import { getInfoUser } from "../../../services/api_InfoUser"
import useUserStore from "../../../store/useUserStore"
import { sendOTPVerification, verifyOTP } from "../../../services/api_OTP"
import { toast } from "react-toastify"
import { useState } from "react"
export interface ResponsiveData {
    data: {
        fullName:  string,
        email: string,
        phoneNumber: string,
        address: string | null, 
        dateOfBirth: string | null,
        statusUser: number
    }
}

export interface FormSendOTPVerifyAccount {
    email: string
}

export interface FormVerifyAccount {
    email:  string,
    otp: string
}

const useInfoUser = () => {
    const token = useUserStore((state) => state.user?.token);
    const [isOpenModalSendOTPVerifyAccount, setIsOpenModalSendOTPVerifyAccount] = useState(false);
    const [isOpenModalVerifyAccount, setIsOpenModalVerifyAccount] = useState(false);
    // api call profile
    const { isPending, data: dataUser} = useQuery({
        queryKey: ['fetchUserInfo', token],
        queryFn: getInfoUser,
        enabled: !!token,
        refetchOnWindowFocus: false,
        retry:false
    })

    //api call send OTP Verify Account
    const { isPending: isPendingSendOTPVerifyAccount, 
        mutateAsync: SendOTPVerifyAccountMudation} = useMutation({
        mutationKey:['sendOTPVerifyAccount'],
        mutationFn: sendOTPVerification,
        onSuccess: async() => {
            setIsOpenModalSendOTPVerifyAccount(false);
            setIsOpenModalVerifyAccount(true);
        },
        onError :(err: Error) => {
            toast.error(err.message || "Có lỗi xảy ra vui lòng thực hiện lại");
        }
    })

    const showModalSendOTPVerifyAccount = () => {
        setIsOpenModalSendOTPVerifyAccount(true);
    }

    const sendOTPVerifyAccount = (value: FormSendOTPVerifyAccount) => {
        SendOTPVerifyAccountMudation(value);
    }
    const cancelModalSendOTPVerifyAccount = () => {
        setIsOpenModalSendOTPVerifyAccount(false);
    }

    // api verify account
    const {
        isPending: isPendingVerifyAccount,
        mutateAsync: verifyAccountMutation
    } = useMutation({
        mutationKey: ["verifyAccount"],
        mutationFn: verifyOTP,
        onSuccess: () => {
            setIsOpenModalVerifyAccount(false);
        },
        onError: (err: Error) => {
            toast.error(err.message || "Có lỗi xảy ra vui lòng thử lại.");
        }
    })

    const verifyAccount = (value: FormVerifyAccount) => {
        verifyAccountMutation(value);
    }

    const cancelModalVerifyAccount = () => {
        setIsOpenModalVerifyAccount(false);
    }


    return { 
        isPending,
        dataUser,
        isPendingSendOTPVerifyAccount,
        sendOTPVerifyAccount,
        isOpenModalSendOTPVerifyAccount,
        showModalSendOTPVerifyAccount,
        isOpenModalVerifyAccount,
        setIsOpenModalVerifyAccount,
        verifyAccount,
        isPendingVerifyAccount,
        cancelModalSendOTPVerifyAccount,
        cancelModalVerifyAccount
    }
}

export default useInfoUser