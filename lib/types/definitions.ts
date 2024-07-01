export type User = {
	id: string; //Strictly created on the DB.
	username: string;
	email: string;
	image?: string; //URL to image
	createdAt?: string; //Optional field from the DB
	lastUpdatedAt?: string; //Additional optional field.
};

export type Post = {
	id: string; //Strictly created on the DB.
	userId: string;
	content: string;
	image?: string; //URL to image
	cursed: boolean;
};
