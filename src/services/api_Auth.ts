import { post } from "../config/axios-config";

export const loginUser = async ({
  email, 
  password, 
} : {
  email:string; 
  password: string
}) => {
  return await post({
    url:"auth/authenticate",
    data: {
      email,
      password
    }
  })
}


export interface ValueFormRegister {
  email: string,
  password: string,
  fullName: string,
  phoneNumber: string,
  gender: number,
  role: number
}

export const registerUser = async ({
  email,
  password,
  fullName,
  phoneNumber,
  gender,
  role
} : {
  email: string,
  password: string,
  fullName: string,
  phoneNumber: string,
  gender: number,
  role: number
}) => {
  return await post({
    url: "auth/register",
    data: {
      email,
      password,
      fullName,
      phoneNumber,
      gender,
      role
    }
  })
}
