import mongoose from "mongoose";

export const connectToDatabase = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.MONGO_URL as string);
    console.log("🔰 [mongo-database]: Connected to MongoDB successfully! ✅");
  } catch (error) {
    console.error("💥[mongo-database]: Error connecting to MongoDB", error);
    process.exit(1);
  }
};

export const disconnectFromDatabase = async (): Promise<void> => {
  try {
    await mongoose.connection.close();
    console.log(
      "🔰 [mongo-database]: Disconnected from MongoDB successfully! ✅"
    );
  } catch (error) {
    console.error(
      "💥[mongo-database]: Error disconnecting from MongoDB",
      error
    );
  }
};
