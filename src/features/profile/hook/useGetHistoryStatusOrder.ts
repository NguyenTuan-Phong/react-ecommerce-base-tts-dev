import { useQuery } from "@tanstack/react-query"
import { getHistoryStatusOrder } from "../../../services"


export const useGetHistoryStatusOrder = (id : string | null) => {
    const {
        isPending: isPendingGetHistoryStatusOrder,
        data: ResponseGetHistoryStatusOrder
    } = useQuery({
        queryKey: ['getHistoryStatusOrder', id],
        queryFn: () => getHistoryStatusOrder(id!),
        enabled: !!id,
        retry: false,
        refetchOnWindowFocus: false
    })


    return {
        isPendingGetHistoryStatusOrder,
        ResponseGetHistoryStatusOrder
    }
}