import { get } from "../config/axios-config";
import { API_PATHS } from "../constants/apiPath";
interface ResponsePaymentResult {
    success: boolean,
    message: string
}
export const getVNPAYCallbackUrl = async (url: string):Promise<ResponsePaymentResult> => {
    return await get({
        url: `${API_PATHS.VNPAY.getCallBack}?${url}`,
    }) ;
}