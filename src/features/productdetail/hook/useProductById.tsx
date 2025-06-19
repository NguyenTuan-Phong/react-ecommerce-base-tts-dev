import { useQuery } from '@tanstack/react-query';
import { fetchData } from '../../../services/api';

export const useProductById = (id: string | undefined) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      if (!id) throw new Error("Không có ID sản phẩm");
      const res = await fetchData(`/products/getById/${id}`);
      return res.data;
    },
    enabled: !!id, // chỉ gọi khi có id
  });
};
