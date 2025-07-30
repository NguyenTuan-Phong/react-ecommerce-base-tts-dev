import { useQuery } from "@tanstack/react-query"
import { getCategory } from "../../../services"
import type { ResponseCategory } from "../type"


export const useGetCategory = (page?: number, size?: number) => {

    const {
        isPending: isPendingGetCategory,
        data: ResponseGetCategory,
        refetch: refetchCategory
    } = useQuery<ResponseCategory> ({
        queryKey: ["getCategory"],
        queryFn:() => getCategory(page,size),
        retry: false,
        refetchOnMount: false,
        refetchOnWindowFocus: false
    })
    return {    
        isPendingGetCategory,
        ResponseGetCategory,
        refetchCategory
    }
}