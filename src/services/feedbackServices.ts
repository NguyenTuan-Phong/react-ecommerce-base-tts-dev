import { get, post } from '../config/axios-config'
import { API_PATHS } from '../constants/apiPath'
import type { ResponseGetFeedbackByProductId } from '../features/feedback/type'

export const getFeedbackByProductId = async (
    page: number, 
    size: number, 
    productId: string
) : Promise<ResponseGetFeedbackByProductId> => {
    return await get({
        url: API_PATHS.FEEDBACK.getFeedbackByProductId,
        params: {
            page: page,
            size: size,
            productId: productId
        }
    })
}

export const createFeedback = async (
    {
        productId,
        userId,
        rating,
        content
    } : {
        productId: string,
        userId: string,
        rating: number,
        content: string
    }
) => {
    return await post({
        url: API_PATHS.FEEDBACK.createFeedback,
        data: {
            productId,
            userId,
            rating,
            content
        }
    })
}

export const removeFeedback = async (id:  string) => {
    return await post({
        url: `${API_PATHS.FEEDBACK.removeFeedback}/${id}`,

    })
}

export const updateFeedback = async (
    {
        id,
        rating,
        content
    } : {
        id : string,
        rating:  number,
        content:  string
    }
) => {
    return await post({
        url: API_PATHS.FEEDBACK.updateFeedback,
        data: {
            id,
            rating,
            content
        }
    })
}