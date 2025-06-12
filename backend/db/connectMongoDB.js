import mongoose from "mongoose";

const connectMongoDB = async () => {
  try {
    await mongoose.connect(
      process.env.MONGO_URI,
      console.log("connected to MongoDB")
    );
  } catch (error) {
    console.log("Error connecting to MongooDB..sad face: ", error.message);
  }
};

export default connectMongoDB;
