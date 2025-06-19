import { useQuery } from '@tanstack/react-query';
import { useProductStore } from '../../../store';
import { fetchData } from '../../../services/api';

const categoryIds = [1]; // truyền nhiều danh mục ở đây

export const useProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const allProducts: any[] = [];

      for (const id of categoryIds) {
        const res = await fetchData(`/products/getByCategoryItem/${id}?page=0&size=10&sortBy=id&sortDirection=asc`);
        if (res?.data?.content) {
          allProducts.push(...res.data.content);
        }
      }

     useProductStore.getState().setProducts(allProducts);
      return { data: { content: allProducts } };
    },
  });
};

