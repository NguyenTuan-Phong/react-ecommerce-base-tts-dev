import { create } from "zustand";
import { persist } from "zustand/middleware";
import useCartStore from "./useCartStore";
export interface User {
  username: string
  token: string
  verified: boolean
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
                set({ isLoggedIn: false });
                useCartStore.getState().clearCart();
              },        
            }),
        {
          name: 'user'
        }
    )
)
export default useUserStore