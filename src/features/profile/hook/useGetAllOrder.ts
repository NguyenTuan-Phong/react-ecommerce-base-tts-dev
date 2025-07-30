import { useQuery } from "@tanstack/react-query"
import { getAllOrder } from "../../../services"

export const useGetAllOrder = (page: number, size: number) => {

    const {
        isPending: isPendingGetAllOrder,
        data: dataResponseGetAllOrder
    } = useQuery({
        queryKey: ['getAllOrder', page, size],
        queryFn: () => {
            return getAllOrder(page, size)
        },
        retry: false,
        refetchOnWindowFocus: false
    })

    return {
        isPendingGetAllOrder,
        dataResponseGetAllOrder,
    }
}