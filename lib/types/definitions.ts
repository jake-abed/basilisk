export type User = {
	id: number; //Strictly created on the DB.
	username: string;
	email: string;
	image?: string; //URL to image
	createdAt?: string; //Optional field from the DB
	lastUpdatedAt?: string; //Additional optional field.
};

export type Follower = {
	id: string;
	userId: string;
	followerId: string;
	createdAt?: string;
	lastUpdatedAt?: string;
};

export type Note = {
	id: string; //Strictly created on the DB.
	userId: string;
	username?: string;
	profilePic?: string;
	content: string;
	image?: string; //URL to image
	fine: number;
	foul: number;
	cursed: boolean;
	createdAt?: string;
	lastUpdatedAt?: string;
};
