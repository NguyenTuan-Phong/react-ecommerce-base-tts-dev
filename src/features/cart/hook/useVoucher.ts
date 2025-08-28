import { useQuery } from "@tanstack/react-query";
import { getAllVouchers } from "../../../services";


export const useVoucher = (page: number, size: number) => {
  const { isPending, data, refetch } = useQuery ({
    queryKey: ['vouchers',page,size],
    queryFn: () => getAllVouchers(page,size),
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