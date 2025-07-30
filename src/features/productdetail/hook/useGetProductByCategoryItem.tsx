import { useQuery } from "@tanstack/react-query"
import { getProductByCategoryItem } from "../../../services"
import type { ResponseProduct } from "../../homepages/type"

export const useGetProductByCategoryItem = (
    id: string,
    page: number,
    size: number,
    publisherId?: string | undefined,
    minPrice?: number | undefined,
    maxPrice?: number | undefined
) => {

    const {
        isPending: isPendingGetProductByCategoryItem,
        data: ResponseProductByCategoryItem
    } = useQuery<ResponseProduct>({
        queryKey: ["getProductByCategoryItem", id, publisherId, minPrice, maxPrice],
        queryFn: () => getProductByCategoryItem(id!, page, size, publisherId, minPrice, maxPrice),
        retry: false,
        refetchOnMount:false,
        refetchOnWindowFocus:false,
        enabled: !!id
    })

    return{
        isPendingGetProductByCategoryItem,
        ResponseProductByCategoryItem
    }
}