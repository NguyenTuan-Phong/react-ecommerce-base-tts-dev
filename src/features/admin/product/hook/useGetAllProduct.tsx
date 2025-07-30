// features/product/hooks/useGetAllProducts.ts
import { useQuery } from "@tanstack/react-query";
import { getAllProduct } from "../../../../services/productServices";
import type { ResponseProduct } from "../../../homepages/type";

export const useGetAllProducts = (
  page: number = 0,
  size: number = 5,
  sort: string = "createdAt,desc",
  nameProduct?: string
) => {
  const {
    data: allProductsData,
    isPending: isLoadingAllProducts,
    error,
  } = useQuery<ResponseProduct>({
    queryKey: ["getAllProduct", page, size, sort, nameProduct],
    queryFn: () => getAllProduct(page,size,sort, nameProduct), 
    retry: false,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });


  return {
    allProductsData,
    isLoadingAllProducts,
    error,
  };
};
