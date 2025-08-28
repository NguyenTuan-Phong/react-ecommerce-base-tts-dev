// features/product/hooks/useGetAllFlashSale.ts
import { useQuery } from "@tanstack/react-query";
import type { ResponseFlashSale, FlashSaleProduct } from "../../../types";
import { getAllFlashSale } from "../../../services";

export const useGetAllFlashSale = (
  page: number = 0,
  size: number = 50
) => {
  const {
    data: allFlashSaleData,
    isPending: isLoadingAllFlashSale,
    error,
  // } = useQuery<ResponseFlashSale>({
  } = useQuery<ResponseFlashSale>({
    queryKey: ["getAllFlashSale", page, size],
    queryFn: () => getAllFlashSale(page, size),
    retry: false,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });

  const now = new Date();
  const validFlashSales = allFlashSaleData?.data?.content.filter(
    (fs) => new Date(fs.endTime) > now
  ) || [];

  const allValidProducts = validFlashSales.flatMap(
    (fs) => fs.products ?? []
  );

  const uniqueMap = new Map<string, FlashSaleProduct>();
  allValidProducts.forEach((product) => {
    if (product?.productId && !uniqueMap.has(product.productId)) {
      uniqueMap.set(product.productId, product);
    }
  });

  const validFlashSaleProducts = Array.from(uniqueMap.values());

  return {
    allFlashSaleData, 
    validFlashSaleProducts, 
    isLoadingAllFlashSale,
    error,
  };
};
