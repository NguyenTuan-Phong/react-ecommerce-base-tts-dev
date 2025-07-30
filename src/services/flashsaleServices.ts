import { get, post } from '../config/axios-config'
import { API_PATHS } from "../constants/apiPath"
import type { ResponseFlashSale, ResponseFlashSaleById } from '../types'

export const getAllFlashSale = async (
    page: number, 
    size: number,
    name?: string | undefined,
    startTime?: string | undefined,
    endTime?: string | undefined
):Promise<ResponseFlashSale> => {
    
    return await get({
        url: API_PATHS.FLASHSALE.getAll,
        params: {
            page,
            size,
            name,
            startTime,
            endTime
        },
    })
}

export const getFlashSaleById = async (
    id: string | null
):Promise<ResponseFlashSaleById> => {
    
    return await get({
        url: `${API_PATHS.FLASHSALE.getFlashSaleById}/${id}`,
    })
}

export interface products {
    productId:string,
    flashPrice: number,
    availableQuantity: number
}

export interface FormCreateFlashSale {
    name: string,
    startTime: string,
    endTime: string,
    products: products[]
}

export const createFlashSale = async (data: FormCreateFlashSale) => {
    return await post({
        url: API_PATHS.FLASHSALE.createFlashSale,
        data
    })
}

export const deleteFlashSale = async (id: string) => {
    return await post({
        url: `${API_PATHS.FLASHSALE.deleteFlashSale}/${id}`
    })
}

export const updateFlashSale = async (data: FormCreateFlashSale) => {
    return await post({
        url: API_PATHS.FLASHSALE.updateFlashSale,
        data
    })
}