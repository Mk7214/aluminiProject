interface registerUser {
	name: string;
	email: string;
	password: string;
	course: string;
	regNo: string;
	batch: string;
}

interface loginUser {
	email: string;
	password: string;
}

export type { registerUser, loginUser };
