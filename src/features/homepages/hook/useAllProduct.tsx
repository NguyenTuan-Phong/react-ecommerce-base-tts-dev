import { useQuery } from "@tanstack/react-query"
import { getAllProduct } from "../../../services"
import { useMemo } from "react"
import type { ResponseProduct } from "../type"

export const useAllProduct = (page: number, size: number,sort: string = '') => {
    
    const {
        isPending: isPendingGetAllProduct,
        data: responseProduct
    } = useQuery<ResponseProduct>({
        queryKey: ['get-all-product', page, size,sort],
        queryFn: () => getAllProduct(page, size,sort),
        retry: false,
        refetchOnMount: false,
        refetchOnWindowFocus: false
    })

    const getRandom10Product = useMemo(() => {
        const products = responseProduct?.data?.content;
        if (!products?.length) return [];

        const shuffled = [...products].sort(() => Math.random() - 0.5);
        return shuffled.slice(0, 10);
    }, [responseProduct]);

    return {
        isPendingGetAllProduct,
        getRandom10Product,
        responseProduct
    }
}