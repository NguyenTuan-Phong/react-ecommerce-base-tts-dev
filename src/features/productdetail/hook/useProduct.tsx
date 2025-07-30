import { useQuery } from '@tanstack/react-query';
import { fetchData } from '../../../services/api';

interface Category {
  id: number;
  name: string;
  categoryItems: { id: number; name: string }[];
}

export const useProducts = (categories: Category[]) => {
  const categoryIds = categories.map(cat => cat.id);

  return useQuery({
    queryKey: ['products-grouped-by-parent', categoryIds], 
    queryFn: async () => {
      const result: Record<number, any[]> = {};

      await Promise.all(
        categories.map(async (category) => {
          const res = await fetchData(
            `/products/getByCategory?categoryId=${category.id}`
          );
          result[category.id] = res?.data?.content || [];
        })
      );

      return result;
    },
    enabled: categoryIds.length > 0,
    refetchOnWindowFocus: false,
    retry: false,
    refetchOnMount: false
  });
};
