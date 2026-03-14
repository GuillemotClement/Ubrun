import { create } from "zustand";
import { persist } from "zustand/middleware";

// typage pour utilisateur
type User = {
  // id: number;
  name: string;
  token: string;
};

// typage de la valeur du state
type State = {
  user: User | null;
};

// on définis les méthode utilisé pour modifier le state du context
type Action = {
  setLogin: (user: User) => void;
  setLogout: () => void;
};

// persist permet de conserver le state
export const useAuthStore = create<State & Action>()(
  persist(
    (set) => ({
      user: null,
      setLogin: (user) => set({ user }),
      setLogout: () => set({ user: null }),
    }),
    { name: "auth-store" },
  ),
);
