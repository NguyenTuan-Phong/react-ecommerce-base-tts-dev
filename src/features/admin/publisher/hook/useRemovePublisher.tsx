import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removePublisher } from "../../../../services";

export const useRemovePublisher = () => {
  const queryClient = useQueryClient();

  const {
    mutate: removePublisherMutate,
    isPending: isRemoving,
    isSuccess,
    isError,
    error,
  } = useMutation({
    mutationFn: (id: string) => removePublisher(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) =>
          query.queryKey[0] === "getAllPublisher",
      });
    },
  });

  return {
    removePublisherMutate,
    isRemoving,
    isSuccess,
    isError,
    error,
  };
};
