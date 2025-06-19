import { get } from "../config/axios-config";
import type { ResponsiveData } from "../features/profile/hook/useInfoUser";


export const getInfoUser = async (): Promise<ResponsiveData> => {
    return await get({
        url: "auth/getProfile"
    })
}