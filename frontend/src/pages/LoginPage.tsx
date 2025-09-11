import { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router";
import { useForm } from "@tanstack/react-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { GraduationCap } from "lucide-react";
import { useLogin } from "@/hooks/useAuth";
import { z } from "zod";

export default function LoginPage() {
	const { Login, isLoading, error } = useLogin();
	const navigate = useNavigate();
	const location = useLocation();
	const [isAdminLogin, setIsAdminLogin] = useState(false);

	const form = useForm({
		defaultValues: {
			email: "",
			password: "",
		},
		onSubmit: async ({ value }) => {
			console.log(value);
			Login(value);
		},
	});

	// Check if admin login is requested via URL parameter
	useEffect(() => {
		const searchParams = new URLSearchParams(location.search);
		const isAdmin = searchParams.get("admin") === "true";
		setIsAdminLogin(isAdmin);
	}, [location]);

	// No demo login function anymore

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
			<div className="w-full max-w-md">
				<div className="text-center mb-8">
					<GraduationCap className="mx-auto h-12 w-12 text-blue-600" />
					<h1 className="mt-4 text-3xl font-extrabold text-gray-900">
						{isAdminLogin ? "Admin Login" : "Alumni Portal Login"}
					</h1>
					<p className="mt-2 text-sm text-gray-600">
						Sign in to access your alumni account
					</p>
				</div>

				<Card>
					<form
						onSubmit={(e) => {
							e.preventDefault();
							e.stopPropagation();
							form.handleSubmit();
						}}
					>
						<CardHeader>
							<CardTitle>
								Sign In {isAdminLogin && "as Administrator"}
							</CardTitle>
							<CardDescription>
								{isAdminLogin
									? "Enter your admin credentials to access the dashboard"
									: "Enter your email and password to access your account"}
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<form.Field
								name="email"
								validators={{
									onChange: z.email(),
								}}
								children={(field) => {
									return (
										<div className="space-y-2">
											<Label htmlFor={field.name}>Email</Label>
											<Input
												id={field.name}
												name={field.name}
												type="email"
												placeholder="your.email@example.com"
												value={field.state.value}
												onChange={(e) => field.handleChange(e.target.value)}
												required
											/>
										</div>
									);
								}}
							/>
							<form.Field
								name="password"
								children={(field) => {
									return (
										<div className="space-y-2">
											<div className="flex items-center justify-between">
												<Label htmlFor={field.name}>Password</Label>
												<a
													href="#"
													className="text-sm font-medium text-blue-600 hover:text-blue-500"
												>
													Forgot password?
												</a>
											</div>
											<Input
												id={field.name}
												name={field.name}
												type="password"
												placeholder="your.email@example.com"
												value={field.state.value}
												onChange={(e) => field.handleChange(e.target.value)}
												required
											/>
										</div>
									);
								}}
							/>
						</CardContent>
						<CardFooter className="flex flex-col space-y-4">
							<form.Subscribe
								selector={(state) => [state.canSubmit, state.isSubmitting]}
								// TODO: need to check isLoading and isSubmitting ,if correctly implemented or not
								children={([canSubmit, isSubmitting]) => (
									<Button type="submit" disabled={!canSubmit}>
										{isLoading || isSubmitting ? "Logging in ..." : "Login"}
									</Button>
								)}
							/>
							<div className="flex justify-between text-sm mt-4">
								<Link
									to="/register"
									className="font-medium text-blue-600 hover:text-blue-500"
								>
									Create an account?
								</Link>
								<Link
									to="/login?admin=true"
									className="font-medium text-blue-600 hover:text-blue-500"
								>
									| Admin Login
								</Link>
							</div>
						</CardFooter>
					</form>
				</Card>

				{/* Demo accounts section removed */}
			</div>
		</div>
	);
}
