import { useQuery } from '@tanstack/react-query';
import { useCategoryStore } from '../../../store';
import { fetchData } from '../../../services/api';

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const categories = await fetchData('/category/getAllCategories?page=0&size=10&sortBy=id&sortDirection=asc');
      useCategoryStore.getState().setCategories(categories);
      return categories;
    },
  });
};
