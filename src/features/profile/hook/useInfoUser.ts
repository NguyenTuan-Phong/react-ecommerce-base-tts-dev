import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { getInfoUser, sendOTPVerification, verifyOTP } from '../../../services';
import useUserStore, { type Role } from '../../../store/useUserStore';
export interface ResponsiveData {
  data: {
    fullName: string;
    email: string;
    phoneNumber: string;
    address: string | null;
    dateOfBirth: string | null;
    statusUser: number;
    role: Role;
    id: string;
    gender: number;
  };
}

export interface FormSendOTPVerifyAccount {
  email: string;
}

export interface FormVerifyAccount {
  email: string;
  otp: string;
}

const useInfoUser = () => {
  const token = useUserStore((state) => state.user?.token);
  const [isOpenModalSendOTPVerifyAccount, setIsOpenModalSendOTPVerifyAccount] = useState(false);
  const [isOpenModalVerifyAccount, setIsOpenModalVerifyAccount] = useState(false);
  // api call profile
  const {
    isPending,
    data: dataUser,
    refetch,
  } = useQuery({
    queryKey: ['fetchUserInfo', token],
    queryFn: getInfoUser,
    enabled: !!token,
    refetchOnWindowFocus: false,
    retry: false,
    refetchOnMount: false
  });

  //api call send OTP Verify Account
  const { isPending: isPendingSendOTPVerifyAccount, mutateAsync: SendOTPVerifyAccountMudation } =
    useMutation({
      mutationKey: ['sendOTPVerifyAccount'],
      mutationFn: sendOTPVerification,
      onSuccess: async () => {
        setIsOpenModalSendOTPVerifyAccount(false);
        setIsOpenModalVerifyAccount(true);
      },
      onError: (err: Error) => {
        toast.error(err.message || 'Có lỗi xảy ra vui lòng thực hiện lại');
      },
    });

  const showModalSendOTPVerifyAccount = () => {
    setIsOpenModalSendOTPVerifyAccount(true);
  };

  const sendOTPVerifyAccount = (value: FormSendOTPVerifyAccount) => {
    SendOTPVerifyAccountMudation(value);
  };
  const cancelModalSendOTPVerifyAccount = () => {
    setIsOpenModalSendOTPVerifyAccount(false);
  };

  // api verify account
  const { isPending: isPendingVerifyAccount, mutateAsync: verifyAccountMutation } = useMutation({
    mutationKey: ['verifyAccount'],
    mutationFn: verifyOTP,
    onSuccess: () => {
      setIsOpenModalVerifyAccount(false);
    },
    onError: (err: Error) => {
      toast.error(err.message || 'Có lỗi xảy ra vui lòng thử lại.');
    },
  });

  const verifyAccount = (value: FormVerifyAccount) => {
    verifyAccountMutation(value);
  };

  const cancelModalVerifyAccount = () => {
    setIsOpenModalVerifyAccount(false);
  };

  return {
    isPending,
    dataUser,
    isPendingSendOTPVerifyAccount,
    sendOTPVerifyAccount,
    isOpenModalSendOTPVerifyAccount,
    showModalSendOTPVerifyAccount,
    isOpenModalVerifyAccount,
    setIsOpenModalVerifyAccount,
    verifyAccount,
    isPendingVerifyAccount,
    cancelModalSendOTPVerifyAccount,
    cancelModalVerifyAccount,
    refetch,
  };
};

export default useInfoUser;
