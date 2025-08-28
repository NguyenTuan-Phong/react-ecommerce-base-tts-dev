import { useQuery } from "@tanstack/react-query"
import { dashboardViewHistoryOrder } from "../../../../services/dashboardServices"

export const useDashBoardViewTableHistoryOrder = (limit: number) => {
    const {
        isPending: isLoadingDashBoardViewTableHistoryOrder,
        data: ResponseDashBoardViewTableHistoryOrder
    } = useQuery({
        queryKey: ["useDashBoardViewTableHistoryOrder"],
        queryFn:() =>  dashboardViewHistoryOrder(limit),
        refetchOnMount: false,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
        retry: false
    })

    return {
        isLoadingDashBoardViewTableHistoryOrder,
        ResponseDashBoardViewTableHistoryOrder
    }
}