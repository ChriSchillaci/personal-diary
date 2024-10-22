import mongoose from "mongoose";

export default async function db() {
  try {
    console.log("connettendo");
    const connection = await mongoose.connect(String(process.env.DATABASE_URI));
    console.log("connesso");
    return connection;
  } catch (e) {
    if (e instanceof Error) throw new Error(e.message);
  }
}
