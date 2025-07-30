import { get, post } from '../config/axios-config';
import { API_PATHS } from '../constants/apiPath';
import type { ResponsiveData } from '../features/profile/hook/useInfoUser';
import type { ResponseDataOrder } from '../features/profile/type';
import type { ResponseGetHistoryStatusOrder } from '../types';

export const getInfoUser = async (): Promise<ResponsiveData> => {
  return await get({
    url: API_PATHS.USER.get,
  });
};

export const changePassword = async ({
  newPassword,
  confirmPassword,
} : {
  newPassword: string;
  confirmPassword: string;
})=> {
  return await post({
    url: API_PATHS.USER.changePassword,
    data: {
      newPassword,
      confirmPassword
    }
  });
}

export const getAllOrder = async (page: number, size: number) : Promise<ResponseDataOrder> => {
  return await get({
    url: API_PATHS.USER.getAllOrder,
    params: {
      page: page,
      size: size
    }
  })
}

export const getOrderByStatus = async (page: number, size: number, status: number) : Promise<ResponseDataOrder> => {
  return await get({
    url: API_PATHS.USER.getOrderByStatus,
    params: {
      page: page,
      size: size,
      status: status
    }
  })
}

export const getHistoryStatusOrder = async (id:string) : Promise<ResponseGetHistoryStatusOrder> => {
  return await get({
    url: `${API_PATHS.USER.getHistoryStatusOrder}/${id}`
  })
}


export const getOrderByUserId = async (page: number, size: number,status?: number) : Promise<ResponseDataOrder> => {
  
  const params: any = { page, size };
  if (status !== undefined) {
    params.status = status;
  }

  return await get({
    url: API_PATHS.USER.getOrderByUserId,
    params
  })
}