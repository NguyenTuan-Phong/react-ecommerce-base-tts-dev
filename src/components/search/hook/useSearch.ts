import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { searchProduct } from "../../../services";

export const useSearch = () => {
  const [dataSearch, setDataSearch] = useState<any>(null);

  const {
    isPending: isPendingSearch,
  } = useMutation({
    mutationKey: ['searchProduct'],
    mutationFn: (keyword: string) => searchProduct(keyword),
  });

  const search = async (keyword: string) => {
    try {
      const res = await searchProduct(keyword);
      setDataSearch(res.data); 
      return res.data;
    } catch (error) {
      console.error("Search error", error);
    }
  };


  return {
    isPendingSearch,
    dataSearch,
    search,
  };
};
