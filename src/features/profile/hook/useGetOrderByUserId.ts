import { useQuery } from "@tanstack/react-query"
import { getOrderByUserId } from "../../../services"


export const useGetOrderByUserId = (page: number , size: number, status?: number) => {

    const {
        isPending: isPendingGetOrderByUserId,
        data: ResponseGetOrderByUserId,
        refetch: refetchResponseGetOrderByUserId
    } = useQuery({
        queryKey: ["getOrderByUserId", status, page, size],
        queryFn:() => getOrderByUserId(page, size, status),
        retry: false,
        refetchOnWindowFocus: false
    })

    return {
        isPendingGetOrderByUserId,
        ResponseGetOrderByUserId,
        refetchResponseGetOrderByUserId
    }
}