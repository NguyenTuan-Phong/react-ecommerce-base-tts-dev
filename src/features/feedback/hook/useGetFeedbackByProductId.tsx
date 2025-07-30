import { useQuery } from "@tanstack/react-query"
import { getFeedbackByProductId } from "../../../services/feedbackServices"

export const useGetFeedbackByProductId = (
        page: number,
        size: number,
        productId: string ) => {
    const {
        isPending: isPendingGetFeedbackByProductId,
        data : ResponseGetFeedbackByProductId,
        refetch: refetchGetFeedbackByProductId
    } = useQuery({
        queryKey: ["getFeedbackByProductId", productId, page, size],
        queryFn:() => getFeedbackByProductId(page, size, productId),
        retry: false,
        refetchOnWindowFocus:false
    })


    return {
        isPendingGetFeedbackByProductId,
        ResponseGetFeedbackByProductId,
        refetchGetFeedbackByProductId
    }
}