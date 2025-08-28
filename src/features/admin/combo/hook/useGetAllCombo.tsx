import { useQuery } from "@tanstack/react-query"
import { getAllCombo } from "../../../../services/comboServices"

export const useGetAllCombo = (
    page: number,
    size: number,
    keyword?: string
) => {
    const {
        isPending: isLoadingGetAllCombo,
        data: ResponseDataGetAllCombo,
        refetch: refetchDataGetAllCombo
    } = useQuery({
        queryKey: ["useGetAllCombo", page, size, keyword],
        queryFn: () => getAllCombo(page, size, keyword),
        retry: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false
    })

    return{
        isLoadingGetAllCombo,
        ResponseDataGetAllCombo,
        refetchDataGetAllCombo
    }
}