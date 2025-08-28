import { useQuery } from '@tanstack/react-query';
import { getCategory } from '../../../services';

export const useCategories = (page: number, size:number) => {
  // return useQuery({
  //   queryKey: ['categories'],
  //   queryFn: async () => {
  //     const categories = await fetchData('/category/getAllCategories');
  //     useCategoryStore.getState().setCategories(categories);
  //     return categories;
  //   },
  //   retry: false,
  //   refetchOnWindowFocus: false,
  //   refetchOnMount: false,
  // });
  const {
    data,
    isLoading,
    isError
  } = useQuery({
      queryKey: ['categories', page, size],
      queryFn: () => getCategory(page,size),
      retry: false,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
  })

  return{
    data,
    isLoading,
    isError
  }
};