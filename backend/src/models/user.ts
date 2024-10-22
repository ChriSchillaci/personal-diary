import type { UserSchemaType } from "../types/userSchemaTypes";
import { Schema, model } from "mongoose";

const userSchema = new Schema<UserSchemaType>({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: "",
  },
  posts: {
    type: [
      {
        title: String,
        text_post: String,
      },
    ],
    default: [],
  },
});

const User =
  model<UserSchemaType>("User", userSchema) || model<UserSchemaType>("User");

export default User;
