/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import {
  updateNotification as updateNotificationApi,
  type UpdateNotificationPayload,
} from '../../../../services/notificationServices';

export const useUpdateNotification = () => {
  const queryClient = useQueryClient();

  const { mutate: updateNotification, isPending } = useMutation({
    mutationFn: async ({ id, payload }: { id: string; payload: UpdateNotificationPayload }) => {
      if (!id) throw new Error('ID không hợp lệ');

      return await updateNotificationApi(id, payload);
    },

    onSuccess: async () => {
      message.success('Cập nhật thông báo thành công');
      await queryClient.invalidateQueries({ queryKey: ['getAllNotification'] });
    },

    onError: (error: any) => {
      console.error('Lỗi khi cập nhật thông báo:', error);
      message.error('Có lỗi xảy ra khi cập nhật thông báo');
    },
  });

  return { updateNotification, isPending };
};
