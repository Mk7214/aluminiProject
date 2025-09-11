import { useUserStore } from "../store/userStore";
import { Navigate, Outlet } from "react-router";

interface PrivateRouteProps {
	requiredRole: "admin" | "user";
}

const PrivateRoute = ({ requiredRole }: PrivateRouteProps) => {
	const user = useUserStore((state) => state.user);

	if (!user) {
		// If no user is logged in, redirect to login
		return <Navigate to="/login" />;
	}

	if (user.role !== requiredRole) {
		// If user role does not match, redirect to a "not authorized" page or home
		return <Navigate to="/unauthorized" />;
	}

	// If the user and role are correct, render the child components
	return <Outlet />; // or {children} if you pass components as children
};

export default PrivateRoute;
