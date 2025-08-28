import { post } from "../config/axios-config"
import { API_PATHS } from "../constants/apiPath"
import type { ResponseSearchProductByImage } from "../features/homepages/type"

export const searchProductByImage = async (
    {
        embedding
    }: {
        embedding: number[]
    }

):Promise<ResponseSearchProductByImage> => {
    return await post({
        url: API_PATHS.SEARCH.searchProductByImage,
        data: {
            embedding
        }
    })
}