import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
	id: string;
	name: string;
	email: string;
	role: "admin" | "user";
}

interface UserState {
	user: User | null;
	isLoading: boolean;
	isAdmin: boolean;
	// The user object is now the only piece of state we need
	setUser: (user: User) => void;
	clearUser: () => void;
	setLoading: (loading: boolean) => void;
	setAdmin: (admin: boolean) => void;
}

export const useUserStore = create<UserState>()(
	persist(
		(set) => ({
			user: null,
			isLoading: true, // App starts in loading state until session is checked
			isAdmin: false,
			// We only need to set the user object now
			setUser: (user) => set({ user }),
			clearUser: () => set({ user: null }),
			setLoading: (loading) => set({ isLoading: loading }),
			setAdmin: (admin) => set({ isAdmin: admin }),
		}),
		{
			name: "user-session-info", // We are no longer storing the auth token itself
		},
	),
);
