import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../../services/api_Auth";
import { toast } from "react-toastify";
import type { FormRegister } from "../../../types";


export const useRegister = () => {
    const navigate = useNavigate();
    const {isPending, mutateAsync: registerMutation} = useMutation({
        mutationKey:["registerUser"],
        mutationFn: registerUser,
        onSuccess: () => {
            navigate('/login')
        },
        onError: (err : Error) => {
            toast.error(err.message || "Đăng ký thất bại!Vui lòng đăng ký lại");
        }
    })
    
    const handleRegister = async (value:FormRegister) => {
        const data = {
            email: value.email,
            fullName: value.fullName,
            phoneNumber: value.phoneNumber,
            gender: Number(value.gender),
            password: value.password,
            role: 1
        }
        console.log();
        
        await registerMutation(data);
    }
    return { isPending, handleRegister}
}