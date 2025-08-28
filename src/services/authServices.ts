import { post } from '../config/axios-config';
import { API_PATHS } from '../constants/apiPath';
export interface ValueFormRegister {
  email: string;
  password: string;
  fullName: string;
  phoneNumber: string;
  gender: number;
  role: number;
}
export const loginUser = async ({ email, password,fcmToken }: { email: string; password: string;fcmToken?:string }) => {
  return await post({
    url: API_PATHS.AUTH.login,
    data: {
      email,
      password,
      fcmToken
    },
    config: {
      headers: {
        authorization: '',
      },
    },
  });
};

export const registerUser = async ({
  email,
  password,
  fullName,
  phoneNumber,
  gender,
  role,
}: {
  email: string;
  password: string;
  fullName: string;
  phoneNumber: string;
  gender: number;
  role: number;
}) => {
  return await post({
    url: API_PATHS.AUTH.register,
    data: {
      email,
      password,
      fullName,
      phoneNumber,
      gender,
      role,
    },
  });
};
