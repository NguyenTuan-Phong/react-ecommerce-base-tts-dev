import { get } from "../config/axios-config";



export const getOrderByUser = async (id:number, page: number, size: number) => {
    return await get({
        url: `orders/getOrderByUser/${id}`,
        params: {
            page: page,
            size: size
        }
    })
}