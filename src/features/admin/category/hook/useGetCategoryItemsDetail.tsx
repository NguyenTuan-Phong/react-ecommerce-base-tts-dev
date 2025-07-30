import { useQuery } from "@tanstack/react-query"
import { getCategoryDetailItems } from "../../../../services"

export const useGetCategoryItemsDetail = (id: string | null) => {

    const {
        isPending: isPendingGetCategoryItemsDetail,
        data: ResponseGetCategoryItemsDetail
    } = useQuery({
        queryKey: ["getCategoryItemsDetail", id],
        queryFn:() => getCategoryDetailItems(id!),
        enabled: !! id,
        retry: false,
        refetchOnMount: false,
        refetchOnWindowFocus: false
    })

    return {
        isPendingGetCategoryItemsDetail,
        ResponseGetCategoryItemsDetail
    }
}