import { useQuery } from "@tanstack/react-query";
import { getDetailVoucher } from "../../../../services/voucherServices";
import type { ResponseDetailVoucher} from "../../../cart/type";

export const useViewDetailVoucher = (id: string | null) => {
    const {
        isPending: isPendingGetDetailVoucher,
        data: ResponseGetDetailVoucher
    } = useQuery<ResponseDetailVoucher>({
        queryKey: ['voucher', id],
        queryFn: () => getDetailVoucher(id!),
        enabled: !!id,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        retry: false
    })

    return {
        isPendingGetDetailVoucher,
        ResponseGetDetailVoucher
    }
}