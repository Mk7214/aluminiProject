import { useState } from "react";
import { useNavigate, Link } from "react-router";
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
import { useForm } from "@tanstack/react-form";
import z from "zod";
import { useRegister } from "@/hooks/useAuth";

export default function RegisterPage() {
	const { Register, isLoading, error } = useRegister();
	const navigate = useNavigate();

	const form = useForm({
		defaultValues: {
			name: "",
			email: "",
			password: "",
			confirmPassword: "",
			course: "",
			batch: "",
			regNo: "",
		},
		onSubmit: async ({ value }) => {
			console.log(value);
			Register(value);
		},
	});

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
			<div className="w-full max-w-md">
				<div className="text-center mb-8">
					<GraduationCap className="mx-auto h-12 w-12 text-blue-600" />
					<h1 className="mt-4 text-3xl font-extrabold text-gray-900">
						Alumni Portal Registration
					</h1>
					<p className="mt-2 text-sm text-gray-600">
						Create your alumni account to get started
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
							<CardTitle>Create Account</CardTitle>
							<CardDescription>
								Enter your details to create a new account
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="space-y-2">
								<form.Field
									name="name"
									validators={{
										onChange: z.string(),
									}}
									children={(field) => {
										return (
											<div className="space-y-2">
												<Label htmlFor={field.name}>Email</Label>
												<Input
													id={field.name}
													name={field.name}
													type="text"
													value={field.state.value}
													onChange={(e) => field.handleChange(e.target.value)}
													required
												/>
											</div>
										);
									}}
								/>
							</div>
							<div className="space-y-2">
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
							</div>
							<div className="space-y-2">
								<form.Field
									name="password"
									validators={{
										onChange: z.string(),
									}}
									children={(field) => {
										return (
											<div className="space-y-2">
												<Label htmlFor={field.name}>Email</Label>
												<Input
													id={field.name}
													name={field.name}
													type="text"
													value={field.state.value}
													onChange={(e) => field.handleChange(e.target.value)}
													required
												/>
											</div>
										);
									}}
								/>
							</div>
							<div className="space-y-2">
								<form.Field
									name="confirmPassword"
									validators={{
										onChange: z.string(),
									}}
									children={(field) => {
										return (
											<div className="space-y-2">
												<Label htmlFor={field.name}>Email</Label>
												<Input
													id={field.name}
													name={field.name}
													type="text"
													value={field.state.value}
													onChange={(e) => field.handleChange(e.target.value)}
													required
												/>
											</div>
										);
									}}
								/>
							</div>
							<div className="space-y-2">
								<form.Field
									name="course"
									validators={{
										onChange: z.string(),
									}}
									children={(field) => {
										return (
											<div className="space-y-2">
												<Label htmlFor={field.name}>Course</Label>
												<Input
													id={field.name}
													name={field.name}
													type="text"
													value={field.state.value}
													onChange={(e) => field.handleChange(e.target.value)}
													required
												/>
											</div>
										);
									}}
								/>
							</div>
							<div className="space-y-2">
								<form.Field
									name="batch"
									validators={{
										onChange: z.string(),
									}}
									children={(field) => {
										return (
											<div className="space-y-2">
												<Label htmlFor={field.name}>Batch</Label>
												<Input
													id={field.name}
													name={field.name}
													type="text"
													value={field.state.value}
													onChange={(e) => field.handleChange(e.target.value)}
													required
												/>
											</div>
										);
									}}
								/>
							</div>
							<div className="space-y-2">
								<form.Field
									name="regNo"
									validators={{
										onChange: z.string(),
									}}
									children={(field) => {
										return (
											<div className="space-y-2">
												<Label htmlFor={field.name}>RegNo</Label>
												<Input
													id={field.name}
													name={field.name}
													type="text"
													value={field.state.value}
													onChange={(e) => field.handleChange(e.target.value)}
													required
												/>
											</div>
										);
									}}
								/>
							</div>
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
							<div className="text-center text-sm">
								Already have an account?{" "}
								<Link
									to="/login"
									className="font-medium text-blue-600 hover:text-blue-500"
								>
									Sign in
								</Link>
							</div>
						</CardFooter>
					</form>
				</Card>
			</div>
		</div>
	);
}
