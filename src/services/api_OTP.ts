import { post } from "../config/axios-config";

export const sendOTPVerification = async ({
    email
} : {
    email: string
}) => {
    return await post({
        url:"auth/send-verification-otp",
        data: {
            email
        }
    })
}

export const verifyOTP = async ({
    email,
    otp
}: {
    email: string,
    otp: string
}) => {
    return await post({
        url:"auth/verify-account",
        data: {
            email,
            otp
        }
    })
}

export const sendOTPForgotPassword = async ({
    email
} : {
    email: string
}) => {
    return await post({
        url: "auth/send-forgot-password-otp",
        data: {
            email
        }
    })
}


export const verifyOTPForgotPassword = async ({
    email,
    otp,
    newPassword,
    confirmPassword
} : {
    email: string,
    otp: number,
    newPassword: string,
    confirmPassword: string
}) => {
    return await post({
        url: "auth/forgot-password",
        data: {
            email,
            otp,
            newPassword,
            confirmPassword
        }
    })
}