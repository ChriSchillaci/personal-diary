interface RegisterUserType {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

interface UserDataType extends Omit<RegisterUserType, "password"> {
  _id: string;
  image: string;
  posts: UserPostType[];
}

interface UserPostType {
  title: string;
  text_post: string;
}

export type { RegisterUserType, UserDataType, UserPostType };
