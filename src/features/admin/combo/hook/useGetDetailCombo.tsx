import { useQuery } from "@tanstack/react-query"
import { getDetailCombo } from "../../../../services/comboServices"

export const useGetDetailCombo = (id: string | undefined) => {
    const {
        isPending: isLoadingGetDetailCombo,
        data: ResponseDataGetDetailCombo
    } = useQuery({
        queryKey: ["useGetDetailCombo", id],
        queryFn: () => getDetailCombo(id!),
        enabled: !!id,
        retry: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false
    })

    return{
        isLoadingGetDetailCombo,
        ResponseDataGetDetailCombo
    }
}