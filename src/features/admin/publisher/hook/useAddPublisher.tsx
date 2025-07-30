
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPublisher } from "../../../../services";

export const useCreatePublisher = () => {
  const queryClient = useQueryClient();
  const token = localStorage.getItem("token");
  console.log("Token:", token); 


  const {
    mutate: createPublisherMutate,
    isPending: isCreating,
    isSuccess,
    isError,
    error
  } = useMutation({
    mutationFn: (publisherData: any) => createPublisher(publisherData, token!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getAllPublisher"] });
    }  });

  return {
    createPublisherMutate,
    isCreating,
    isSuccess,
    isError,
    error
  };
};
