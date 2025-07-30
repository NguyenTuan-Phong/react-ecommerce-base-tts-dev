import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { clearItemsCart, getCartData, removeItemsCart } from '../../../services';
import useUserStore from '../../../store/useUserStore';
export const useCart = () => {
  const userId = useUserStore((state) => state.user?.id);

  const { isPending, data, refetch } = useQuery({
    queryKey: ['cartItems', userId ?? 'no-user'],
    queryFn: () => {
      if (!userId) throw new Error('Missing userId');
      return getCartData(userId);
    },
    refetchOnWindowFocus: false,
    retry: false,
    enabled: !!userId,
    refetchOnMount:false
  });
  //  remove items
  const { isPending: isPendingRemoveProduct, mutateAsync: removeProductMutation } = useMutation({
    mutationKey: ['removeProduct'],
    mutationFn: ({id, productId }: {id:string, productId: string }) =>
      removeItemsCart(id,productId),
    onError: (err: Error) => {
      toast.error(err.message || 'Có lỗi xảy ra vui òng thử lại sau ít phút!');
    },
    onSuccess: () => {
      refetch();
    }
  });

  const handleRemoveProduct = (id: string, productId: string) => {
    removeProductMutation({ id, productId });
  };
  // clear items
  const { isPending: isPendingClearCart, mutateAsync: clearCartMutation } = useMutation({
    mutationKey: ['clearCart'],
    mutationFn: ({ userId }: { userId: string }) => clearItemsCart(userId),
    onError: (err: Error) => {
      toast.error(err.message || 'Có lỗi xảy ra vui òng thử lại sau ít phút!');
    },
    onSuccess: () => {
      refetch();
    }
  });

  const handleClearCart = (userId: string) => {
    clearCartMutation({ userId });
  };
  return {
    isPending,
    dataCartItem: data,
    refetchCart: refetch,
    isPendingRemoveProduct,
    handleRemoveProduct,
    handleClearCart,
    isPendingClearCart,
  };
};
