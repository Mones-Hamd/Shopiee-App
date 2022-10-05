import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
export const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`mongoose is connect: ${conn.connection.host}`);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};
