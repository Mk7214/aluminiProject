import { useMutation } from "@tanstack/react-query";
import { useUser } from "../store/userStore";
import type { loginUser } from "../types/userTypes";

const loginRequest = async ({ email, password }: loginUser) => {
	const res = await fetch("/auth/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ email, password }),
	});

	if (!res.ok) {
		const errorData = await res.json();
		throw new Error(errorData.message || "Login failed");
	}

	return res.json();
};

const useLogin = () => {
	const setUser = useUser((state) => state.setUser);

	const mutation = useMutation({
		mutationFn: loginRequest,
		onSuccess: (data) => {
			setUser(data); // update zustand store with user info
		},
		onError: (error: Error) => {
			console.error("Login failed:", error.message);
		},
	});

	const Login = (email: string, password: string) => {
		const user: loginUser = { email, password };
		const success = handleInputError(user);
		if (!success) return;

		mutation.mutate(user);
	};

	return {
		Login,
		loading: mutation.isPending,
		error: mutation.error,
	};
};

export default useLogin;

const handleInputError = (user: loginUser) => {
	if (!user.email || !user.password) {
		console.error("All fields are required");
		return false;
	}
	return true;
};
