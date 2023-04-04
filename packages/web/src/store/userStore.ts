import { create } from "zustand";
import { persist } from "zustand/middleware";

type User = {
  id: string;
  isSpectator: boolean;
  name: string;
  roomId: string;
  socketId: string;
  selectedCard?: string;
};

interface UserStore {
  user?: User;
  updateUser: (user: User) => void;
  updateUserName: (name: string) => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      user: undefined,
      updateUser: (user: User) => set({ user }),
      updateUserName: (name: string) => {
        const user = get().user;
        if (user) {
          user.name = name;
          set({ user });
        }
      },
    }),
    {
      name: "planning-wars",
    },
  ),
);
