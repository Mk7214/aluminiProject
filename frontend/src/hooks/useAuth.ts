import { useMutation } from "@tanstack/react-query";
import { useUserStore } from "../store/userStore";
import { register } from "@/services/authService";
import { login } from "@/services/authService";

export const useRegister = () => {
	const setUser = useUserStore((state) => state.setUser);
	const { mutate, isPending, error } = useMutation({
		mutationFn: register,
		onSuccess: (data) => {
			setUser(data); // update zustand store with user info
		},
		onError: (error: Error) => {
			console.error("Login failed:", error.message);
		},
	});

	return { Register: mutate, isLoading: isPending, error: error };
};

export const useLogin = () => {
	const setUser = useUserStore((state) => state.setUser);

	const { mutate, isPending, error } = useMutation({
		mutationFn: login,
		onSuccess: (data) => {
			setUser(data); // update zustand store with user info
			//handle redirect
		},
		onError: (error: Error) => {
			console.error("Login failed:", error.message);
		},
	});

	return {
		Login: mutate,
		isLoading: isPending,
		error: error,
	};
};

//setup logout
