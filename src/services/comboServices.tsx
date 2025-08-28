import { get, post } from "../config/axios-config"
import { API_PATHS } from "../constants/apiPath"
import type { ResponseDataGetAllCombo, ResponseDataGetDetailCombo } from "../features/admin/combo/type"

export const getAllCombo = async (page: number, size: number, keyword?: string): Promise<ResponseDataGetAllCombo> => {
    return await get({
        url: API_PATHS.COMBO.getAllCombo,
        params: {
            page,
            size,
            keyword
        }
    })
}

export const removeCombo = async (id: string) => {
    return await post({
        url: `${API_PATHS.COMBO.removeCombo}/${id}`
    })
}

export const getDetailCombo = async (id: string): Promise<ResponseDataGetDetailCombo> => {
    return await get({
        url: `${API_PATHS.COMBO.getDetailCombo}/${id}`
    })
}

export interface productsProp {
    productId: string,
    quantity: number
}

export const createCombo = async (
    {
        nameCombo,
        description,
        price,
        products,
        imageUrl,
        code,
        quantityCombo
    } : {
        nameCombo: string,
        description: string,
        price: number,
        products: productsProp[],
        imageUrl: File,
        code: string,
        quantityCombo: number
    }
) => {
    const formData = new FormData
    formData.append("nameCombo", nameCombo)
    formData.append("description", description)
    formData.append("price", String(price))
    formData.append("products", JSON.stringify(products))
    formData.append("imageUrl", imageUrl)
    formData.append("code", code)
    formData.append("quantityCombo", String(quantityCombo))
    return await post({
        url: API_PATHS.COMBO.createCombo,
        data: formData
    })
}

export const updateCombo = async (
    {
        nameCombo,
        description,
        price,
        products,
        imageUrl,
        code,
        quantityCombo,
        id
    } : {
        nameCombo: string,
        description: string,
        price: number,
        products: productsProp[],
        imageUrl: File | string,
        code: string,
        quantityCombo: number,
        id: string
    }
) => {
    const formData = new FormData
    formData.append("nameCombo", nameCombo)
    formData.append("description", description)
    formData.append("price", String(price))
    formData.append("products", JSON.stringify(products))
    formData.append("imageUrl", imageUrl)
    formData.append("code", code)
    formData.append("quantityCombo", String(quantityCombo))
    formData.append("id", String(id))
    return await post({
        url: API_PATHS.COMBO.updateCombo,
        data: formData
    })
}