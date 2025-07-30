import { useQuery } from "@tanstack/react-query"
import type { ResponsePublishers } from "../../homepages/type"
import { getAllPublisher } from "../../../services"


export const useGetPublishers = (page: number, size: number) => {

    const {
        isPending: isPendingPublishers,
        data: ResponseGetPublisher
    } = useQuery<ResponsePublishers>({
        queryKey: ["getPublishers"],
        queryFn: () => getAllPublisher(page, size),
        retry: false,
        refetchOnWindowFocus: false,
        refetchOnMount: false
    })

    return {
        isPendingPublishers,
        ResponseGetPublisher
    }
}