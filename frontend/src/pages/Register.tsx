"use client";

import { Button, Field, Input, Stack, Card } from "@chakra-ui/react";
import { PasswordInput } from "../components/ui/password-input";
import { useForm } from "@tanstack/react-form";

const Register = () => {
	return (
		<div
			className="content-center justify-center
      "
		>
			<Card.Root maxW="md">
				<Card.Header>
					<Card.Title>RegisterForm</Card.Title>
				</Card.Header>
				<Card.Body>
					<RegisterForm />
				</Card.Body>
			</Card.Root>
		</div>
	);
};
export default Register;

const RegisterForm = () => {
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
		},
	});

	const onSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		console.log("e", e);
		form.handleSubmit(e);
	};

	return (
		<form onSubmit={onSubmit}>
			<Stack gap="4" align="flex-start" maxW="300px">
				<form.Field
					name="name"
					children={(field) => {
						return (
							<Field.Root>
								<Field.Label htmlFor={field.name}>name</Field.Label>
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
					name="email"
					children={(field) => {
						return (
							<Field.Root>
								<Field.Label htmlFor={field.name}>Email</Field.Label>
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
				<form.Field
					name="confirmPassword"
					children={(field) => {
						return (
							<Field.Root>
								<Field.Label htmlFor={field.name}>confirmPassword</Field.Label>
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
				<form.Field
					name="course"
					children={(field) => {
						return (
							<Field.Root>
								<Field.Label htmlFor={field.name}>course</Field.Label>
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
					name="batch"
					children={(field) => {
						return (
							<Field.Root>
								<Field.Label htmlFor={field.name}>batch</Field.Label>
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
					name="regNo"
					children={(field) => {
						return (
							<Field.Root>
								<Field.Label htmlFor={field.name}>regNo</Field.Label>
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
