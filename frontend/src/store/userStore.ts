import { create } from "zustand";
import { persist } from "zustand/middleware";

interface useResponse {}

export const useUser = create(
	persist(
		(set) => ({
			user: null | userResponse,
			setUser: (user) => set({ user }),
			clearUser: () => set({ user: null }),
		}),
		{
			name: "user-storage", // key in localStorage
		},
	),
);

// TODO: need to remove the persistent storage
//
// const useUser = create((set) =>{
// 			user: null,
// setUser: (user) => set({ user }),
// clearUser: () => set({ user: null }),
// })
