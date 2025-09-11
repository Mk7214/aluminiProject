import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useUserStore } from "../store/userStore";

// try {
// 	const res = await fetch("/user/getUser", {
// 		credentials: "include",
// 	});
// 	if (res.ok) {
// 		const user = res.json();
// 		setUser(user);
// 	}
// } catch (err) {
// 	console.log("failed to fetchuser:", err);
// }
// The function to fetch the user session, remains the same
const fetchUserSession = async () => {
	try {
		const adminResponse = await fetch("/user/getUser", {
			credentials: "include",
		});
		return adminResponse.json();
	} catch (adminError) {
		const userResponse = await fetch("/user/getUser", {
			credentials: "include",
		});
		return userResponse.json();
	}
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const { setUser, clearUser, setLoading, setAdmin } = useUserStore();
	const {
		data: user,
		isSuccess,
		isError,
		error,
		isPending,
	} = useQuery({
		queryKey: ["user-session"],
		queryFn: fetchUserSession,
		retry: false,
		refetchOnWindowFocus: false,
	});

	// useEffect is perfect for the success case: updating state from new data.
	useEffect(() => {
		if (isSuccess && user) {
			setUser(user);
			if (user.role === "admin") {
				setAdmin(true);
			} else {
				setAdmin(false);
			}
		}

		if (isError && error) {
			clearUser();
		}
		if (!isPending) {
			setLoading(false);
		}
	}, [
		isSuccess,
		user,
		setUser,
		isPending,
		setLoading,
		isError,
		error,
		clearUser,
	]);

	return <>{children}</>;
};
