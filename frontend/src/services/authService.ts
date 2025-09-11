import type { LoginCredentials, RegisterCredentials } from "@/types";

export const login = async (credentials: LoginCredentials) => {
	const res = await fetch("/auth/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(credentials),
	});

	if (!res.ok) {
		const errorData = await res.json();
		throw new Error(errorData.message || "Login failed");
	}

	return res.json();
};

export const register = async (credentials: RegisterCredentials) => {
	const res = await fetch("/auth/register", {
		method: "POST",
		headers: {
			"content-Type": "application/json",
		},
		body: JSON.stringify(credentials),
	});

	if (!res.ok) {
		const errorData = await res.json();
		throw new Error(errorData.message || "Login failed");
	}

	return res.json();
};

//setup loggout
//
