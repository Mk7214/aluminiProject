import { useUser } from "../store/userStore";
import type { registerUser } from "../types/userTypes";
import { useMutation } from "@tanstack/react-query";

const registerRequest = async ({
	email,
	password,
	batch,
	name,
	course,
	regNo,
}: registerUser) => {
	const res = await fetch("/auth/register", {
		method: "POST",
		headers: {
			"content-Type": "application/json",
		},
		body: JSON.stringify({
			name: name,
			email: email,
			password: password,
			course: course,
			batch: batch,
			regNo: regNo,
		}),
	});

	if (!res.ok) {
		const errorData = await res.json();
		throw new Error(errorData.message || "Login failed");
	}

	return res.json();
};

const useRegister = () => {
	const setUser = useUser((state) => state.setUser);
	const mutation = useMutation({
		mutationFn: registerRequest,
		onSuccess: (data) => {
			setUser(data); // update zustand store with user info
		},
		onError: (error: Error) => {
			console.error("Login failed:", error.message);
		},
	});
	const Register = (
		name: string,
		email: string,
		password: string,
		course: string,
		batch: string,
		regNo: string,
	) => {
		const user: registerUser = { name, email, password, course, batch, regNo };
		const success = handleInputError(user);
		if (!success) return;

		mutation.mutate(user);
	};
	return { Register, loading: mutation.isPending, error: mutation.error };
};

export default useRegister;

const handleInputError = (user: registerUser) => {
	if (
		!user.email ||
		!user.password ||
		!user.batch ||
		!user.name ||
		!user.course ||
		!user.regNo
	) {
		console.error("All fields are required");
		return false;
	}

	return true;
};
