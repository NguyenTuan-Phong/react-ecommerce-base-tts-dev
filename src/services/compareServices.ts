import { get } from "../config/axios-config"
import { API_PATHS } from "../constants/apiPath"
export interface ResponseProductCompare {
    id: string,
    name: string,
    imageUrl: string,
    price: number,
    code: string,
    rating: number,
    quantity: number,
    description: string,
    soldQuantity: number,
    availableQuantity: number,
    flashPrice: number,
    originalPrice: number,
    isInFlashSale: boolean
}

export interface DataResponseCompare {
    data: ResponseProductCompare[]
}
export const compareProduct = async (listId : string) : Promise<DataResponseCompare> => {
    return await get({
        url: API_PATHS.COMPARE.compare,
        params: {
            ids: listId
        }
    })
}