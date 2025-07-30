import { useQueries } from "@tanstack/react-query";
import { fetchData } from "../../../services/api";
import type { Category } from "../../../types";

export const useGroupedProductsByCatItems = (categories: Category[]) => {
  const categoryItems = categories.flatMap((cat) => cat.categoryItems || []);

  const uniqueCategoryItems = Array.from(
    new Map(categoryItems.map((item) => [item.id, item])).values()
  );

  const queries = useQueries({
    queries: uniqueCategoryItems.map((item) => ({
      queryKey: ['products-by-categoryItem',item.id],
      queryFn: async () => {
        const res = await fetchData(
          `/products/getByCategoryItem?categoryItemId=${item.id}`
        );
        return res?.data?.content || [];
      },
      enabled: !!item.id,
      staleTime: 5 * 60 * 1000,
    })),
  });

  const isLoading = queries.some((q) => q.isLoading);

  const result: Record<number, any[]> = {};
  uniqueCategoryItems.forEach((item, index) => {
    result[item.id] = queries[index]?.data || [];
  });

  return {
    data: result,
    isLoading,
  };
};
