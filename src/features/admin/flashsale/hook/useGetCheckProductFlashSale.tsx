import { useQuery } from "@tanstack/react-query"
import { getCheckProductFlashSale } from "../../../../services/flashsaleServices"

export const useGetCheckProductFlashSale = (
    startTime: string, 
    endTime: string,
    page: number,
    size: number
) => {
    const {
        isPending: isLoadingGetCheckProductFlashSale,
        data: ResponseDataGetProductFlashSale
    } = useQuery({
        queryKey: ["useGetCheckProductFlashSale", startTime, endTime, page,size],
        queryFn:() => getCheckProductFlashSale(startTime, endTime, page, size),
        retry: false,
        refetchOnReconnect: false,
        refetchOnMount:false,
        refetchOnWindowFocus: false
    })

    return {
        isLoadingGetCheckProductFlashSale,
        ResponseDataGetProductFlashSale
    }
}