import { NextResponse } from "next/server";
import { dbConnection } from "../../../../config/dbConnection";
import nextAuthSchema from "../../../../models/nextAuthSchema/nextAuthSchema";
import bcrypt from "bcryptjs";

export const POST = async (req) => {
  try {
    await dbConnection();
    const { name, email, password } = await req.json();
    console.log("name======", name);
    console.log("email======", email);

    const hashPassword = await bcrypt.hash(password, 10);
    console.log("password======", hashPassword);
    await nextAuthSchema.create({ name, email, password: hashPassword });

    return NextResponse.json({ message: "POST Working" });
  } catch (error) {
    return NextResponse.json({ message: "wrong in POST" });
  }
};
