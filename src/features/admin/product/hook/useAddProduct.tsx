
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProduct } from "../../../../services";

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  const token = localStorage.getItem("token");
  console.log("Token:", token); 


  const {
    mutate: createProductMutate,
    isPending: isCreating,
    isSuccess,
    isError,
    error
  } = useMutation({
    mutationFn: (productData: any) => createProduct(productData, token!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getAllProduct"] });
    }  });

  return {
    createProductMutate,
    isCreating,
    isSuccess,
    isError,
    error
  };
};
