import { useQuery } from "@tanstack/react-query"
import { getCategoryDetail } from "../../../../services"

export const useGetCategoryDetail = (id: string | null) => {

    const {
        isPending:isPendingGetCategoryDetail,
        data: ResponseCategoryDetail
    } = useQuery({
        queryKey: ["getCategoryMutation", id],
        queryFn:() => getCategoryDetail(id!),
        retry: false,
        enabled: !!id,
        refetchOnMount: false,
        refetchOnWindowFocus: false

    })

    return {
        isPendingGetCategoryDetail,
        ResponseCategoryDetail
    }
}