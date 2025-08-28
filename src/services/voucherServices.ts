import {get, post} from '../config/axios-config';
import {API_PATHS} from '../constants/apiPath';
import type { ResponseDetailVoucher, ResponseVoucher } from '../features/cart/type';

export const getAllVouchers = async (page: number,size: number) : Promise<ResponseVoucher> => {
    return await get({
        url: API_PATHS.VOUCHER.get,
        params: {
            page: page,
            size: size,
        },
    });
};

export const removeVoucher = async (id: string) => {
    return await post({
        url: `${API_PATHS.VOUCHER.remove}/${id}`
    })
}

export const getDetailVoucher = async (id: string) : Promise<ResponseDetailVoucher> => {
    return await get({
        url: `${API_PATHS.VOUCHER.getDetail}/${id}`
    })
}

export interface FormVoucher {
    code: string,
    name: string,
    description: string,
    type: number,
    value: number,
    minOrderAmount: number,
    maxDiscountAmount: number,
    quantity: number,
    usageLimitPerUser: number,
    startDate: string,
    endDate: string,
    isPublic: boolean
}

export const createVoucher = async ({
    code,
    name,
    description,
    type,
    value,
    minOrderAmount,
    maxDiscountAmount,
    quantity,
    usageLimitPerUser,
    startDate,
    endDate,
    isPublic
} : {

    code: string,
    name: string,
    description: string,
    type: number,
    value: number,
    minOrderAmount: number,
    maxDiscountAmount: number,
    quantity: number,
    usageLimitPerUser: number,
    startDate: string,
    endDate: string,
    isPublic: boolean
}) => {
    return await post({
        url : API_PATHS.VOUCHER.create,
        data: {
            code,
            name,
            description,
            type,
            value,
            minOrderAmount,
            maxDiscountAmount,
            quantity,
            usageLimitPerUser,
            startDate,
            endDate,
            isPublic
        }
    })
}


export const updateVoucher = async (id: string,  value : FormVoucher) => {
    return await post({
        url : `${API_PATHS.VOUCHER.update}/${id}`,
        data: value
    })
}