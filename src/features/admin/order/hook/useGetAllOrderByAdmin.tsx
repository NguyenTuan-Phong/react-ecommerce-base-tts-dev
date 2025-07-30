import { useQuery } from "@tanstack/react-query"
import { getAllOrderByAdmin } from "../../../../services"

export const useGetAllOrderByAdmin = (
    page: number, 
    size: number, 
    status?: number, 
    code?: string,
    recipientName?: string,
    recipientPhone?: number,
    shippingAddress?: string,
) => {

    const {
        isPending:isPendingGetALlOrderByAdmin,
        data: ResponseGetAllOrderByAdmin
    } = useQuery({
        queryKey: [
            "getAllOrderByAdmin", 
            page, 
            size, 
            status, 
            code, 
            recipientName, 
            recipientPhone, 
            shippingAddress,
        ],
        queryFn:() =>  getAllOrderByAdmin(
            page, 
            size, 
            status,
            code, 
            recipientName, 
            recipientPhone, 
            shippingAddress,
        ),
        retry: false,
        refetchOnMount: false,
        refetchOnWindowFocus: false
    })

    return {
        isPendingGetALlOrderByAdmin,
        ResponseGetAllOrderByAdmin
    }
}