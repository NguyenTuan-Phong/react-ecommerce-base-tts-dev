// hooks/useValidFlashSaleProducts.ts
import { useMemo } from 'react';
import dayjs from 'dayjs';
import type { FlashSaleProduct } from '../../../types';
import { useGetAllFlashSale } from './GetAllFlashSale';

export const useFlashSaleProducts = (page = 0, size = 50) => {
  const { allFlashSaleData, isLoadingAllFlashSale } = useGetAllFlashSale(page, size);

  const flashSaleProducts: FlashSaleProduct[] = useMemo(() => {
    if (!allFlashSaleData?.data?.content) return [];

    const now = dayjs();
    const validFlashSales = allFlashSaleData.data.content.filter((flashSale) => {
      const start = dayjs(flashSale.startTime);
      const end = dayjs(flashSale.endTime);
      return flashSale.active && now.isAfter(start) && now.isBefore(end);
    });

    const allValidProducts = validFlashSales.flatMap((flashSale) => flashSale.products ?? []);
    const uniqueMap = new Map<string, FlashSaleProduct>();

    allValidProducts.forEach((product) => {
      if (product?.productId && !uniqueMap.has(product.productId)) {
        uniqueMap.set(product.productId, product);
      }
    });

    return Array.from(uniqueMap.values());
  }, [allFlashSaleData]);

  return { flashSaleProducts, isLoadingAllFlashSale };
};
