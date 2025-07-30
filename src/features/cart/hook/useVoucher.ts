import { useQuery } from "@tanstack/react-query";
import { getAllVouchers } from "../../../services";
import type { ResponseVoucher } from "../type";


export const useVoucher = () => {
  const { isPending, data, refetch } = useQuery<ResponseVoucher> ({
    queryKey: ['vouchers'],
    queryFn: () => getAllVouchers(),
    refetchOnWindowFocus: false,
    retry: false,
    refetchOnMount: false
  });

  return {
    isPending,
    dataVouchers: data,
    refetchVouchers: refetch,
  };
}