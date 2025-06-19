import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../../services/api_Auth";
import useUserStore from "../../../store/useUserStore";
import { toast } from "react-toastify";
import type { FormLogin } from "../../../types";

export const useLogin = () => {
    const navigate = useNavigate();
    const { isPending, mutateAsync: loginMutation } = useMutation({
        mutationKey: ['loginUser'],
        mutationFn: loginUser,
        onSuccess: async (data: any) => {
            const user = {
                username: data.data.fullName ||'',
                token: data?.data?.accessToken,
                verified: data?.data?.verified || false,
            };
            useUserStore.getState().login(user);

            navigate('/');
        },
        onError: (err: Error) => {
            toast.error(err.message || 'Đăng nhập thất bại, vui lòng đăng nhập lại');
        },
    });


    const handleLogin = async (value: FormLogin) => {
        await loginMutation(value);
    };

    return { handleLogin, isPending };
};