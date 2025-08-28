import axios from 'axios';
import { get, post } from '../config/axios-config';
import { API_PATHS } from '../constants/apiPath';
import type { ResponseNotification } from '../types';
export interface UpdateNotificationPayload {
  title?: string;
  description?: string;
  imageUrl?: File | string;
}
export const createNotification = async (
  {
    title,
    description,
    imageUrl,
  }: {
    title: string;
    description: string;
    imageUrl: File;
  },
  token: string,
) => {
  const formData = new FormData();
  formData.append('title', title);
  formData.append('description', description);
  formData.append('imageUrl', imageUrl);

  return await post({
    url: API_PATHS.NOTIFICATION.createNotification,
    data: formData,
    config: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });
};

export const getAllNotification = async (
  page: number,
  size: number,
): Promise<ResponseNotification> => {
  const params = {
    page,
    size,
  };

  return await get({
    url: `${API_PATHS.NOTIFICATION.getAllNotification}`,
    params,
  });
};

export const sendNotificationToAll = async (
  id: number,
  token: string,
): Promise<ResponseNotification> => {
  const response = await axios.post(
    `http://113.161.103.134:8050/api/v1/notifications/send/${id}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data;
};

export const deleteNotification = async (id: string) => {
  return await post({
    url: `${API_PATHS.NOTIFICATION.deleteNotification}/${id}`,
  });
};

export const updateNotification = async (id: string, payload: UpdateNotificationPayload) => {
  const token = localStorage.getItem('token');
  const formData = new FormData();

  const requestPayload = {
    id,
    title: payload.title,
    description: payload.description,
  };

  console.log('Sending payload:', requestPayload);

  const blob = new Blob([JSON.stringify(requestPayload)], {
    type: 'application/json',
  });
  formData.append('request', blob);

  if (payload.imageUrl instanceof File) {
    formData.append('imageUrl', payload.imageUrl);
  } else {
    formData.append('imageUrl', new File([], ''));
  }

  for (const [key, value] of formData.entries()) {
    console.log(`${key}:`, value);
  }

  return await post({
    url: API_PATHS.NOTIFICATION.updateNotification,
    data: formData,
    config: {
      headers: { Authorization: `Bearer ${token}` },
    },
  });
};
