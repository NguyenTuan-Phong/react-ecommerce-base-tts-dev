import { useQuery } from '@tanstack/react-query';
import { useCategoryStore } from '../../../store';
import { fetchData } from '../../../services/api';

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const categories = await fetchData('/category/getAllCategories');
      useCategoryStore.getState().setCategories(categories);
      return categories;
    },
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};
