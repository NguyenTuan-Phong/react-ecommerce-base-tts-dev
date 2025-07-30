import { useQuery } from "@tanstack/react-query"
import { getFlashSaleById } from "../../../../services/flashsaleServices"

export const useGetFlashSaleById = (id: string | null) => {
    const {
        isPending: isLoadingGetFlashSaleById,
        data: ResponseFlashSaleById
    } = useQuery({
        queryKey: ["getFlashSaleById", id],
        queryFn: () => getFlashSaleById(id),
        enabled: !!id,
        retry: false,
        refetchOnWindowFocus: false,
    })

    return {
        isLoadingGetFlashSaleById,
        ResponseFlashSaleById
    }
}