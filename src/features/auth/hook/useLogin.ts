import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { loginUser } from '../../../services';
import useUserStore from '../../../store/useUserStore';
import type { FormLogin } from '../../../types';
import useInfoUser from '../../profile/hook/useInfoUser';

export const useLogin = () => {
  const navigate = useNavigate();
  const { refetch } = useInfoUser();
  const { isPending, mutateAsync: loginMutation } = useMutation({
    mutationKey: ['loginUser'],
    mutationFn: loginUser,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onSuccess: async (data: any) => {
      const token = data?.data?.accessToken;
      console.log(token);
      
      localStorage.setItem("token", token);
      const user = {
        username: data.data.fullName || '',
        token: data?.data?.accessToken,
        verified: data?.data?.verified || false,
        role: { name: '', permissions: [] },
        id: '',
        email: '',
        phoneNumber: '',
        fullName: '',
        gender: 0,
        address: '',
        dateOfBirth: '',
        statusUser: 1,
        refreshToken: data.data.refreshToken
      };

      useUserStore.getState().login(user);
      await new Promise((resolve) => setTimeout(resolve, 0));

      try {
        const result = await refetch();

        const userData = result?.data;

        if (userData) {
          const userLocalStorage = {
            username: userData.data.fullName,
            token: data?.data?.accessToken,
            verified: data?.data?.verified || false,
            role: userData.data.role,
            id: userData.data.id,
            email: userData.data.email,
            phoneNumber: userData.data.phoneNumber,
            fullName: userData.data.fullName,
            gender: userData.data.gender,
            address: userData.data.address,
            dateOfBirth: userData.data.dateOfBirth,
            statusUser: userData.data.statusUser,
            refreshToken: data.data.refreshToken
          };
          useUserStore.getState().login(userLocalStorage);
          const role = useUserStore.getState().user?.role.name;
          if (role === "ROLE_MANAGER") {
            navigate('/dashboard');
          } else {
            navigate('/');
          }
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        toast.error(error.message || 'Đăng nhập thất bại,vui lòng thử lại!');
      }
    },
    onError: (err: Error) => {
      toast.error(err.message || 'Đăng nhập thất bại, vui lòng đăng nhập lại');
    },
  });

  const handleLogin = async (value: FormLogin) => {
    await loginMutation(value);
  };

  return { handleLogin, isPending };
};
