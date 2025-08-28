import { useQuery } from "@tanstack/react-query"
import { compareProduct } from "../../../services/compareServices"

export const useComapreProduct = (listId: string) => {
    const {
        isPending: isLoadingCallProduct,
        data : ResponseDataComapreProduct
    } = useQuery({
        queryKey: ["useComapreProduct", listId],
        queryFn: () => compareProduct(listId),
        retry : false,
        refetchOnMount: false,
        refetchOnReconnect: false,
        refetchOnWindowFocus:false
    })

    return {
        isLoadingCallProduct,
        ResponseDataComapreProduct
    }
}