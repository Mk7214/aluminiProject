"use client";

import { Button, Field, Input, Stack } from "@chakra-ui/react";
import { PasswordInput } from "../components/ui/password-input";
import { useForm } from "@tanstack/react-form";

const Login = () => {
	const form = useForm({
		defaultValues: {
			email: "",
			password: "",
		},
		onSubmit: async ({ value }) => {
			console.log(value);
		},
	});

	const onSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		form.handleSubmit(e);
	};

	return (
		<form onSubmit={onSubmit}>
			<Stack gap="4" align="flex-start" maxW="300px">
				<form.Field
					name="email"
					children={(field) => {
						return (
							<Field.Root>
								<Field.Label htmlFor={field.name}>Username</Field.Label>
								<Input
									id={field.name}
									name={field.name}
									value={field.state.value}
									onChange={(e) => field.handleChange(e.target.value)}
								/>
							</Field.Root>
						);
					}}
				/>
				<form.Field
					name="password"
					children={(field) => {
						return (
							<Field.Root>
								<Field.Label htmlFor={field.name}>Password</Field.Label>
								<PasswordInput
									id={field.name}
									name={field.name}
									value={field.state.value}
									onChange={(e) => field.handleChange(e.target.value)}
								/>
							</Field.Root>
						);
					}}
				/>
				<form.Subscribe
					selector={(state) => [state.canSubmit, state.isSubmitting]}
					children={([canSubmit, isSubmitting]) => (
						<>
							<Button type="submit" disabled={!canSubmit}>
								{isSubmitting ? "..." : "Submit"}
							</Button>
							<Button
								type="reset"
								onClick={(e) => {
									// Avoid unexpected resets of form elements (especially <select> elements)
									e.preventDefault();
									form.reset();
								}}
							>
								Reset
							</Button>
						</>
					)}
				/>{" "}
			</Stack>
		</form>
	);
};

export default Login;
