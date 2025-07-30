import { useQuery } from "@tanstack/react-query"
import { getOrderByStatus } from "../../../services"


export const useGetOrderByStatus = (page: number, size: number, status: number) => {

    const {
         isPending: isPendingGetOrderByStatus,
         data: dataResponseGetOrderByStatus
    } = useQuery({
        queryKey: ['getOrderByStatus', page, size, status],
        queryFn: () => {
            return getOrderByStatus(page, size, status)
        },
        retry: false,
        refetchOnWindowFocus: false
    })
    
    return {
        isPendingGetOrderByStatus,
        dataResponseGetOrderByStatus
    }
}