import { useQuery } from "@tanstack/react-query"
import { dashboardRevenueSales } from "../../../../services/dashboardServices"

export const useDashBoardRevenueSales = (year: number, month: number) => {
    const {
        isPending: isLoadingDashBoardRevenueSales,
        data: ResponseDataDashBoardRevenueSales
    } = useQuery({
        queryKey: ["useDashBoardRevenueSales"],
        queryFn: () => dashboardRevenueSales(year, month),
        refetchOnMount: false,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
        retry: false
    })

    return {
        isLoadingDashBoardRevenueSales,
        ResponseDataDashBoardRevenueSales
    }
}