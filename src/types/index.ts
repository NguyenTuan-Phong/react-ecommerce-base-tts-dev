export interface ApiResponse<T> {
  data: T;
  message: string;
  status: number;
}

export interface FormSendOTPForget {
  email: string
}

export interface FormForget {
  email: string,
  otp: number,
  newPassword: string,
  confirmPassword: string
}

export interface LoginForm  {
    email: string,
    password: string
}

export interface Category {
  type: number | Category | null | undefined;
  id: number;
  name: string;
  description: string;
}

export type Product =  {
        id: number,
        name: string,
        imageUrl: string,
        price: number,
        code:string,
        rating:number,
        color: string|null,
        size:number|null,
        quantity: number,
        isActive: 0|1,
        publisher: {
            id: number,
            name:string,
            description:string,
            isActive: 0|1,
        },
        categories: [
            {
                 id: number,
                name:string,
                description:string,
                isActive: 0|1,
              
            }
        ],
        feedbackStats: string|null,
    };

export interface FormLogin  {
  email: string,
  password: string
}

export interface FormRegister  {
  email: string,
  fullName: string,
  phoneNumber: string,
  gender: number,
  password: string,
  role: number
}

export interface LoginResponseData {
  fullname: string;
  accessToken: string;
  verified?: boolean;
}
