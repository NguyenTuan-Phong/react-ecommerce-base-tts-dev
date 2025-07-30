import { useQuery } from '@tanstack/react-query';
import { getFlashSaleDetail } from '../../../services';

export const useFlashSaleById = (id: string | undefined) => {
  return useQuery({
    queryKey: ['flashSaleDetail', id],
    queryFn: async () => {
      if (!id) throw new Error("Không có ID flash sale");
      const res = await getFlashSaleDetail(Number(id));
      return res.data; 
    },
    enabled: !!id,
    refetchOnWindowFocus: false,
    retry: false,
  });
};
