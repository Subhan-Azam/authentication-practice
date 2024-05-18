import mongoose from "mongoose";

export async function dbConnection() {
  try {
    if (mongoose.connect.readyState >= 1) {
      return;
    }
    await mongoose.connect(process.env.MONGODB_URL);
  } catch (error) {
    console.log("something wrong in DB");
    console.log("error", error);
  }
}
