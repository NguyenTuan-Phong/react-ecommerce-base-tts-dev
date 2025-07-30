import { post } from '../config/axios-config';
import { API_PATHS } from '../constants/apiPath';

export const sendOTPVerification = async ({ email }: { email: string }) => {
  return await post({
    url: API_PATHS.AUTH.sendVerificationOTP,
    data: {
      email,
    },
  });
};

export const verifyOTP = async ({ email, otp }: { email: string; otp: string }) => {
  return await post({
    url: API_PATHS.AUTH.verifyAccount,
    data: {
      email,
      otp,
    },
  });
};

export const sendOTPForgotPassword = async ({ email }: { email: string }) => {
  return await post({
    url: API_PATHS.AUTH.sendForgotPassword,
    data: {
      email,
    },
  });
};

export const verifyOTPForgotPassword = async ({
  email,
  otp,
  newPassword,
  confirmPassword,
}: {
  email: string;
  otp: number;
  newPassword: string;
  confirmPassword: string;
}) => {
  return await post({
    url: API_PATHS.AUTH.forgotPassword,
    data: {
      email,
      otp,
      newPassword,
      confirmPassword,
    },
  });
};
