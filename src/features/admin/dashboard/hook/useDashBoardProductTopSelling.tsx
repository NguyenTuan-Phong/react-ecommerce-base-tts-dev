import { useQuery } from "@tanstack/react-query"
import { dashboardProductTopSelling } from "../../../../services/dashboardServices"

export const useDashBoardTopSelling = (limit: number) => {
    const {
        isPending: isLoadingDashBoardTopSelling,
        data: ResponseDataDashBoardTopSelling
    } = useQuery({
        queryKey: ["useDashBoardTopSelling"],
        queryFn: () => dashboardProductTopSelling(limit),
        refetchOnMount: false,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
        retry: false
    })

    return {
        isLoadingDashBoardTopSelling,
        ResponseDataDashBoardTopSelling
    }
}