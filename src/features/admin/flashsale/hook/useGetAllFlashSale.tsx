import { useQuery } from "@tanstack/react-query"
import { getAllFlashSale } from "../../../../services/flashsaleServices"

export const useGetAllFlashSale = (
    page: number,
    size: number,
    name?: string | undefined,
    startTime?: string | undefined,
    endTime?: string | undefined
) => {
    const {
        isPending: isLoadingGetAllFlashSale,
        data: ResponseFlashSale,
        refetch: refetchFlashSale
    } = useQuery({
        queryKey: ["getAllFlashSale", page, size, name, startTime, endTime],
        queryFn: () => getAllFlashSale(page, size, name, startTime, endTime),
        retry: false,
        refetchOnMount: false,
        refetchOnWindowFocus: false
    })

    return {
        isLoadingGetAllFlashSale,
        ResponseFlashSale,
        refetchFlashSale
    }
}