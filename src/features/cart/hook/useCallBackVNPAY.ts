import { useQuery } from "@tanstack/react-query"
import { getVNPAYCallbackUrl } from "../../../services/vnpayServices"

export const useCallBackVNPAY = (url: string) => {
    const {
        isPending,
        data: vnpayCallbackData,
    } = useQuery({
        queryKey: ['vnpayCallback', url],
        queryFn: () => getVNPAYCallbackUrl(url),
        enabled: !!url,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        retry: false,
        refetchOnMount: false,
    })

    return {
        isPending,
        vnpayCallbackData
    }

}