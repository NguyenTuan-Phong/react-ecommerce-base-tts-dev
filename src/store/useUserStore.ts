import { create } from "zustand";
import { persist } from "zustand/middleware";
import useCartStore from "./useCartStore";
export interface User {
  username: string
  token: string
  verified: boolean
  role :  Role
  id: string 
  email: string 
  phoneNumber: string
  fullName: string
  gender: number
  address: string | null
  dateOfBirth: string | null
  statusUser: number | null
  refreshToken: string
}

export interface Role {
  name: string
  permissions: Permissions[]
}

export interface Permissions {
  id: string,
  permissionKey: string
}

interface UserStore {
  user: User | null,
  login: (user: User) => void
  logout: () => void
  isLoggedIn: boolean
}
const useUserStore = create<UserStore>() (
    persist (
        (set) => ({
            user: null,
            isLoggedIn: false,
            login: (user) => set(() => ({ user, isLoggedIn: true })),
            logout: () => {
                set({ isLoggedIn: false, user: null });
                useCartStore.getState().clearCart();
              },        
            }),
        {
          name: 'user'
        }
    )
)
export default useUserStore