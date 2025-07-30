import { useQuery } from "@tanstack/react-query"
import { getProductByCategory } from "../../../services"
import type { ResponseProduct } from "../../homepages/type"

export const useGetProductByCategory = (
    categoryId: string | null,
    page: number,
    size: number,
    publisherId?: string,
    minPrice?: number,
    maxPrice?: number
) => {
    const {
        isPending: isPendingGetProductByCategory,
        data: ResponseGetProductByCategory
    } = useQuery<ResponseProduct>({
        queryKey: ["getProductByCategory", publisherId, minPrice, maxPrice],
        queryFn: () => getProductByCategory(categoryId!,page,size,publisherId,minPrice,maxPrice),
        retry:false,
        refetchOnWindowFocus: false,
        enabled: !!categoryId
    })

    return {
        isPendingGetProductByCategory,
        ResponseGetProductByCategory
    }
}