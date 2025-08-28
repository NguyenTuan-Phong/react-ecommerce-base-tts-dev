import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNotification } from "../../../../services/notificationServices";

export const useAddNotification = () => {
  const queryClient = useQueryClient();
  const token = localStorage.getItem("token");
  const {
    mutate: createNotificationMutate,
    isPending: isCreating,
    isSuccess,
    isError,
    error
  } = useMutation({
    mutationFn: (notification: any) =>
      createNotification(
        { 
          ...notification, 
           
        },
        token!
      ),
    onSuccess: () => {
     queryClient.refetchQueries({
        queryKey: ["getAllNotification"],
        exact: false
      });
    }  });

  return {
    createNotificationMutate,
    isCreating,
    isSuccess,
    isError,
    error
  };
};