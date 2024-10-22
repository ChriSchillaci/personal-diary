interface UserSchemaType {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  image: string;
  posts: UserPostType[];
}

interface UserEditType extends Omit<UserSchemaType, "posts" | "password"> {
  _id: string;
}

interface UserPostType {
  title: string;
  text_post: string;
}

export type { UserSchemaType, UserEditType, UserPostType };
